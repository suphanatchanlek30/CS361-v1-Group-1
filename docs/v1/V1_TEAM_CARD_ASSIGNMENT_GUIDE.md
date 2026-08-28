# V1 Team Card Assignment Guide — After #21–#23

## Current Baseline

Completed:

```text
#21 Scope / Architecture                 ✅
#22 Source / Data Contract               ✅ FROZEN
#23 Data Preparation / S3                ✅
#30 UX/UI Design                         ✅
```

Next implementation cards:

```text
#24 Lambda Backend
#25 API Gateway / IAM / Cloud Boundary
#26 Faculty Directory Frontend
#27 Faculty Profile Frontend
```

These four cards are the best cards for four teammates to pick now.

---

## Recommended Parallel Work

```text
                         ┌───────────────┐
                         │ #24 Backend   │
                         │ Lambda        │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │ #25 Cloud     │
                         │ API/IAM/CORS  │
                         └───────┬───────┘
                                 │
          ┌──────────────────────┴──────────────────────┐
          │                                             │
          ▼                                             ▼
┌───────────────────┐                         ┌───────────────────┐
│ #26 Directory FE  │                         │ #27 Profile FE    │
│ can start mock    │                         │ can start mock    │
└─────────┬─────────┘                         └─────────┬─────────┘
          └──────────────────────┬──────────────────────┘
                                 ▼
                         ┌───────────────┐
                         │ #28 E2E       │
                         │ Integration   │
                         └───────┬───────┘
                                 ▼
                         ┌───────────────┐
                         │ #29 Final Doc │
                         │ Demo Evidence │
                         └───────────────┘
```

#26/#27 do not need to wait for #24/#25 to start because they can use frozen contract/fixtures.  
They must use the real API before closing.

---

## Card Choice Summary

| Card | Main Work | Best Owner | Start Now? | Final dependency |
|---|---|---|---|---|
| #24 | Lambda read backend | Backend | ✅ | #23 complete |
| #25 | API Gateway, IAM, CORS, cloud security | Cloud/AWS | ✅ partially | #24 for final route integration |
| #26 | Faculty Directory | Frontend | ✅ | #24/#25 before close |
| #27 | Faculty Profile/Public Outputs | Frontend | ✅ | #24/#25/#26 before close |
| #28 | Deployment + E2E QA | Integration/QA | ⏳ later | #24–#27 |
| #29 | Final docs/evidence | Tech Lead/Docs | ✅ collect early | #28 before final close |
| #30 | UX/UI design | — | ✅ completed | consumed by #26/#27 |

---

## Shared Rules for Everyone

1. Do not change #22 contract silently.
2. Do not add V2/V3 features.
3. Public user has no login in V1.
4. Frontend never reads S3 directly.
5. Lambda reads only `serving/*`.
6. No public mutation route.
7. Use `/faculties` and `/faculties/{id}` consistently.
8. Use `ap-southeast-1` for AWS V1 resources unless team approves a change.
9. Any breaking contract change requires team review.
10. Add evidence/tests to the assigned card before marking complete.

---

## Merge / Integration Order

Recommended:

```text
#24 + #25 backend/cloud integration
        ↓
#26 + #27 connect real API
        ↓
#28 E2E / deploy / security tests
        ↓
#29 final docs / demo evidence
```

This minimizes card overlap and makes ownership clear.
