# Assignment 2

## Live Demo URL


## Features

Page 1: View Config 
- แสดงข้อมูล Config (ID, Name, Light, Country)  ของ Drone_ID ตามรหัสนักศึกษา
- ดึงค่า DRONE_ID มาจาก Environment Variables (.env.local) 
- เก็บข้อมูล Config ที่ดึงมาได้ไว้ใน Store เพื่อใช้ในหน้า 2 และ 3 
Page 2: Temperature Log Form 
- หน้าฟอร์มสำหรับกรอกอุณหภูมิ (Celsius) 
- เมื่อกด Submit จะยิง POST/logs ไปยัง API Server (Assignment #1) 
- ใช้ข้อมูล drone_id, drone_name, country ที่เก็บไว้ใน Store มาประกอบกับค่า celsius ที่กรอกใหม่ 
Page 3: View Logs 
- แสดงผล Logs 12 รายการล่าสุดในรูปแบบตาราง 
- ทำระบบ Pagination

## Setup

```bash
git clone <your-repo>
npm install
```

## Run
```bash
npm run dev
```