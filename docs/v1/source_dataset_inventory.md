# V1 Source Dataset Inventory — Initial Public Source Validation

## Validation Scope

Initial validation is performed using **one real faculty public profile** as a representative V1 source record.

Faculty:
- Thai name: ผศ.ดร.ประภาพร รัตนธำรง
- English name: Asst.Prof.Dr. Prapaporn Rattanatamrong
- Proposed V1 public identifier: `prapaporn-rattanatamrong`

This is an **initial source-validation sample**, not a claim that the entire department dataset has been validated.

## Dataset / Source Information

- Source type: Public faculty profile content
- Source provider / domain: Computer Science, Faculty of Science, Thammasat University (`cs.sci.tu.ac.th`)
- Source format reviewed: Public web profile + linked public assets / academic profiles
- Record count reviewed in this validation: 1 faculty
- Source data supplied to the V1 team: Faculty profile text and URLs

No standalone internal faculty code was supplied in this sample.

Therefore, for this sample the V1 identifier is derived from the confirmed English name:

`Asst.Prof.Dr. Prapaporn Rattanatamrong`
→ `prapaporn-rattanatamrong`

The team should freeze this rule only if the department confirms that no stable faculty identifier exists in the authoritative source.

## Source Structure / Sections Reviewed

### Header / Identity
- Thai faculty name
- English faculty name
- Academic title embedded in names
- Faculty profile image
- Badge image

### Curriculum Vitae
- Public CV link

### Contact Information
- Building / floor / room
- Phone
- Extension
- Institutional email

### Education
1. Ph.D. (Electrical and Computer Engineering), University of Florida, USA, 2554
2. M.Sc. (Computer Science), University of Southern California, USA, 2547
3. วศ.บ. (วิศวกรรมคอมพิวเตอร์) (เกียรตินิยมอันดับสอง), มหาวิทยาลัยเกษตรศาสตร์, ประเทศไทย, 2544

### Research Interests
1. Distributed Systems and Middleware
2. Cloud and Edge Computing
3. Big Data Engineering
4. Digital Twins
5. Data-Driven Decision Support Systems
6. Real-Time Scheduling

### Expertise
Three source descriptions were supplied. The original wording must be preserved except for formatting normalization.

### Selected Publications
Seven selected-publication records were supplied.

Because these publications are embedded in this faculty's own public profile, the relationship to this faculty is explicit for this sample.

For a future separate publication file or multi-faculty dataset, the actual faculty-publication relationship key still needs validation.

### External Academic Profiles
- Google Scholar: https://scholar.google.com/citations?user=91z1Tv8AAAAJ&hl=en
- ResearchGate: https://www.researchgate.net/profile/Prapaporn-Rattanatamrong

## Public Assets Inventory

| Asset | Status | Source / URL | V1 Behavior |
|---|---|---|---|
| Faculty profile image | PUBLIC | https://cs.sci.tu.ac.th/wp-content/uploads/2020/05/Picture30.jpg | Map to `profile_image.url` |
| Badge image | PUBLIC | https://cs.sci.tu.ac.th/wp-content/uploads/2022/07/All_Badges.png | Map to `badges[]` |
| CV | PUBLIC | https://drive.google.com/file/d/1V1rWtmEoxpTbxBZMehGL05X8vqH5b_lO/view | Map to `cv.url` |
| Google Scholar | PUBLIC | https://scholar.google.com/citations?user=91z1Tv8AAAAJ&hl=en | Map to `publication_profiles[]` |
| ResearchGate | PUBLIC | https://www.researchgate.net/profile/Prapaporn-Rattanatamrong | Map to `publication_profiles[]` |

## Public / Private Classification Result

All fields supplied in this sample are currently published as part of the faculty's public profile or linked public academic assets and are classified as `PUBLIC` for this source-validation sample.

No workload, student information, internal review information, approval data, credentials, or internal notes were supplied.

If a later department source contains those fields, they must be classified separately and excluded from the V1 serving dataset.

## Missing Values / Data Gaps in This Sample

The following target concepts were not supplied:
- Stable department faculty code / internal faculty identifier
- ORCID
- Scopus
- Personal academic website
- Separate standalone academic-position field
- Separate building/floor/room fields

These are optional unless the final frozen V1 contract states otherwise.

## Duplicate Review

### Faculty Duplicate
Only one faculty record was reviewed, so a dataset-wide duplicate-faculty check **cannot be concluded from this sample**.

### Publication Duplicate
Within the seven supplied selected-publication entries, no duplicate DOI was visibly repeated in the supplied source text.

## Inconsistent Format Review

Observed source-format considerations:
- Academic position is embedded in the faculty name rather than supplied as a standalone field.
- Phone and extension are combined in one text value.
- Education entries are free-text records.
- Selected publications are citation-style free text with DOI appended.
- External academic profiles are separate links.

These formats are mappable to the V1 serving contract using the rules in `source_to_serving_mapping_filled.csv`.

## Files Produced for Issue #22
- `source_dataset_inventory.md`
- `source_to_serving_mapping_filled.csv`
- `data_classification_register_filled.csv`

## Remaining Limitation Before Claiming Full Department Validation

This evidence validates the V1 contract against **one real public faculty record**.

It does **not** prove:
- dataset-wide faculty duplicate status,
- completeness across all faculty,
- consistency of every faculty profile,
- existence of a common relationship key across a separate publication dataset,
- or full department-wide source coverage.

Those items require either the complete source dataset or an explicit project decision that the public faculty pages are the authoritative V1 source and broader validation will occur during Data Preparation.
