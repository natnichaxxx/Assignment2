# Assignment 2
Frontend Web App ทำหน้าที่เป็นส่วนติดต่อผู้ใช้ (UI) ให้ผู้ใช้สามารถดูข้อมูล Config, กรอกอุณหภูมิใหม่, และดูประวัติ Logs ทั้งหมด

## Tech Stack
- Language: TypeScript
- Framework: Next.js
- Styling: Tailwind CSS

## Features
1. Page 1: View Config 
- แสดงข้อมูล Config (ID, Name, Light, Country)  ของ Drone_ID
- ดึงค่า DRONE_ID มาจาก Environment Variables (.env.local) 
- เก็บข้อมูล Config ที่ดึงมาได้ไว้ใน Store เพื่อใช้ในหน้า 2 และ 3 
2. Page 2: Temperature Log Form 
- หน้าฟอร์มสำหรับกรอกอุณหภูมิ (Celsius) 
- เมื่อกด Submit จะส่ง POST/logs ไปยัง API Server (Assignment 1) 
- ใช้ข้อมูล drone_id, drone_name, country ที่เก็บไว้ใน Store มาประกอบกับค่า celsius ที่กรอกใหม่ 
3. Page 3: View Logs 
- แสดงผล Logs 12 รายการล่าสุดในรูปแบบตาราง 
- ทำระบบ Pagination

## Setup
```bash
git clone <https://github.com/natnichaxxx/Assignment2.git>
npm install
```

## Environment Setup
สร้างไฟล์ .env.local
```.env.local
NEXT_PUBLIC_API_URL = https://assignment1-tbdw.onrender.com
NEXT_PUBLIC_DRONE_ID = 66010233
```

## Run
```bash
npm run dev
```

## Live Demo URL
https://dronenow.vercel.app/