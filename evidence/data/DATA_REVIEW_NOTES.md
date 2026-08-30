# CS361 V1 — Full Faculty Dataset Review Notes

> Also documented in `docs/v1/V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md`,
> §12.4 "Data quality decisions made during preparation". Kept here as well so it travels with
> the rest of the data evidence.

## What is included

- 22 faculty records from the supplied public faculty directory/profile content.
- Public identity, academic position, profile image, public contact, education, research
  interests, confirmed expertise, CV links, selected publications, and external
  academic-profile links when supplied.
- Placeholder values such as `-`, blank sections, and `ใส่ผลงานตรงนี้` were treated as missing
  optional data and were not published as real content.

## Source inconsistencies that still need human review

1. **Worawan record:** the supplied Thai name uses `วรวรรณ ดีอัซ การ์บาโย`, while the supplied
   English name is `Worawan Marurngsith`. Both were retained exactly as the supplied profile
   content.
2. **Contact differences:** the directory page and individual profile pages show different
   phone/extension values for several faculty members. The profile-page value was used where
   available; the directory value was used when the profile page had no usable phone.
3. **Sirikunya academic links:** the supplied profile linked to Saowaluk Watanapa pages, so
   those links were excluded to avoid publishing another faculty member's profiles.
4. **Single-email contract:** Krittakom and Thapana had more than one public email in the
   supplied content. One primary email was selected because the current V1 contract supports
   one `contact.email`.
5. **Lumpapun ResearchGate link:** the supplied URL points to a ResearchGate publication page
   rather than a person-profile page; it is retained as supplied.
6. **Obvious formatting noise:** leading stray characters in `DSoftware Engineering` and
   `HOptimization` were normalized using the clean wording also present in the supplied
   directory content.

## Script compatibility changes

`scripts/prepare_faculty_data.py` includes two small compatibility fixes over the original
upload:

- Added `Ajarn`, `Ajarn Dr.`, and spacing variants of academic-title prefixes so lecturer IDs
  become stable clean slugs such as `nawarerk-chalarak`, not `ajarn-drnawarerk-chalarak`.
- Added `expertise` to `serving/faculties.json`, matching the frozen Faculty Summary contract.

No web scraping or automatic synchronization was added.
