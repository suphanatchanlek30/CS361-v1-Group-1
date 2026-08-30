# V1 Demo Evidence Package

Use this folder for Issue #29 close-out evidence. It's the evidence index referenced by
`docs/v1/V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md`.

```text
evidence/
├── architecture/
├── data/
├── aws/
├── api/
├── frontend/
├── security/
└── e2e/
```

Status legend: ✅ attached in this repo · ⚠️ still needs to be captured from the live
deployment/AWS console and added here.

## Architecture

Attach:
- ⚠️ final architecture (rendered image/export of the Mermaid diagrams in the final doc)
- ⚠️ runtime flow
- ⚠️ data preparation flow
- ⚠️ public/private boundary
- ✅ responsibility table — see §11 of the final documentation (source of truth, no separate file needed)

## Data

Attach:
- ✅ `data/source-metadata-example.json` — controlled snapshot metadata example
- ✅ `data/RUN_RESULT.txt` — preparation run output (22 faculty, PASSED_WITH_WARNINGS)
- ✅ `data/VALIDATION_SUMMARY.json` — machine-readable validation result
- ✅ `data/manifest.json` — dataset manifest
- ✅ `data/preparation-summary.json` — preparation summary with warning details
- ✅ `data/serving-faculties-summary-example.json` — serving `faculties.json`
- ✅ `data/serving-faculty-detail-example-prapaporn-rattanatamrong.json` — serving Faculty detail (complete profile)
- ✅ `data/serving-faculty-detail-example-thapana-boonchoo.json` — serving Faculty detail (missing-optional-data example)
- ✅ `data/DATA_REVIEW_NOTES.md` — human review notes / judgment calls made during preparation
- ⚠️ source-to-serving mapping screenshot/diagram

## AWS

Attach:
- ⚠️ S3 prefixes (`source/current/`, `serving/`, `metadata/`)
- ⚠️ Block Public Access setting
- ⚠️ Lambda configuration
- ⚠️ API Gateway routes
- ⚠️ `prod` stage
- ⚠️ IAM role/policies

## API

Attach:
- ⚠️ list 200
- ⚠️ detail 200
- ⚠️ unknown Faculty 404
- ⚠️ invalid ID 400
- ⚠️ unsupported method
- ⚠️ safe error response

## Frontend

Attach:
- ⚠️ Directory desktop/mobile
- ⚠️ Profile desktop/mobile
- ⚠️ loading
- ⚠️ not found
- ⚠️ API error
- ⚠️ missing optional data (e.g. thapana-boonchoo's profile, which has no CV)

## Security

Attach:
- ⚠️ public source AccessDenied
- ⚠️ public serving AccessDenied
- ⚠️ Lambda serving GetObject allowed
- ⚠️ Lambda source GetObject denied
- ⚠️ Lambda PutObject denied
- ⚠️ Lambda DeleteObject denied
- ⚠️ CORS local
- ⚠️ CORS final Vercel production origin

## E2E

Attach:
- ⚠️ Vercel production URL
- ⚠️ Directory → Profile journey
- ⚠️ Snapshot → Serving → API → UI comparison
- ⚠️ final test summary
- ⚠️ bug/retest result
- ⚠️ team approval

## Final missing values to fill

```text
Vercel Production URL:
______________________________________

Final API Invoke URL:
https://tso165yhp7.execute-api.ap-southeast-1.amazonaws.com/prod

Final Vercel CORS Origin:
______________________________________

GitHub Issue/PR approval link:
______________________________________
```

The API Invoke URL above is the value recorded in the final documentation
(`docs/v1/V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md`, §27/§42). Confirm it
against the actual API Gateway console before final submission — it is not a placeholder, but it
has not been re-verified against a live console read at the time of writing this package.
