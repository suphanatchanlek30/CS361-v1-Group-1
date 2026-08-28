# CS361 Frontend

Frontend สำหรับโปรเจกต์ CS361 พัฒนาด้วย Next.js App Router, React, TypeScript และ Tailwind CSS

README นี้เขียนไว้เพื่อให้สมาชิกทีมที่เพิ่งเข้ามาพัฒนาเปิดโปรเจกต์ รันงาน และรู้ว่าจะเพิ่มไฟล์ไว้ตรงไหนได้ทันที

## Tech Stack

- Next.js `16.3.3`
- React `19.2.8`
- TypeScript
- Tailwind CSS `4`
- ESLint
- npm

## สิ่งที่ต้องมีในเครื่อง

- Node.js เวอร์ชัน `20.9` ขึ้นไป
- npm ติดมากับ Node.js

เช็กเวอร์ชันได้ด้วยคำสั่ง:

```bash
node -v
npm -v
```

## เริ่มต้นพัฒนา

ติดตั้ง dependencies:

```bash
npm install
```

รัน development server:

```bash
npm run dev
```

จากนั้นเปิด:

```text
http://localhost:3000
```

## คำสั่งที่ใช้บ่อย

```bash
npm run dev
```

รันเว็บสำหรับพัฒนาแบบ local

```bash
npm run lint
```

ตรวจคุณภาพโค้ดด้วย ESLint

```bash
npm run build
```

build โปรเจกต์สำหรับ production

```bash
npm run start
```

รัน production build หลังจาก `npm run build`

ควรรัน `npm run lint` และ `npm run build` ก่อนส่งงานหรือ merge งาน

## โครงสร้างโปรเจกต์

```text
frontend/
├─ app/
│  ├─ layout.tsx        # layout หลักของทั้งเว็บ, metadata, font
│  ├─ page.tsx          # หน้าแรกของเว็บ (/)
│  ├─ globals.css       # global style และ Tailwind
│  └─ favicon.ico
├─ components/
│  └─ faculty/          # component ที่เกี่ยวกับข้อมูลอาจารย์/คณะ
├─ lib/                 # helper, service, api client, business logic ฝั่ง frontend
├─ types/               # type/interface กลางที่ใช้ซ้ำหลายไฟล์
├─ public/              # static files เช่น รูปภาพ ไอคอน svg
├─ next.config.ts       # config ของ Next.js
├─ eslint.config.mjs    # config ของ ESLint
├─ tsconfig.json        # config ของ TypeScript และ alias @/*
└─ package.json         # dependencies และ scripts
```

หมายเหตุ: ไฟล์ `.txt` ใน `components/`, `lib/`, และ `types/` ตอนนี้เป็นไฟล์ placeholder สำหรับจองตำแหน่งโครงสร้าง เมื่อเริ่มเขียนจริงให้สร้างไฟล์ `.tsx` หรือ `.ts` ที่เหมาะสม แล้วค่อยลบ placeholder ที่ไม่ใช้

## แนวทางเพิ่มไฟล์

- หน้าใหม่ให้สร้างใน `app/` ตามระบบ App Router เช่น `app/faculty/page.tsx` จะกลายเป็น route `/faculty`
- component ที่ใช้ซ้ำให้เก็บใน `components/`
- component เฉพาะ feature ให้แยกตาม feature เช่น `components/faculty/FacultyCard.tsx`
- logic สำหรับเรียก API หรือแปลงข้อมูลให้เก็บใน `lib/`
- type หรือ interface ที่ใช้ซ้ำให้เก็บใน `types/`
- รูปภาพและไฟล์ static ให้เก็บใน `public/`
- import ภายในโปรเจกต์ให้ใช้ alias `@/` เช่น `@/components/faculty/FacultyCard`

## Environment Variables

ตอนนี้โปรเจกต์ยังไม่มี environment variable ที่จำเป็น

ถ้าต้องเพิ่มค่าที่ใช้ฝั่ง browser ให้ขึ้นต้นด้วย `NEXT_PUBLIC_` เช่น:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

ห้าม commit secret จริงลง repo ให้เก็บค่าจริงไว้ใน `.env.local` เท่านั้น

## Workflow แนะนำ

1. ดึงโค้ดล่าสุดจาก branch หลัก
2. สร้าง branch ใหม่สำหรับงานของตัวเอง
3. รัน `npm install` ถ้า dependencies เปลี่ยน
4. รัน `npm run dev` ระหว่างพัฒนา
5. ก่อนส่งงานให้รัน `npm run lint` และ `npm run build`
6. เปิด Pull Request พร้อมอธิบายว่าทำอะไร และทดสอบอะไรแล้ว

## หมายเหตุสำหรับ Next.js 16

โปรเจกต์นี้ใช้ Next.js 16 ซึ่งมี convention และ API บางส่วนต่างจาก Next.js รุ่นเก่า ถ้าต้องแก้โค้ด Next.js ให้ดูเอกสารที่ติดมากับ package ใน:

```text
node_modules/next/dist/docs/
```

โดยเฉพาะเรื่อง App Router, project structure, routing files และ lint/build behavior
