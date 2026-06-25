# 🚀 Personal Training Mission — Setup Guide

## สิ่งที่ต้องทำ 3 ขั้นตอน

---

## ขั้นที่ 1 — Deploy ขึ้น GitHub Pages (ฟรี)

1. ไปที่ github.com → สร้าง account (ถ้ายังไม่มี)
2. กด **New repository** → ตั้งชื่อ `ptm-10k`
3. เปิด repository → กด **uploading an existing file**
4. ลาก **ทุกไฟล์ในโฟลเดอร์นี้** ขึ้นไป (index.html, sw.js, manifest.json)
5. ไปที่ **Settings → Pages → Branch: main → Save**
6. รอ 2 นาที → URL จะเป็น: `https://[username].github.io/ptm-10k`

> ✅ แค่นี้ก็เปิดบนมือถือได้แล้ว!

---

## ขั้นที่ 2 — ติดตั้งเป็น App บนมือถือ

### iPhone (Safari):
1. เปิด URL ใน Safari
2. กดปุ่ม **Share** (สี่เหลี่ยมมีลูกศรขึ้น)
3. เลือก **"Add to Home Screen"**
4. ตั้งชื่อ → **Add**
5. App จะอยู่ที่ Home Screen เหมือน App จริงๆ

### Android (Chrome):
1. เปิด URL ใน Chrome
2. กดเมนู **⋮** (3 จุด) มุมขวาบน
3. เลือก **"Add to Home screen"** หรือ **"Install app"**
4. กด **Install**

> ✅ เปิดแบบ Fullscreen ไม่มี browser bar!

---

## ขั้นที่ 3 — เชื่อม Google Drive (Backup/Sync)

### 3.1 สร้าง Google Apps Script:
1. ไปที่ script.google.com
2. กด **New project**
3. ลบ code เดิมทิ้ง → วาง code จากไฟล์ `drive-backend.gs`
4. กด 💾 Save → ตั้งชื่อ "PTM Drive Backend"

### 3.2 ผูกกับ Google Sheet:
1. ใน Apps Script → ไปที่ **Resources → Advanced Google services**
   หรือไปที่ Menu **Extensions → Apps Script** จาก Google Sheet ก็ได้
2. แนะนำ: เปิด Google Sheet ใหม่ก่อน → Extensions → Apps Script
   → วาง code → Save

### 3.3 Deploy เป็น Web App:
1. กด **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** ← สำคัญ!
5. กด **Deploy** → Copy URL ที่ได้

### 3.4 ใส่ URL ในแอป:
1. เปิด PTM App บนมือถือ
2. กดปุ่ม **☁️** มุมขวาบน
3. วาง Apps Script URL
4. กด **💾 บันทึก URL**
5. กด **☁️ Backup** เพื่อทดสอบ

---

## ข้อมูล Storage

| ที่เก็บ | คืออะไร | ข้อดี |
|--------|---------|-------|
| 📱 **localStorage** | หน่วยความจำใน browser ของมือถือ | เร็ว, Offline ได้ |
| ☁️ **Google Drive** | Backup ผ่าน Apps Script → Google Sheet | ข้ามเครื่องได้, กู้คืนได้ |

**Flow:** บันทึก session → เก็บใน localStorage ทันที → Backup ขึ้น Drive อัตโนมัติ (ถ้าตั้ง URL แล้ว)

---

## ถ้า URL เปลี่ยน / ย้ายเครื่อง
1. เปิด App → กด ☁️
2. กด **Restore** เพื่อดึงข้อมูลจาก Drive กลับมา

---

## ไฟล์ในโฟลเดอร์นี้

```
ptm-pwa/
├── index.html        ← แอปหลัก (ทุกอย่างอยู่ในไฟล์เดียว)
├── sw.js             ← Service Worker (ทำให้ Offline ได้)
├── manifest.json     ← PWA Manifest (ทำให้ติดตั้งได้)
├── drive-backend.gs  ← Google Apps Script (วางใน Apps Script)
└── SETUP_GUIDE.md    ← คู่มือนี้
```

> ⚠️ ยังขาด icon-192.png และ icon-512.png
> สร้างได้จาก: favicon.io หรือ realfavicongenerator.net
> ใช้ emoji ⚡ บน background สีส้ม #E8501A

