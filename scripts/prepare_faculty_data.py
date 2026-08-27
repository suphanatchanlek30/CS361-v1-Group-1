from __future__ import annotations

import json
import re
import shutil
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


# ============================================================
# Paths
# ============================================================

ROOT = Path(__file__).resolve().parents[1]

SOURCE_FILE = ROOT / "data" / "v1" / "source" / "faculty_profiles.json"
SOURCE_METADATA_FILE = (
    ROOT / "data" / "v1" / "source" / "source-metadata.json"
)

BUILD_DIR = ROOT / "build" / "v1"
SERVING_DIR = BUILD_DIR / "serving"
FACULTY_DETAIL_DIR = SERVING_DIR / "faculties"
METADATA_DIR = BUILD_DIR / "metadata"


# ============================================================
# Utility
# ============================================================

def load_json(path: Path):
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as file:
        json.dump(
            data,
            file,
            ensure_ascii=False,
            indent=2,
        )
        file.write("\n")


def clean_text(value):
    if value is None:
        return None

    if not isinstance(value, str):
        return value

    value = value.strip()
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r"\r\n?", "\n", value)

    return value if value else None


def valid_email(value: str | None) -> bool:
    if not value:
        return False

    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    return re.match(pattern, value) is not None


def valid_url(value: str | None) -> bool:
    if not value:
        return False

    try:
        parsed = urlparse(value)

        return (
            parsed.scheme in {"http", "https"}
            and bool(parsed.netloc)
        )

    except Exception:
        return False


# ============================================================
# Faculty ID
# ============================================================

TITLE_PREFIXES = [
    "asst.prof.dr.",
    "asst. prof. dr.",
    "assoc.prof.dr.",
    "assoc. prof. dr.",
    "prof.dr.",
    "prof. dr.",
    "dr.",
]


def generate_faculty_id(name_en: str | None) -> str | None:
    """
    Example:

    Asst.Prof.Dr. Prapaporn Rattanatamrong
        ->
    prapaporn-rattanatamrong
    """

    if not name_en:
        return None

    value = clean_text(name_en)

    if not value:
        return None

    lowered = value.lower()

    for prefix in TITLE_PREFIXES:
        if lowered.startswith(prefix):
            value = value[len(prefix):].strip()
            break

    value = value.lower()

    # Keep English letters, numbers, spaces and hyphens.
    value = re.sub(r"[^a-z0-9\s-]", "", value)

    # Space -> hyphen.
    value = re.sub(r"[\s_-]+", "-", value)

    value = value.strip("-")

    return value or None


# ============================================================
# Normalization
# ============================================================

def normalize_string_list(values):
    if not values:
        return []

    result = []
    seen = set()

    for value in values:
        normalized = clean_text(value)

        if not normalized:
            continue

        key = normalized.casefold()

        if key in seen:
            continue

        seen.add(key)
        result.append(normalized)

    return result


def normalize_publications(publications):
    if not publications:
        return [], 0

    result = []
    seen = set()
    duplicate_count = 0

    for publication in publications:

        if not isinstance(publication, dict):
            continue

        pub = dict(publication)

        for key, value in pub.items():
            if isinstance(value, str):
                pub[key] = clean_text(value)

        doi = pub.get("doi")
        title = pub.get("title")

        if doi:
            duplicate_key = f"doi:{doi.lower()}"

        elif title:
            normalized_title = re.sub(
                r"\s+",
                " ",
                title.strip().lower(),
            )

            duplicate_key = f"title:{normalized_title}"

        else:
            # Cannot safely decide duplicate.
            result.append(pub)
            continue

        if duplicate_key in seen:
            duplicate_count += 1
            continue

        seen.add(duplicate_key)
        result.append(pub)

    return result, duplicate_count


# ============================================================
# Faculty Preparation
# ============================================================

def prepare_faculty(record):
    warnings = []

    if not isinstance(record, dict):
        raise ValueError("Faculty record must be an object")

    name = record.get("name") or {}

    name_th = clean_text(name.get("th"))
    name_en = clean_text(name.get("en"))

    # Required rule from Card #22:
    # at least one display name must exist.
    if not name_th and not name_en:
        raise ValueError(
            "Faculty must have at least one display name"
        )

    faculty_id = generate_faculty_id(name_en)

    if not faculty_id:
        raise ValueError(
            f"Cannot generate Faculty ID for {name_th or name_en}"
        )

    # --------------------------------------------------------
    # Contact
    # --------------------------------------------------------

    source_contact = record.get("contact") or {}

    email = clean_text(source_contact.get("email"))

    if email and not valid_email(email):
        warnings.append(
            f"{faculty_id}: invalid optional email excluded"
        )
        email = None

    contact = {
        "office": clean_text(source_contact.get("office")),
        "phone": clean_text(source_contact.get("phone")),
        "extension": clean_text(
            source_contact.get("extension")
        ),
        "email": email,
    }

    # --------------------------------------------------------
    # Image
    # --------------------------------------------------------

    profile_image = None

    source_image = record.get("profile_image")

    if isinstance(source_image, dict):

        image_url = clean_text(source_image.get("url"))

        if image_url:

            if valid_url(image_url):

                profile_image = {
                    "url": image_url,
                    "alt": name_th or name_en,
                }

            else:

                warnings.append(
                    f"{faculty_id}: invalid profile image URL excluded"
                )

    else:

        warnings.append(
            f"{faculty_id}: profile image missing"
        )

    # --------------------------------------------------------
    # CV
    # --------------------------------------------------------

    cv = None

    source_cv = record.get("cv")

    if isinstance(source_cv, dict):

        cv_url = clean_text(source_cv.get("url"))

        if cv_url:

            if valid_url(cv_url):

                cv = {
                    "url": cv_url
                }

            else:

                warnings.append(
                    f"{faculty_id}: invalid CV URL excluded"
                )

    if cv is None:
        warnings.append(
            f"{faculty_id}: CV missing"
        )

    # --------------------------------------------------------
    # Badges
    # --------------------------------------------------------

    badges = []

    for badge in record.get("badges") or []:

        if not isinstance(badge, dict):
            continue

        badge_url = clean_text(badge.get("url"))

        if not badge_url:
            continue

        if not valid_url(badge_url):
            warnings.append(
                f"{faculty_id}: invalid badge URL excluded"
            )
            continue

        item = {
            "url": badge_url
        }

        label = clean_text(badge.get("label"))

        if label:
            item["label"] = label

        badges.append(item)

    # --------------------------------------------------------
    # Academic Profiles
    # --------------------------------------------------------

    publication_profiles = []

    for profile in record.get("publication_profiles") or []:

        if not isinstance(profile, dict):
            continue

        provider = clean_text(profile.get("provider"))
        url = clean_text(profile.get("url"))

        if not provider or not url:
            continue

        if not valid_url(url):

            warnings.append(
                f"{faculty_id}: invalid academic profile URL excluded"
            )

            continue

        publication_profiles.append(
            {
                "provider": provider,
                "url": url,
            }
        )

    # --------------------------------------------------------
    # Lists
    # --------------------------------------------------------

    research_interests = normalize_string_list(
        record.get("research_interests")
    )

    expertise = normalize_string_list(
        record.get("expertise")
    )

    publications, duplicate_publications = (
        normalize_publications(
            record.get("selected_publications")
        )
    )

    # --------------------------------------------------------
    # Education
    # --------------------------------------------------------

    education = []

    for item in record.get("education") or []:

        if not isinstance(item, dict):
            continue

        normalized_item = {}

        for key, value in item.items():

            if isinstance(value, str):
                normalized_item[key] = clean_text(value)

            else:
                normalized_item[key] = value

        education.append(normalized_item)

    # --------------------------------------------------------
    # Final PUBLIC serving detail.
    #
    # Notice that we explicitly construct the output rather
    # than copying every source field.
    #
    # This is the sanitization boundary.
    # --------------------------------------------------------

    detail = {
        "id": faculty_id,

        "name": {
            "th": name_th,
            "en": name_en,
        },

        "academic_position": clean_text(
            record.get("academic_position")
        ),

        "profile_image": profile_image,

        "badges": badges,

        "cv": cv,

        "contact": contact,

        "education": education,

        "research_interests": research_interests,

        "expertise": expertise,

        "selected_publications": publications,

        "publication_profiles": publication_profiles,
    }

    summary = {
        "id": faculty_id,

        "name": detail["name"],

        "academic_position": detail[
            "academic_position"
        ],

        "profile_image": profile_image,

        "research_interests": research_interests,
    }

    return {
        "id": faculty_id,
        "summary": summary,
        "detail": detail,
        "warnings": warnings,
        "publication_count": len(publications),
        "duplicate_publications": duplicate_publications,
    }


# ============================================================
# Dataset Verification
# ============================================================

def verify_consistency(summaries, details):
    summary_ids = {item["id"] for item in summaries}
    detail_ids = set(details.keys())

    if summary_ids != detail_ids:

        raise ValueError(
            "Faculty Summary / Detail ID mismatch"
        )

    for summary in summaries:

        detail = details[summary["id"]]

        if summary["name"] != detail["name"]:
            raise ValueError(
                f"Name mismatch for {summary['id']}"
            )

        if (
            summary["academic_position"]
            != detail["academic_position"]
        ):
            raise ValueError(
                f"Academic position mismatch for "
                f"{summary['id']}"
            )


# ============================================================
# Main Pipeline
# ============================================================

def main():
    print("========================================")
    print("V1 Faculty Data Preparation")
    print("========================================")

    if not SOURCE_FILE.exists():

        print(
            f"ERROR: Source file not found: {SOURCE_FILE}"
        )

        return 1

    try:

        source_records = load_json(SOURCE_FILE)

        if not isinstance(source_records, list):
            raise ValueError(
                "faculty_profiles.json must contain a JSON array"
            )

        if SOURCE_METADATA_FILE.exists():
            source_metadata = load_json(
                SOURCE_METADATA_FILE
            )
        else:
            source_metadata = {}

        summaries = []
        details = {}

        warnings = []
        errors = []

        duplicate_faculty = 0
        duplicate_publications = 0

        faculty_ids = set()

        for index, record in enumerate(
            source_records,
            start=1,
        ):

            try:

                prepared = prepare_faculty(record)

                faculty_id = prepared["id"]

                if faculty_id in faculty_ids:

                    duplicate_faculty += 1

                    raise ValueError(
                        f"Duplicate Faculty ID: "
                        f"{faculty_id}"
                    )

                faculty_ids.add(faculty_id)

                summaries.append(
                    prepared["summary"]
                )

                details[faculty_id] = (
                    prepared["detail"]
                )

                warnings.extend(
                    prepared["warnings"]
                )

                duplicate_publications += (
                    prepared[
                        "duplicate_publications"
                    ]
                )

            except Exception as exc:

                errors.append(
                    f"Record {index}: {exc}"
                )

        # Required validation failure:
        # do not replace current build.
        if errors:

            print("\nPreparation FAILED\n")

            for error in errors:
                print(f"ERROR: {error}")

            print(
                "\nCurrent valid serving dataset "
                "was not replaced."
            )

            return 1

        verify_consistency(
            summaries,
            details,
        )

        # ----------------------------------------------------
        # Safe publish:
        # Generate everything inside temporary directory first.
        # ----------------------------------------------------

        with tempfile.TemporaryDirectory() as temp:

            temp_root = Path(temp)

            temp_serving = (
                temp_root / "serving"
            )

            temp_details = (
                temp_serving / "faculties"
            )

            temp_metadata = (
                temp_root / "metadata"
            )

            temp_details.mkdir(
                parents=True,
                exist_ok=True,
            )

            temp_metadata.mkdir(
                parents=True,
                exist_ok=True,
            )

            write_json(
                temp_serving / "faculties.json",
                summaries,
            )

            for faculty_id, detail in details.items():

                write_json(
                    temp_details
                    / f"{faculty_id}.json",

                    detail,
                )

            publication_count = sum(
                len(
                    item[
                        "selected_publications"
                    ]
                )
                for item in details.values()
            )

            prepared_at = (
                datetime.now(timezone.utc)
                .replace(microsecond=0)
                .isoformat()
            )

            status = (
                "passed_with_warnings"
                if warnings
                else "passed"
            )

            manifest = {
                "dataset_id": (
                    f"faculty-v1-"
                    f"{datetime.now().strftime('%Y-%m')}"
                ),

                "source": (
                    "Department Public Faculty Website"
                ),

                "source_domain": (
                    source_metadata.get(
                        "source_domain",
                        "cs.sci.tu.ac.th",
                    )
                ),

                "source_version": (
                    source_metadata.get(
                        "source_version"
                    )
                ),

                "prepared_at": prepared_at,

                "faculty_count": len(
                    summaries
                ),

                "publication_count": (
                    publication_count
                ),

                "validation_status": status,

                "serving_version": "v1",
            }

            preparation_summary = {
                "status": status.upper(),

                "faculty_records": len(
                    source_records
                ),

                "valid_faculty": len(
                    summaries
                ),

                "invalid_faculty": 0,

                "selected_publications": (
                    publication_count
                ),

                "warnings": len(warnings),

                "errors": 0,

                "duplicate_faculty": (
                    duplicate_faculty
                ),

                "duplicate_publications": (
                    duplicate_publications
                ),

                "warning_details": warnings,
            }

            write_json(
                temp_metadata
                / "manifest.json",

                manifest,
            )

            write_json(
                temp_metadata
                / "preparation-summary.json",

                preparation_summary,
            )

            # ------------------------------------------------
            # Replace build only AFTER all generation succeeds.
            # ------------------------------------------------

            if SERVING_DIR.exists():
                shutil.rmtree(SERVING_DIR)

            if METADATA_DIR.exists():
                shutil.rmtree(METADATA_DIR)

            shutil.copytree(
                temp_serving,
                SERVING_DIR,
            )

            shutil.copytree(
                temp_metadata,
                METADATA_DIR,
            )

        # ----------------------------------------------------
        # Summary
        # ----------------------------------------------------

        print("\nDataset Preparation Completed\n")

        print(
            f"Faculty Records: "
            f"{len(source_records)}"
        )

        print(
            f"Valid Faculty: "
            f"{len(summaries)}"
        )

        print(
            "Invalid Faculty: 0"
        )

        print(
            f"Selected Publications: "
            f"{publication_count}"
        )

        print(
            f"Warnings: {len(warnings)}"
        )

        print("Errors: 0")

        print(
            f"\nStatus: "
            f"{status.upper()}"
        )

        if warnings:

            print("\nWarnings:")

            for warning in warnings:
                print(f"- {warning}")

        print(
            "\nGenerated:"
        )

        print(
            "build/v1/serving/faculties.json"
        )

        for faculty_id in sorted(details):

            print(
                "build/v1/serving/faculties/"
                f"{faculty_id}.json"
            )

        print(
            "build/v1/metadata/manifest.json"
        )

        print(
            "build/v1/metadata/"
            "preparation-summary.json"
        )

        return 0

    except Exception as exc:

        print(
            f"\nERROR: {exc}"
        )

        print(
            "Current valid serving dataset "
            "was not replaced."
        )

        return 1


if __name__ == "__main__":
    sys.exit(main())