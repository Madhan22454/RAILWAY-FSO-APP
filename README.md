# Railway FSO Monthly Return Portal

A production-ready full-stack web application for Railway **Food Safety Officers (FSO)** to file their **Monthly Return** under the **Food Safety and Standards Act, 2006**.

---

## 🚀 Features

### 👤 Dual Login Portals
- **Admin Portal** — Analytics dashboard, view all submissions, manage users
- **FSO Portal** — File monthly returns, save drafts, submit reports

### 📊 Admin Analytics Dashboard
- Live stat cards (Total Submissions, Inspections, Samples, Cases)
- Bar charts — Inspections by Month, Samples Sent vs Analysed
- Doughnut chart — Submission status distribution
- Horizontal bar — Adjudication cases by Division
- Monthly & Yearly consolidated reports
- Search/filter all submissions by Month, Year, Status

### 📝 FSO Monthly Return Form
- 16 fixed questions as per FSS Act norms
- 14 dynamic Annexure tables (Annex II–XIV) with Add/Delete Row
- Save as Draft or Final Submit
- Export to PDF (printable) & Excel (.xlsx)

### 🗃️ Database
- SQLite (via Prisma ORM)
- Tables: `User`, `MonthlyReport`, + 14 Annexure tables with foreign keys

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | HTML, Vanilla CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | SQLite + Prisma ORM |
| Charts | Chart.js |
| Export | ExcelJS (Excel), HTML print (PDF) |

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js (v18+)
- npm

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Approve Prisma install scripts
npm approve-scripts prisma @prisma/client @prisma/engines

# 3. Push the database schema (creates dev.db)
npx prisma db push

# 4. Start the server
node server.js
```

Then open your browser at: **http://localhost:3000**

---

## 🔑 Default Admin Credentials

| Field | Value |
|-------|-------|
| Email | `admin@fss.com` |
| Password | `admin123` |

> Change the password after first login via the Manage Users panel.

---

## 📁 Project Structure

```
railway-fso-app/
├── prisma/
│   └── schema.prisma       # Database schema (User, Reports, 14 Annexures)
├── public/
│   ├── index.html          # Main SPA (Admin + FSO portals)
│   ├── styles.css          # Government Blue/White theme
│   ├── app.js              # All frontend logic + Chart.js
│   └── preview.html        # Printable PDF report template
├── server.js               # Express API (Auth, Reports, Export)
├── package.json
└── .gitignore
```

---

## 📄 License
Government use — FSSAI Railway Division.
