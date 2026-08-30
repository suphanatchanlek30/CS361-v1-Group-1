# [V1] Validate Source Dataset & Define Public Faculty Data Contract #22

> ⚠️ **Superseded.** Written before the real department source dataset was available, so it
> still treats `faculties.xlsx` / `publications.csv` / generic Excel-CSV as the pending source
> format. The real V1 source is the department's public faculty website, captured as a
> controlled JSON snapshot (`data/v1/source/faculty_profiles.json`). See
> [`V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md`](../V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md)
> (Issue #29) for the final, implementation-accurate data contract. This file is kept only as a
> historical design record.

**Project:** Faculty Output & Workload Management System  
**Version:** V1 — Faculty Profile / Public Output  
**Issue:** #22 — `[V1] Validate Source Dataset & Define Public Faculty Data Contract`  
**Document Version:** 1.0  
**Date:** 2026-08-27  
**Owner:** Data Developer / Backend Developer  
**Reviewers:** Tech Lead, Frontend Developer, Backend Developer, Cloud/AWS Developer  
**Status:** **Contract Complete — Actual Source Dataset Verification Pending**  
**Blocked By:** #21 `[V1] Define V1 Scope, Architecture & Technical Contracts`

---

# 0. Purpose

เอกสารฉบับนี้เป็น **Central V1 Public Faculty Data Contract** สำหรับ Issue #22 และเป็นข้อตกลงกลางระหว่าง Data, Backend และ Frontend ก่อนเริ่ม #23–#27

Issue นี้ต้องทำให้ทีมตอบได้ว่า:

- Source Dataset ของ V1 คืออะไร
- Source มี File / Sheet / Field อะไรจริง
- Field ใด Required / Optional
- Field ใด Public / Private / Pending Confirmation / Not Used
- Faculty และ Publication เชื่อมกันด้วย Key ใด
- ข้อมูลต้อง Validate / Normalize / Deduplicate อย่างไร
- Missing Data จัดการอย่างไร
- Photo / CV / Badge / Academic Profile จัดการอย่างไร
- Source Field map ไป Serving Field ใด
- `faculties.json` และ `faculties/{id}.json` มี Contract แบบใด
- Dataset Manifest มีข้อมูลใด
- Frontend / Backend / Data ใช้ Contract เดียวกันอย่างไร

V1 ยังคงเป็น:

> **Public Read-only Faculty Information Service**

ข้อมูลทั้งหมดใน `serving/*` ต้องเป็น **Public-safe Data Only**

---

# 0.1 Evidence Status — สำคัญ

จาก Material ที่มีอยู่ ณ เวลาจัดทำเอกสารนี้ มี Course Requirement, เอกสาร #21 และ Definition ของ #22 แต่ **ยังไม่มี Actual Department Faculty Source Dataset** เช่น `faculties.xlsx`, `publications.csv`, Excel/CSV จริง, Faculty photos หรือ CV bundle สำหรับตรวจ

ดังนั้นเอกสารนี้ Freeze ได้ครบในส่วน:

- Identifier Strategy
- Required / Optional Rules
- Public / Private Safety Policy
- Validation Rules
- Normalization Rules
- Duplicate Rules
- Missing Data Convention
- Faculty Summary / Detail Contract
- Publication Contract
- Asset Contract
- External Academic Profile Contract
- Manifest Contract
- Development Fixture
- Source Review Procedure
- Mapping Template

แต่ **ห้ามอ้างว่า Source Dataset ผ่านการตรวจจริงแล้ว** จนกว่าจะมี Actual Dataset มา Review

> **Rule: ห้ามสมมติ Source Column / Sheet / Relationship Key เพื่อทำให้ Acceptance Criteria ดูเหมือนผ่าน**

---

# 1. Requirement Basis

V1 ต้องรองรับ Requirement หลัก:

> ผู้ใช้ทั่วไปสามารถเข้าถึงข้อมูลพื้นฐานของอาจารย์และผลงานบางส่วนที่กำหนดให้เผยแพร่ได้ เช่น ข้อมูลความเชี่ยวชาญ ผลงานวิจัย หรือกิจกรรมทางวิชาการ โดยยังไม่จำเป็นต้องเข้าสู่ระบบ

V1 จึงเน้น FR1 และ Public Information เท่านั้น

## 1.1 Data Ownership

```text
Department Files = Source of Truth
V1 Application   = Consumer / Public Presentation Layer
Serving JSON     = Runtime Projection
```

Serving JSON ไม่ใช่ Source of Truth

---

# 2. Data Flow

```text
Department Source Dataset
          ↓
   Source Data Review
          ↓
      Validation
          ↓
     Classification
          ↓
     Normalization
          ↓
     Deduplication
          ↓
      Sanitization
          ↓
  Public Data Selection
          ↓
   Serving JSON Dataset
          ↓
       Amazon S3
       serving/*
          ↓
      AWS Lambda
          ↓
 Amazon API Gateway
          ↓
   Next.js / Vercel
          ↓
      Public User
```

Data Preparation เป็น Internal Process และ Public User ไม่สามารถ Trigger ได้

---

# 3. Source Dataset Definition

| Item | Decision |
|---|---|
| Data owner | สาขาวิชา / Department |
| Operational provider | เจ้าหน้าที่สาขาวิชาหรือผู้รับผิดชอบไฟล์ต้นทาง |
| V1 system role | Consume |
| Import mode | One-time pre-launch import |
| Automatic sync | ไม่มีใน V1 |
| Source of Truth | Department-owned files |

Actual provider name, file name และวันที่รับ Dataset ต้องบันทึกเมื่อได้รับจริง

---

# 4. Actual Source Dataset Inventory

> **Current Status: PENDING — Actual Department Source Dataset has not been supplied for inspection.**

เมื่อได้รับ Source จริง ให้เติมด้วยชื่อไฟล์จริงเท่านั้น

| Source ID | File Name | Format | Sheet/Table | Purpose | Provider | Date Received | Status |
|---|---|---|---|---|---|---|---|
| SRC-001 | `TBD_FROM_SOURCE` | TBD | TBD | Faculty master | Department | TBD | Pending |
| SRC-002 | `TBD_FROM_SOURCE` | TBD | TBD | Publications / outputs | Department | TBD | Pending |
| SRC-003 | `TBD_FROM_SOURCE` | TBD | N/A | Faculty assets | Department | TBD | Pending |

## Evidence Required Before Closure

- File listing / screenshot
- Sheet names
- Exact column names
- Row counts
- Missing value summary
- Duplicate summary
- Relationship key evidence
- Asset inventory

---

# 5. Source File / Sheet Review Checklist

สำหรับทุกไฟล์ต้องตรวจ:

- filename / format / encoding
- number of sheets
- header row
- merged cells / multi-row header
- hidden sheets
- formulas
- empty rows / columns
- duplicate headers
- inconsistent types
- total row count
- candidate primary key

Template:

| File | Sheet | Rows | Columns | Entity | Relationship Key | Notes |
|---|---|---:|---:|---|---|---|
| TBD | TBD | TBD | TBD | Faculty / Publication | TBD | Actual review required |

---

# 6. Actual Source Field Inventory

> ห้ามแก้ชื่อ Source Field ให้ดูสวย ต้องบันทึกชื่อเหมือนในไฟล์จริง

| Source Location | Exact Source Field | Example | Type | Missing Count | Duplicate Concern | V1 Relevance | Notes |
|---|---|---|---|---:|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD | TBD | Actual source required |

Allowed V1 relevance values:

```text
USED_IN_V1
PRIVATE
PENDING_CONFIRMATION
NOT_USED_IN_V1
UNKNOWN
```

---

# 7. V1 Target Public Concepts

Target Concept ไม่ได้หมายความว่า Source มีทั้งหมด

## Identity
- Faculty ID
- Thai Name
- English Name
- Academic Position / Academic Title

## Media
- Profile Image
- Academic Badge

## Curriculum Vitae
- CV Label
- Public CV URL / file

## Public Contact
- Building
- Office / Room
- Phone
- Extension
- Email
- Public Contact URL

## Education[]
- Degree
- Field of Study
- Institution
- Country
- Graduation Year
- Additional Information

## Research Interests[]

## Expertise[]

## Selected Publications[]
- Authors
- Title
- Type
- Year
- Academic Year
- Venue
- Volume
- Issue
- Pages
- DOI
- Public URL
- Citation Text

## External Academic Profiles[]
- Google Scholar
- ResearchGate
- ORCID
- Scopus
- Personal Academic Website

---

# 8. Data Classification

ทุก Source Field ต้องได้รับสถานะ:

```text
PUBLIC
PRIVATE
PENDING_CONFIRMATION
NOT_USED_IN_V1
MISSING
INVALID
NEEDS_NORMALIZATION
```

## Default-safe Rule

```text
Confirmed PUBLIC          → Eligible for serving
PRIVATE                   → Exclude
PENDING_CONFIRMATION      → Exclude
UNKNOWN                   → Exclude
NOT_USED_IN_V1            → Exclude
INVALID                   → Exclude / report
```

**ไม่มี Default Public**

### Private / Internal examples

- Internal Notes
- Workload
- Teaching Workload
- Student Information
- Review Information
- Approval Information
- Internal Staff Notes
- Private contact
- Raw source paths
- Credentials / Secrets

---

# 9. Required vs Optional

## Required Faculty Record

Faculty ที่ Publish ต้องผ่าน:

```text
id != empty
AND
(name.th != empty OR name.en != empty)
AND
publishability == confirmed_public
```

Required:
- Public Faculty ID
- Faculty Display Name อย่างน้อย 1 ภาษา
- Confirmed public visibility

Missing required:

```text
Do not publish
+
Report validation ERROR
```

## Optional

- second language name
- academic position
- profile image
- badge
- CV
- contact fields
- education
- research interests
- expertise
- selected publications
- external profiles

---

# 10. Frozen Missing Data Convention

## Arrays

ถ้าไม่มีข้อมูลใช้ `[]`

```json
{
  "education": [],
  "research_interests": [],
  "expertise": [],
  "selected_publications": [],
  "publication_profiles": []
}
```

## Optional scalar/object

ถ้าไม่มีข้อมูลให้ **omit field**

ไม่ใช้:

```text
""
"N/A"
"-"
"ไม่ระบุ"
```

ใน Serving JSON เพื่อแทน missing

---

# 11. Faculty Identifier Strategy — Frozen

ID ต้อง:

- Unique
- Stable
- URL-safe
- lowercase
- no whitespace
- ไม่ขึ้นกับ array index
- ไม่เปลี่ยนเพราะ academic title เปลี่ยน
- ไม่เปิดเผย sensitive identifier
- ใช้เป็น S3 filename ได้

Allowed:

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

## Identifier Precedence

1. Existing stable **public** source identifier
2. Managed public mapping จาก stable internal key
3. English-name slug + explicit collision mapping
4. Managed synthetic ID เช่น `faculty-001`

Forbidden:

- email เป็น public ID
- sensitive employee/national ID
- raw row order โดยไม่มี persistent mapping
- `../`, `/`, `\`

---

# 12. Faculty ↔ Publication Relationship Rule

Priority:

1. Stable Faculty ID/Code ที่มีอยู่ทั้งสอง source
2. Stable explicit relationship field
3. Manually reviewed mapping table

ห้าม auto-link ด้วย:

- fuzzy name matching
- substring name matching
- row position

ถ้าไม่มี reliable relationship key:

> Data Gap + Manual review before publishing publications

---

# 13. Serving JSON Naming Convention

Issue #22 Freeze field naming เป็น:

> **snake_case**

S3 Serving JSON และ Backend response payload ใช้ชื่อเดียวกัน โดย API สามารถ wrap ใต้ `data`

---

# 14. Faculty Summary Contract — `serving/faculties.json`

S3 object เป็น JSON Array

```json
[
  {
    "id": "faculty-alpha",
    "name": {
      "th": "อาจารย์ตัวอย่าง ก",
      "en": "Example Faculty A"
    },
    "academic_position": "Assistant Professor",
    "profile_image": {
      "url": "https://example.invalid/faculty-alpha.jpg",
      "alt": "Example Faculty A"
    },
    "research_interests": ["Distributed Systems"],
    "expertise": ["Cloud Computing"]
  }
]
```

Required summary fields:

- `id`
- `name`
- `research_interests`
- `expertise`

Optional:

- `academic_position`
- `profile_image`

---

# 15. Faculty Detail Contract — `serving/faculties/{id}.json`

```json
{
  "id": "faculty-alpha",
  "name": {
    "th": "อาจารย์ตัวอย่าง ก",
    "en": "Example Faculty A"
  },
  "academic_position": "Assistant Professor",
  "profile_image": {
    "url": "https://example.invalid/faculty-alpha.jpg",
    "alt": "Example Faculty A"
  },
  "badges": [],
  "cv": {
    "label": "Curriculum Vitae",
    "url": "https://example.invalid/faculty-alpha-cv.pdf"
  },
  "contact": {
    "building": "Example Building",
    "office": "Room 101",
    "phone": "+66-2-000-0000",
    "extension": "1234",
    "email": "faculty.alpha@example.invalid"
  },
  "education": [
    {
      "degree": "Ph.D.",
      "field": "Computer Science",
      "institution": "Example University",
      "country": "Thailand",
      "graduation_year": "2020"
    }
  ],
  "research_interests": ["Distributed Systems"],
  "expertise": ["Cloud Computing"],
  "selected_publications": [
    {
      "authors": ["Example Faculty A", "Example Author B"],
      "title": "Synthetic Development Fixture Publication",
      "type": "Journal",
      "year": 2025,
      "academic_year": "2025",
      "venue": "Example Journal",
      "volume": "1",
      "issue": "1",
      "pages": "1-10",
      "doi": "10.0000/example.fixture",
      "url": "https://example.invalid/publication",
      "citation_text": "Synthetic fixture only."
    }
  ],
  "publication_profiles": [
    {
      "type": "google_scholar",
      "label": "Google Scholar",
      "url": "https://example.invalid/scholar"
    }
  ]
}
```

---

# 16. Field Rules

## Name
- อย่างน้อย `th` หรือ `en` ต้องมี
- ห้าม invent translation
- trim whitespace
- preserve official spelling

## Academic Position
- optional
- preserve meaning
- ไม่ infer จาก prefix ถ้าไม่มี approved rule

## Profile Image
- optional
- public confirmation required
- missing → omit + frontend fallback
- no base64 in serving JSON

## Badges

```json
"badges": []
```

หรือ:

```json
{
  "label": "...",
  "image_url": "..."
}
```

ห้ามสร้าง badge จาก academic position โดยไม่มี business rule

## CV
- optional
- public confirmation required
- pending/private → exclude

## Contact
- object optional
- fields optional
- public contact only
- phone stored as string
- preserve leading zero / `+` / extension

## Education
- array always present
- do not invent missing details
- `graduation_year` stored as string

## Research Interests
- trim / normalize whitespace
- exact normalized duplicate removal allowed
- `AI` กับ `Artificial Intelligence` ห้าม merge โดยไม่มี synonym rule

## Expertise
- formatting normalization only
- ห้าม AI rewrite / paraphrase / semantic merge

---

# 17. Publication Contract

```json
{
  "authors": ["..."],
  "title": "...",
  "type": "...",
  "year": 2025,
  "academic_year": "2025",
  "venue": "...",
  "volume": "...",
  "issue": "...",
  "pages": "...",
  "doi": "...",
  "url": "...",
  "citation_text": "..."
}
```

Required for a public output item:

- `title`
- `academic_year`
- correct Faculty relationship

Optional:

- authors
- type
- year
- venue
- volume
- issue
- pages
- doi
- url
- citation_text

## Academic Year

ใช้ string และไม่ convert พ.ศ. ↔ ค.ศ. เองจนกว่า Source/Department rule จะยืนยัน

---

# 18. DOI Rule

Canonical field:

```text
10.xxxx/abc
```

Normalize from forms such as DOI URL ได้ถ้าระบุ identifier ชัด

Basic validation:

```regex
^10\.\d{4,9}/\S+$
```

Invalid DOI ไม่ทำให้ Publication ทั้งรายการ invalid ถ้า title/academic_year และ source relation ถูกต้อง

---

# 19. Publication Duplicate Rule

Priority:

1. DOI exact match after canonicalization
2. Stable publication ID from source
3. Normalized exact title + year = duplicate candidate
4. Normalized citation exact match = duplicate candidate

Rules:

- DOI match = strong duplicate
- similar title ≠ auto-delete
- fuzzy match ใช้ report ได้ แต่ไม่ auto-merge/delete

---

# 20. External Academic Profile Contract

```json
{
  "publication_profiles": [
    {
      "type": "google_scholar",
      "label": "Google Scholar",
      "url": "..."
    }
  ]
}
```

Recommended types:

```text
google_scholar
researchgate
orcid
scopus
personal_website
other
```

Rule:
- source/confirmed link only
- no guessing links
- URL validation required
- invalid/unconfirmed → exclude

---

# 21. Asset Contract

Asset types:

```text
profile_image
badge
cv
```

Inventory columns:

| Field | Meaning |
|---|---|
| `asset_type` | image / badge / cv |
| `faculty_id` | target faculty |
| `source_reference` | internal traceability |
| `public_reference` | serving URL/reference |
| `visibility` | public/private/pending |
| `media_type` | jpg/png/pdf/etc. |
| `validation_status` | valid/missing/invalid |

## Naming Rule

```text
faculty-images/{faculty_id}.{ext}
faculty-cv/{faculty_id}.pdf
faculty-badges/{faculty_id}-{badge-slug}.{ext}
```

Avoid `IMG_00123.jpg`, `final-final.pdf`

---

# 22. Validation Rules

## Faculty Identity
- ID required
- ID unique
- display name required
- publishability confirmed

## Email
- trim
- must have valid basic email structure
- invalid optional email → omit + report

## URL
Allow public HTTP/HTTPS only; reject:

```text
javascript:
data:
file:
localhost
internal-only path/hostname
```

## Phone
- string only
- no numeric coercion
- preserve formatting meaning

## Asset
- source known
- relationship known
- public confirmed
- reference usable

---

# 23. Empty / Text Normalization

Treat as missing:

```text
null
""
"   "
```

Source-specific tokens เช่น `N/A`, `-` ต้อง confirm ก่อนตั้งเป็น missing token

Allowed text normalization:

- trim
- collapse repeated safe spaces
- normalize line endings
- normalize empty value

Not allowed:

- translation
- grammar rewrite
- paraphrase
- semantic summarization
- changing research terminology

---

# 24. Faculty Duplicate Rule

Order:

1. same stable source faculty key
2. same public faculty ID
3. name + corroborating source field = candidate review

Strong duplicate → ERROR / hold publish

Name-only fuzzy match → manual review, ห้าม auto-merge

---

# 25. Summary / Detail Consistency

สำหรับทุก Faculty:

```text
faculties.json[id=X]
```

ต้องตรงกับ:

```text
faculties/X.json
```

ใน field:

- id
- name
- academic_position (if present)
- profile_image (if present)
- research_interests
- expertise

Mismatch = preparation ERROR

---

# 26. Source-to-Serving Mapping Contract

## Current Actual Mapping Status

**PENDING ACTUAL DATASET**

## Required Format

| Source Location | Exact Source Field | Serving Path | Requirement | Visibility | Processing | Error Behavior |
|---|---|---|---|---|---|---|
| TBD | TBD | `id` | Required | Public | ID rule | Reject/Hold |
| TBD | TBD | `name.th` | Conditional Required | Public/Pending | Trim | Hold if no display name |
| TBD | TBD | `name.en` | Conditional Required | Public/Pending | Trim | Hold if no display name |
| TBD | TBD | `academic_position` | Optional | Public/Pending | Trim | Omit |
| TBD | TBD | `contact.email` | Optional | Public/Pending | Validate email | Omit + report |
| TBD | TBD | `education[]` | Optional | Public/Pending | Normalize | `[]` |
| TBD | TBD | `research_interests[]` | Optional | Public | Confirm split rule | `[]` |
| TBD | TBD | `expertise[]` | Optional | Public | Formatting only | `[]` |
| TBD | TBD | `selected_publications[]` | Optional | Public/Pending | Relation + dedupe | `[]` |
| TBD | TBD | `profile_image` | Optional | Public/Pending | Asset mapping | Omit |
| TBD | TBD | `cv` | Optional | Public/Pending | Asset mapping | Omit |
| TBD | TBD | `publication_profiles[]` | Optional | Public/Pending | URL validation | `[]` |
| TBD | TBD | N/A | Not Used | Private | Exclude | Never serve |

---

# 27. Multi-value Field Rule

ถ้า Source cell มีหลายค่า เช่น:

```text
AI; Computer Vision; Robotics
```

ห้าม split จนกว่าจะยืนยัน delimiter จริง

Mapping ต้องบันทึก delimiter และ escape/quote behavior

---

# 28. Multi-faculty Publication Rule

ถ้า Publication หนึ่งรายการเชื่อม Faculty หลายคน:

- สามารถอยู่ใน detail file ของแต่ละ Faculty
- content ต้อง consistent
- ไม่ถือเป็น duplicate เพียงเพราะปรากฏข้าม Faculty files

---

# 29. Validation Severity

## ERROR — block publishing

- missing ID
- duplicate ID
- no display name
- unconfirmed publishability
- ambiguous publication attribution
- private field leaks into serving
- summary/detail mismatch
- invalid JSON structure

## WARNING

- optional email invalid
- optional URL invalid
- missing CV
- missing image
- publication missing DOI
- duplicate candidate

## INFO

- optional field absent
- exact duplicate interest removed
- whitespace normalized

---

# 30. Dataset Manifest — Decision: USE

Path:

```text
metadata/manifest.json
```

Contract:

```json
{
  "dataset_id": "faculty-v1-YYYYMMDD",
  "source_name": "Department Faculty Dataset",
  "source_version": "optional",
  "date_received": "YYYY-MM-DD",
  "prepared_at": "YYYY-MM-DDTHH:MM:SSZ",
  "last_updated": "YYYY-MM-DD",
  "faculty_count": 0,
  "publication_count": 0,
  "validation_status": "passed",
  "validation_error_count": 0,
  "validation_warning_count": 0,
  "serving_version": "v1"
}
```

Manifest เป็น Internal Metadata โดย default

---

# 31. Data Provenance

ขั้นต่ำต้อง trace ได้:

```text
Department Source
      ↓
Date Received
      ↓
Source File / Sheet
      ↓
Exact Source Field
      ↓
Mapping Rule
      ↓
Validation / Normalization
      ↓
Serving Field
```

---

# 32. Public / Private Boundary Invariant

```text
fields(serving)
⊆
confirmed_public_fields(source + approved derived fields)
```

Approved derived fields เช่น:

- public faculty ID
- normalized academic year representation
- normalized asset reference

ไม่ใช่เนื้อหาใหม่ที่ AI สร้าง

---

# 33. Data Gap Register

| ID | Gap | Impact | Blocking? | Owner / Resolution |
|---|---|---|---|---|
| GAP-001 | Actual source dataset not supplied | Cannot verify real columns/sheets | Yes | Department/Data Owner supplies files |
| GAP-002 | Actual publication relationship key unknown | Cannot prove attribution | Yes if publications included | Inspect source |
| GAP-003 | Public visibility evidence unavailable | Cannot mark candidates Public | Yes | Department confirms |
| GAP-004 | Actual asset bundle unavailable | Cannot verify Photo/CV | Conditional | Supply/review assets |
| GAP-005 | Academic year source/rule unverified | Cannot finalize publication mapping | Yes for outputs | Confirm source/rule |

---

# 34. Open Questions

| ID | Question | Default-safe Behavior |
|---|---|---|
| OQ-001 | Public phone เปิดเผยได้หรือไม่ | Exclude until confirmed |
| OQ-002 | Public email เปิดเผยได้ทุก Faculty หรือบางคน | Exclude unconfirmed |
| OQ-003 | CV public ทุกคนหรือบางคน | Include confirmed only |
| OQ-004 | Faculty photo public หรือไม่ | Include confirmed only |
| OQ-005 | Selected publications ถูกเลือกโดยใคร | Do not invent selection |
| OQ-006 | Source มี stable faculty key หรือไม่ | Inspect source first |
| OQ-007 | Publication ↔ Faculty key คืออะไร | No fuzzy attribution |
| OQ-008 | Academic year ใช้ format/calendar ใด | Preserve confirmed convention |
| OQ-009 | Academic profile links มาจาก source ใด | Verified source only |
| OQ-010 | Badge หมายถึงอะไร | Exclude until rule exists |

---

# 35. Development Fixture

เพราะ Actual Source ยังไม่อยู่ใน review context นี้ จึงสร้าง Fixture เพื่อให้ Backend / Frontend เริ่มพัฒนาได้

> **Fixture เป็นข้อมูลสมมติ 100% และไม่ใช่ข้อมูลจริงของสาขาวิชา**

Package structure:

```text
fixtures/
├── faculties.json
├── faculties/
│   ├── faculty-alpha.json
│   ├── faculty-beta.json
│   └── faculty-gamma.json
└── manifest.json
```

Scenarios:

- Faculty Alpha — full profile
- Faculty Beta — no image/CV/phone; publication without DOI
- Faculty Gamma — no publications / no research interests / partial external profile

---

# 36. Source Review Procedure

เมื่อ Actual Source ถูกส่งมา:

```text
1. Record received files
2. Record provider/date
3. List sheets/tables
4. Extract exact headers
5. Count records
6. Identify faculty master
7. Identify publication/output records
8. Identify relationship keys
9. Profile missing values
10. Detect exact duplicates
11. Detect inconsistent types/formats
12. Inventory images/CVs/links
13. Classify every V1-relevant field
14. Build exact Source-to-Serving mapping
15. Record gaps/questions
16. Confirm public visibility
17. Review with Data/Backend/Frontend
18. Freeze mapping
```

---

# 37. Source Review Evidence Template

```text
Dataset Provider:
Date Received:
Files:
Sheets:
Faculty Record Count:
Publication Record Count:
Image Asset Count:
CV Asset Count:
Stable Faculty Key:
Publication Relationship Key:
Public Visibility Field/Rule:
Missing Required Records:
Duplicate Faculty Candidates:
Duplicate Publication Candidates:
Open Questions:
Reviewer:
Review Date:
```

---

# 38. Handoff to #23

Issue #23 ต้องใช้:

- Actual Source Inventory
- Exact Mapping
- Identifier Rule
- Required/Optional Rule
- Public/Private/Pending Classification
- Validation Rules
- Normalization Rules
- Duplicate Rules
- Missing Convention
- Summary Contract
- Detail Contract
- Publication Contract
- Asset Contract
- Manifest Contract

#23 ห้ามเปลี่ยน Contract เงียบ ๆ

---

# 39. Backend Contract

Backend อ่านเฉพาะ:

```text
serving/faculties.json
serving/faculties/{id}.json
```

Backend ไม่ต้องรู้:

- Excel column names
- sheet names
- private/internal source fields

API success envelope:

```json
{
  "data": {}
}
```

หรือ collection:

```json
{
  "data": []
}
```

---

# 40. Frontend Contract

Frontend ต้อง:

- handle optional field omission
- handle arrays as `[]`
- not show `null` / `undefined`
- not infer missing data
- not access Source Data
- not hard-code source column names

---

# 41. Review Checklist — Frontend

- [ ] Directory renders `id`, `name`
- [ ] Missing image fallback works
- [ ] Missing position does not break card
- [ ] Research/expertise arrays supported
- [ ] Optional sections can hide gracefully
- [ ] No publication supported
- [ ] No CV supported
- [ ] No phone/email supported
- [ ] External profile array supported
- [ ] Long content supported

---

# 42. Review Checklist — Backend

- [ ] S3 path deterministic from `id`
- [ ] Summary/detail JSON parseable
- [ ] ID regex consistent
- [ ] Unknown ID → 404 possible
- [ ] No access to Source fields required
- [ ] API can wrap serving payload in `data`
- [ ] Optional fields do not break API

---

# 43. Review Checklist — Data

- [ ] Every serving field has actual source mapping or approved derived rule
- [ ] No private field in serving
- [ ] Pending fields excluded
- [ ] Required validation enforceable
- [ ] Duplicate rules implementable
- [ ] Missing convention implementable
- [ ] Manifest implementable
- [ ] Summary/detail consistency testable

---

# 44. Tasks Coverage

Legend: ✅ complete, ⏳ requires Actual Source Dataset, 👥 requires human/team confirmation

## Source Review

| Task | Status |
|---|---|
| Identify V1 Source Dataset | ⏳ |
| Identify Dataset Owner / Provider | ✅ role defined / actual provider metadata 👥 |
| Record Source Format | ⏳ |
| Review Files / Sheets | ⏳ |
| Inventory Source Fields | ⏳ |
| Identify Faculty Relationship Key | ⏳ |
| Identify Publication Relationship Key | ⏳ |
| Review Faculty Images | ⏳ |
| Review CV Data / Files | ⏳ |
| Review Academic Profile Links | ⏳ |
| Identify Missing Values | ⏳ |
| Identify Duplicate Records | ⏳ |
| Identify Inconsistent Formats | ⏳ |

## Public Data Boundary

| Task | Status |
|---|---|
| Classify Public Fields | ✅ policy / actual fields ⏳ |
| Classify Private Fields | ✅ |
| Classify Pending Confirmation | ✅ |
| Classify Not Used in V1 | ✅ |
| Exclude Internal Workload | ✅ |
| Exclude Student/Internal Review Data | ✅ |

## Data Contract

| Task | Status |
|---|---|
| Faculty Identifier Strategy | ✅ |
| Faculty Summary Contract | ✅ |
| Faculty Detail Contract | ✅ |
| Required Fields | ✅ |
| Optional Fields | ✅ |
| Missing Data Convention | ✅ |
| Asset Contract | ✅ |
| Publication Contract | ✅ |
| External Profile Contract | ✅ |
| Dataset Manifest Contract | ✅ — USE |

## Mapping

| Task | Status |
|---|---|
| Source-to-Serving Mapping | ⏳ template ready |
| Map Faculty Identity | ⏳ |
| Map Contact | ⏳ |
| Map Education | ⏳ |
| Map Research Interests | ⏳ |
| Map Expertise | ⏳ |
| Map Publications | ⏳ |
| Map Profile Images | ⏳ |
| Map CV | ⏳ |
| Map External Profiles | ⏳ |
| Mark private/unmapped fields | ✅ rule / actual fields ⏳ |

## Data Quality

| Task | Status |
|---|---|
| Required Validation | ✅ |
| Email Validation | ✅ |
| URL Validation | ✅ |
| Faculty Duplicate Rule | ✅ |
| Publication Duplicate Rule | ✅ |
| Research Interest Normalization | ✅ |
| Expertise Normalization Boundary | ✅ |
| Empty Value Normalization | ✅ |
| Asset Naming Rule | ✅ |

## Open Issues

| Task | Status |
|---|---|
| Record Data Gaps | ✅ |
| Record Public Visibility Questions | ✅ |
| Record Missing Source Information | ✅ |
| Identify Department decisions | ✅ |

## Development Support

| Task | Status |
|---|---|
| Example Faculty JSON | ✅ |
| Development Fixture | ✅ |
| Frontend Review | 👥 |
| Backend Review | 👥 |
| Data Review | 👥 + source |
| Freeze Data Contract | ⏳ + 👥 |

---

# 45. Acceptance Criteria Coverage

## Source Dataset

| Acceptance Criterion | Status |
|---|---|
| V1 Source Dataset identified | ⏳ actual files required |
| Provider/source recorded | ✅ role / actual metadata pending |
| File/Sheet structure inspected from real data | ⏳ |
| Actual Faculty inventory | ⏳ |
| Actual Publication/Public Output inventory | ⏳ |
| Asset inventory | ⏳ |
| Faculty-Publication relationship identified | ⏳ |

## Mapping

| Acceptance Criterion | Status |
|---|---|
| Source-to-Serving Mapping | ⏳ actual fields |
| No invented source columns | ✅ |
| Faculty Identity Mapping | ⏳ |
| Contact Mapping | ⏳ |
| Education Mapping | ⏳ |
| Research Interest Mapping | ⏳ |
| Expertise Mapping | ⏳ |
| Publication Mapping | ⏳ |
| Asset Mapping | ⏳ |
| External Profile Mapping | ⏳ |

## Classification

| Acceptance Criterion | Status |
|---|---|
| Required / Optional separated | ✅ |
| Public / Private separated | ✅ policy / actual confirmation ⏳ |
| Pending Confirmation recorded | ✅ |
| Not Used in V1 recorded | ✅ rule |
| Workload not Public | ✅ |
| Student/Review/Approval not Public | ✅ |

## Data Quality

| Acceptance Criterion | Status |
|---|---|
| Faculty ID rule | ✅ |
| Missing Required rule | ✅ |
| Missing Optional rule | ✅ |
| Faculty duplicate rule | ✅ |
| Publication duplicate rule | ✅ |
| Normalization rules | ✅ |
| URL / Email validation | ✅ |
| Expertise meaning preserved | ✅ |
| Asset naming/reference rule | ✅ |

## Contract

| Acceptance Criterion | Status |
|---|---|
| Faculty Summary ready | ✅ |
| Faculty Detail ready | ✅ |
| Supports V1 profile | ✅ |
| Supports missing optional data | ✅ |
| Manifest decision | ✅ use manifest |
| One contract for FE/BE/Data | ✅ document / team review 👥 |

## Open Questions

| Acceptance Criterion | Status |
|---|---|
| Data gaps recorded | ✅ |
| Visibility questions recorded | ✅ |
| Unknown never assumed Public | ✅ |
| Development fixture if needed | ✅ |

## Team Review

| Acceptance Criterion | Status |
|---|---|
| Data Contract reviewed | 👥 |
| Frontend confirms UI | 👥 |
| Backend confirms API | 👥 |
| Data confirms mapping implementable | ⏳ + 👥 |
| Contract frozen | ⏳ + 👥 |

---

# 46. Evidence to Close

| Evidence | Status |
|---|---|
| Source Dataset Inventory | ⏳ |
| Source File / Sheet Structure | ⏳ |
| Dataset Provider / Source Notes | ✅ concept / actual metadata pending |
| Public / Private / Pending Classification | ✅ policy / actual fields pending |
| Required / Optional Classification | ✅ |
| Source-to-Serving Mapping Table | ⏳ exact source columns |
| Faculty Identifier Decision | ✅ |
| Faculty Summary Contract | ✅ |
| Faculty Detail Contract | ✅ |
| Example Faculty JSON | ✅ |
| Publication Contract | ✅ |
| Asset Contract | ✅ / actual asset mapping ⏳ |
| Validation Rules | ✅ |
| Normalization Rules | ✅ |
| Duplicate Rules | ✅ |
| Missing Data Rules | ✅ |
| Data Gap / Open Questions | ✅ |
| Manifest Contract | ✅ |
| Development Fixture | ✅ |
| Team Review / Approval | 👥 |

---

# 47. Definition of Done

Issue #22 Close ได้เมื่อ:

1. Actual Source Dataset ถูกส่งให้ Review
2. File/Sheet/Column inventory ทำจากข้อมูลจริง
3. Faculty count และ publication count บันทึกแล้ว
4. Faculty relationship key ยืนยันแล้ว
5. Publication relationship key ยืนยันแล้ว
6. Exact Source-to-Serving Mapping เสร็จ
7. Public/Private/Pending confirm ต่อ actual field
8. Asset inventory เสร็จ
9. Academic year source/rule ยืนยัน
10. Frontend review ผ่าน
11. Backend review ผ่าน
12. Data review ผ่าน
13. Status เปลี่ยนเป็น:

```text
Frozen for V1 Implementation
```

---

# 48. Closure Statement

## Contract / Design

```text
Faculty Identifier Strategy          COMPLETE
Required / Optional Rules            COMPLETE
Missing Data Convention              COMPLETE
Public / Private Safety Policy       COMPLETE
Validation Rules                     COMPLETE
Normalization Rules                  COMPLETE
Duplicate Rules                      COMPLETE
Faculty Summary Contract             COMPLETE
Faculty Detail Contract              COMPLETE
Publication Contract                 COMPLETE
Asset Contract                       COMPLETE
External Profile Contract            COMPLETE
Manifest Contract                    COMPLETE
Development Fixture                  COMPLETE
Source Review Procedure              COMPLETE
Mapping Template                     COMPLETE
```

## Actual Source Evidence

```text
Actual Source Dataset Inspection     PENDING
Exact File/Sheet Inventory           PENDING
Exact Source Field Inventory         PENDING
Actual Source-to-Serving Mapping     PENDING
Actual Asset Inventory               PENDING
Relationship Key Verification        PENDING
Department Visibility Confirmation  PENDING
Team Review / Freeze                 PENDING
```

ดังนั้นสถานะที่ถูกต้องคือ:

> **Data Contract Design: COMPLETE**  
> **Development Fixture: COMPLETE**  
> **Source Validation Framework: COMPLETE**  
> **Issue #22 Closure: BLOCKED only by actual source evidence + human review**

---

# 49. Repository Placement

```text
docs/v1/
└── V1_Validate_Source_Dataset_Public_Faculty_Data_Contract_22.md

fixtures/v1/
├── faculties.json
├── faculties/
│   ├── faculty-alpha.json
│   ├── faculty-beta.json
│   └── faculty-gamma.json
└── manifest.json

docs/v1/
├── source_to_serving_mapping.csv
└── data_classification_register.csv
```

---

# 50. Final Data Contract Snapshot

```text
Department Source Files
          ↓
Actual Source Inventory
          ↓
Exact Source-to-Serving Mapping
          ↓
Validation
          ↓
Classification
(PUBLIC only)
          ↓
Normalization
          ↓
Deduplication
          ↓
Sanitization
          ↓
Serving Dataset
├── faculties.json
└── faculties/{id}.json
          ↓
AWS Lambda
          ↓
Public API
          ↓
Next.js
```

> **Core invariant: Unknown or unconfirmed data never becomes Public by default.**
