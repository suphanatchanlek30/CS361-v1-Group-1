# คลังเอกสารเก่า (Archive)

ไฟล์ในโฟลเดอร์นี้เป็นเอกสาร/ไฟล์ที่ทำขึ้น **ก่อน** จะมีชุดข้อมูลจริงจากเว็บไซต์สาขาวิชา (22 คน)
เก็บไว้เป็นบันทึกประวัติการทำงานเท่านั้น **ไม่ใช่เอกสารอ้างอิงปัจจุบัน**

เอกสารหลักที่ใช้งานจริงตอนนี้อยู่ที่
[`../V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md`](../V1_Final_Documentation_Architecture_Decisions_Demo_Evidence.md)

| ไฟล์ | เดิมคืออะไร | ทำไมถึงเก็บไว้เฉยๆ ไม่ใช้แล้ว |
|---|---|---|
| `V1_Define_Scope_Architecture_Technical_Contracts_Central_21.md` | ร่าง scope/architecture/contract ฉบับแรก (Issue #21) | เขียนก่อนมีข้อมูลจริง ยังอ้างว่า Source เป็น `faculties.xlsx`/`publications.csv` ซึ่งไม่ตรงกับของจริง |
| `V1_Validate_Source_Dataset_Public_Faculty_Data_Contract_22.md` | ร่าง data contract ฉบับแรก (Issue #22) | เขียนก่อนมีข้อมูลจริงเช่นกัน ใช้สมมติฐาน Excel/CSV เดียวกัน |
| `V1_TEAM_CARD_ASSIGNMENT_GUIDE.md` | คู่มือแบ่งงานให้สมาชิกทีม | เป็นเอกสารบริหารจัดการงานภายในทีม ไม่ใช่เอกสารอธิบายระบบ |
| `source_dataset_inventory.md` | บันทึกตรวจสอบ source ครั้งแรก โดยใช้อาจารย์ตัวอย่างเพียง 1 ท่าน | ถูกแทนที่ด้วยชุดข้อมูลจริง 22 ท่านที่ตรวจสอบและเตรียมโดยสคริปต์แล้ว |
| `data_classification_register.csv` | ตารางจัดประเภทข้อมูล (public/private) จากตัวอย่าง 1 ท่าน | ขอบเขตข้อมูลจริงตอนนี้ถูกสรุปไว้ในเอกสารหลัก หัวข้อ "Sanitization / Public Data Selection" และ "Public vs Private Data Boundary" แล้ว |
| `data_classification_register_template.csv` | แบบฟอร์มเปล่าของไฟล์ข้างบน | เป็น template ที่ไม่มีข้อมูลจริง ไม่มีประโยชน์อีกต่อไปเมื่อมีไฟล์ที่กรอกแล้ว |
| `source_to_serving_mapping.csv` | ตาราง mapping field จาก source ไป serving จากตัวอย่าง 1 ท่าน | ขอบเขต mapping จริงตอนนี้อยู่ในเอกสารหลัก หัวข้อ "Faculty Summary/Detail Contract" และโค้ดจริงใน `scripts/prepare_faculty_data.py` |
| `source_to_serving_mapping_template.csv` | แบบฟอร์มเปล่าของไฟล์ข้างบน | เป็น template ที่ไม่มีข้อมูลจริง |
| `AWS V1.drawio (4).png` | ภาพร่างสถาปัตยกรรมช่วงแรก | ถูกแทนที่ด้วย diagram แบบ Mermaid ในเอกสารหลัก ซึ่งแก้ไข/ตรวจสอบใน repo ได้ง่ายกว่าไฟล์รูปภาพ |

ถ้าจะดูว่าทีมตัดสินใจอะไรเปลี่ยนไปบ้างจากร่างแรกจนถึงฉบับสุดท้าย ให้เทียบไฟล์ในนี้กับเอกสารหลัก
โดยเฉพาะหัวข้อ "1. Canonical corrections from older drafts" ในเอกสารหลัก
