const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// ── Database Seeding ──
async function seedDefaultAdmin() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@fss.com' } });
  if (!admin) {
    await prisma.user.create({
      data: {
        email: 'admin@fss.com',
        password: 'admin123',
        name: 'System Admin',
        role: 'admin'
      }
    });
    console.log('Seeded default admin (admin@fss.com)');
  }
}
seedDefaultAdmin();

// ── Auth API ──
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // In a real app, use JWT. For local app, simple object return is fine.
  res.json(user);
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, requestorRole } = req.body;
  if (requestorRole !== 'admin') {
    return res.status(403).json({ error: 'Only Admins can create accounts' });
  }
  try {
    const user = await prisma.user.create({
      data: { name, email, password, role }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email already exists or invalid data' });
  }
});

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
  res.json(users);
});

app.delete('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete user' });
  }
});

// ── Reports API ──
app.post('/api/reports', async (req, res) => {
  const {
    userId, month, year, division, fsoName, status,
    q1_totalFbo, q1_regCert, q1_licences,
    q2_staticUnits, q2_mobileUnits,
    q3_samplesSent,
    q4_conform, q4_unsafe, q4_substandard, q4_misbranded,
    q5_meetings, q6_trainings,
    q7_casesFiled, q7_casesDecided, q7_casesPending,
    q8_convictions, q9_amountRealized,
    q10_prosecutionsLaunched, q11_prosecutionsPending,
    q12_punishments,
    q13_eatRightStations, q13_eatRightCampus,
    q14_pendingActionUnsatisfactory,
    q15_courtsAttended, q16_incidentsComplaints,
    annexures
  } = req.body;

  try {
    const report = await prisma.monthlyReport.create({
      data: {
        userId, month, year, division, fsoName, status,
        q1_totalFbo, q1_regCert, q1_licences,
        q2_staticUnits, q2_mobileUnits, q3_samplesSent,
        q4_conform, q4_unsafe, q4_substandard, q4_misbranded,
        q5_meetings, q6_trainings,
        q7_casesFiled, q7_casesDecided, q7_casesPending,
        q8_convictions, q9_amountRealized,
        q10_prosecutionsLaunched, q11_prosecutionsPending,
        q12_punishments,
        q13_eatRightStations, q13_eatRightCampus,
        q14_pendingActionUnsatisfactory,
        q15_courtsAttended, q16_incidentsComplaints,
        
        // Nested creates for annexures
        annex2:  { create: annexures.annex2 || [] },
        annex3:  { create: annexures.annex3 || [] },
        annex4:  { create: annexures.annex4 || [] },
        annex5:  { create: annexures.annex5 || [] },
        annex6:  { create: annexures.annex6 || [] },
        annex7A: { create: annexures.annex7A || [] },
        annex7B: { create: annexures.annex7B || [] },
        annex7C: { create: annexures.annex7C || [] },
        annex8:  { create: annexures.annex8 || [] },
        annex9A: { create: annexures.annex9A || [] },
        annex9B: { create: annexures.annex9B || [] },
        annex10: { create: annexures.annex10 || [] },
        annex11: { create: annexures.annex11 || [] },
        annex12: { create: annexures.annex12 || [] },
        annex13: { create: annexures.annex13 || [] },
        annex14: { create: annexures.annex14 || [] },
      }
    });
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create report' });
  }
});

app.get('/api/reports', async (req, res) => {
  const { userId, role } = req.query;
  const whereClause = role === 'admin' ? {} : { userId: parseInt(userId) };
  
  const reports = await prisma.monthlyReport.findMany({
    where: whereClause,
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(reports);
});

app.get('/api/reports/:id', async (req, res) => {
  const report = await prisma.monthlyReport.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      user: true,
      annex2: true, annex3: true, annex4: true, annex5: true, annex6: true,
      annex7A: true, annex7B: true, annex7C: true, annex8: true,
      annex9A: true, annex9B: true, annex10: true, annex11: true,
      annex12: true, annex13: true, annex14: true
    }
  });
  res.json(report);
});

// Update Report (Draft to Submitted, or editing Draft)
app.put('/api/reports/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const annexures = data.annexures || {};
  delete data.annexures;
  delete data.id;
  delete data.userId;
  delete data.user;
  delete data.createdAt;
  delete data.updatedAt;

  try {
    // Basic update for main fields
    await prisma.monthlyReport.update({
      where: { id: parseInt(id) },
      data: data
    });

    // For annexures, in a real app you'd upsert/delete.
    // For simplicity, if editing a draft, we can delete existing annexures and recreate them.
    // This is robust for "save draft" overwrites.
    if (Object.keys(annexures).length > 0) {
       const deletePromises = [
         prisma.annexII.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexIII.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexIV.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexV.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexVI.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexVIIA.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexVIIB.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexVIIC.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexVIII.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexIXA.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexIXB.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexX.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexXI.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexXII.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexXIII.deleteMany({ where: { reportId: parseInt(id) } }),
         prisma.annexXIV.deleteMany({ where: { reportId: parseInt(id) } })
       ];
       await Promise.all(deletePromises);

       // Recreate
       await prisma.monthlyReport.update({
         where: { id: parseInt(id) },
         data: {
           annex2:  { create: annexures.annex2 || [] },
           annex3:  { create: annexures.annex3 || [] },
           annex4:  { create: annexures.annex4 || [] },
           annex5:  { create: annexures.annex5 || [] },
           annex6:  { create: annexures.annex6 || [] },
           annex7A: { create: annexures.annex7A || [] },
           annex7B: { create: annexures.annex7B || [] },
           annex7C: { create: annexures.annex7C || [] },
           annex8:  { create: annexures.annex8 || [] },
           annex9A: { create: annexures.annex9A || [] },
           annex9B: { create: annexures.annex9B || [] },
           annex10: { create: annexures.annex10 || [] },
           annex11: { create: annexures.annex11 || [] },
           annex12: { create: annexures.annex12 || [] },
           annex13: { create: annexures.annex13 || [] },
           annex14: { create: annexures.annex14 || [] }
         }
       });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update report' });
  }
});


const ExcelJS = require('exceljs');

// Export Excel
app.get('/api/reports/:id/excel', async (req, res) => {
  const reportId = parseInt(req.params.id);
  const report = await prisma.monthlyReport.findUnique({
    where: { id: reportId },
    include: {
      user: true,
      annex2: true, annex3: true, annex4: true, annex5: true, annex6: true,
      annex7A: true, annex7B: true, annex7C: true, annex8: true,
      annex9A: true, annex9B: true, annex10: true, annex11: true,
      annex12: true, annex13: true, annex14: true
    }
  });

  if (!report) return res.status(404).send('Report not found');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Monthly Return');
  
  sheet.columns = [
    { header: 'Field', key: 'field', width: 40 },
    { header: 'Value', key: 'value', width: 40 }
  ];

  sheet.addRow({ field: 'Reporting Month', value: report.month });
  sheet.addRow({ field: 'Year', value: report.year });
  sheet.addRow({ field: 'Division', value: report.division });
  sheet.addRow({ field: 'FSO Name', value: report.fsoName });
  sheet.addRow({ field: '', value: '' });

  sheet.addRow({ field: '1. Total FBOs', value: report.q1_totalFbo || 0 });
  sheet.addRow({ field: '2. Total Inspections Done', value: (report.q2_staticUnits || 0) + (report.q2_mobileUnits || 0) });
  sheet.addRow({ field: '3. Samples Sent for Analysis', value: report.q3_samplesSent || 0 });
  
  // You can extend this logic to dump all annexures as new worksheets
  // e.g. const annex2Sheet = workbook.addWorksheet('Annex II');
  // annex2Sheet.addRows(report.annex2);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="FSO_Return_${report.month}_${report.year}.xlsx"`);

  await workbook.xlsx.write(res);
  res.end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
