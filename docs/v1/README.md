# V1 Documentation

## Final canonical documentation

**[`V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md`](./V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md)**
(Issue #29) is the single source of truth for V1: requirements/scope, final architecture,
source → serving data flow, API contract, IAM/security, deployment, architecture decisions,
trade-offs, V1 → V2 direction, and the demo evidence index. Start here.

Thai-language close-out checklist for Issue #29, with an honest status per task:
[`CS361-29_เช็คลิสต์ปิดงาน.md`](./CS361-29_เช็คลิสต์ปิดงาน.md).

The demo evidence package (`evidence/`) described in the final documentation has not been
created in the repository yet — it's deferred until closer to the actual demo.

## Historical design drafts

These package files were written **before** the real department source dataset was available.
They describe the source as `faculties.xlsx` / `publications.csv` / generic Excel-CSV, which is
**not** how V1 was actually built — the real source is the department's public faculty website,
captured as a controlled JSON snapshot. Each file now carries a superseded-by banner pointing to
the final documentation above; they are kept only as historical design records, not as current
guidance.

- `V1_Define_Scope_Architecture_Technical_Contracts_Central_21.md` — original scope/architecture/contract draft (Issue #21)
- `V1_Validate_Source_Dataset_Public_Faculty_Data_Contract_22.md` — original data contract draft (Issue #22)
- `source_to_serving_mapping_template.csv` / `source_to_serving_mapping.csv` — mapping worksheet templates from that period
- `data_classification_register_template.csv` / `data_classification_register.csv` — field visibility worksheet templates from that period
- `V1_TEAM_CARD_ASSIGNMENT_GUIDE.md` — team task-card assignment guide
- `source_dataset_inventory.md` — early inventory notes taken before the real source was inspected
- `AWS V1.drawio (4).png` — early architecture sketch; superseded by the Mermaid diagrams in the final documentation
