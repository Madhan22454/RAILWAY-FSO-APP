// ============================================================
// FIXED QUESTIONS — 16 Main Questions
// ============================================================
const questions = [
  {
    id: "q1", label: "1. Total No. of FBO in the Division",
    subfields: [
      { id: "q1_totalFbo", label: "Total FBO" },
      { id: "q1_regCert",  label: "Registration Certificates" },
      { id: "q1_licences", label: "Licences" }
    ]
  },
  {
    id: "q2", label: "2. Total Number of Inspections Done",
    subfields: [
      { id: "q2_staticUnits", label: "Static Units" },
      { id: "q2_mobileUnits", label: "Mobile Units" }
    ]
  },
  { id: "q3", label: "3. Number of Food Samples Sent for Analysis",
    subfields: [{ id: "q3_samplesSent", label: "Samples Sent" }] },
  {
    id: "q4", label: "4. Number of Food Samples Analysed (Result Received)",
    subfields: [
      { id: "q4_conform",     label: "Conform to Standard" },
      { id: "q4_unsafe",      label: "Unsafe" },
      { id: "q4_substandard", label: "Substandard" },
      { id: "q4_misbranded",  label: "Misbranded" }
    ]
  },
  { id: "q5", label: "5. Number of Meetings Attended",
    subfields: [{ id: "q5_meetings", label: "Meetings" }] },
  { id: "q6", label: "6. Number of FBO Trainings / IEC Activities",
    subfields: [{ id: "q6_trainings", label: "Trainings / IEC" }] },
  {
    id: "q7", label: "7. Adjudication",
    subfields: [
      { id: "q7_casesFiled",   label: "Cases Filed before AO" },
      { id: "q7_casesDecided", label: "Cases Decided" },
      { id: "q7_casesPending", label: "Cases Pending" }
    ]
  },
  { id: "q8", label: "8. Convictions and Penalties against FBO",
    subfields: [{ id: "q8_convictions", label: "Details", type: "text" }] },
  { id: "q9", label: "9. Amount Realized",
    subfields: [{ id: "q9_amountRealized", label: "Amount (Rs.)", type: "number" }] },
  { id: "q10", label: "10. Prosecution Cases Launched",
    subfields: [{ id: "q10_prosecutionsLaunched", label: "Cases Launched" }] },
  { id: "q11", label: "11. Prosecution Cases Pending",
    subfields: [{ id: "q11_prosecutionsPending", label: "Cases Pending" }] },
  { id: "q12", label: "12. Punishments Awarded",
    subfields: [{ id: "q12_punishments", label: "Details", type: "text" }] },
  {
    id: "q13", label: "13. Eat Right Stations & Campus",
    subfields: [
      { id: "q13_eatRightStations", label: "Eat Right Stations" },
      { id: "q13_eatRightCampus",   label: "Eat Right Campus" }
    ]
  },
  { id: "q14", label: "14. Pending Action on Unsatisfactory Samples",
    subfields: [{ id: "q14_pendingActionUnsatisfactory", label: "Details", type: "text" }] },
  { id: "q15", label: "15. Courts Attended",
    subfields: [{ id: "q15_courtsAttended", label: "Number of Courts" }] },
  { id: "q16", label: "16. Food Safety Incidents / Public Complaints Attended",
    subfields: [{ id: "q16_incidentsComplaints", label: "Incidents / Complaints" }] }
];

// ============================================================
// ANNEXURES — 14 Dynamic Tables
// ============================================================
const annexures = [
  { id: "annex2", title: "ANNEX II — Inspection Details",
    cols: [{ key: "date", label: "Date", type: "date" }, { key: "stationTrain", label: "Station / Train / Section", type: "text" }, { key: "unitsInspected", label: "Units Inspected", type: "number" }] },
  { id: "annex3", title: "ANNEX III — Food Samples Sent for Analysis",
    cols: [{ key: "sampleNumber", label: "Sample No.", type: "text" }, { key: "collectionDate", label: "Collection Date", type: "date" }, { key: "place", label: "Place", type: "text" }, { key: "fboName", label: "FBO Name", type: "text" }, { key: "fssaiLicense", label: "FSSAI Licence", type: "text" }, { key: "foodArticle", label: "Food Article", type: "text" }, { key: "quantity", label: "Quantity", type: "text" }, { key: "remarks", label: "Remarks", type: "text" }] },
  { id: "annex4", title: "ANNEX IV — Food Sample Reports Received",
    cols: [{ key: "sampleNumber", label: "Sample No.", type: "text" }, { key: "collectionDate", label: "Collection Date", type: "date" }, { key: "place", label: "Place", type: "text" }, { key: "fboName", label: "FBO Name", type: "text" }, { key: "fssaiLicense", label: "FSSAI Licence", type: "text" }, { key: "foodArticle", label: "Food Article", type: "text" }, { key: "result", label: "Result", type: "text" }] },
  { id: "annex5", title: "ANNEX V — Meeting Details",
    cols: [{ key: "date", label: "Date", type: "date" }, { key: "station", label: "Station", type: "text" }, { key: "purpose", label: "Purpose", type: "text" }] },
  { id: "annex6", title: "ANNEX VI — Training / IEC Activities",
    cols: [{ key: "date", label: "Date", type: "date" }, { key: "station", label: "Station", type: "text" }, { key: "trainNumber", label: "Train Number", type: "text" }, { key: "numberAttended", label: "No. Attended", type: "number" }] },
  { id: "annex7A", title: "ANNEX VII A — Adjudication Filed",
    cols: [{ key: "col1", label: "Date of Filing", type: "date" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Case No.", type: "text" }, { key: "col4", label: "Nature of Violation", type: "text" }, { key: "col5", label: "Remarks", type: "text" }] },
  { id: "annex7B", title: "ANNEX VII B — Adjudication Decided",
    cols: [{ key: "col1", label: "Case No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Date of Order", type: "date" }, { key: "col4", label: "Decision", type: "text" }, { key: "col5", label: "Penalty (Rs.)", type: "number" }] },
  { id: "annex7C", title: "ANNEX VII C — Adjudication Pending",
    cols: [{ key: "col1", label: "Case No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Date of Filing", type: "date" }, { key: "col4", label: "Reason for Pending", type: "text" }, { key: "col5", label: "Remarks", type: "text" }] },
  { id: "annex8", title: "ANNEX VIII — Conviction and Penalty",
    cols: [{ key: "col1", label: "Case No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Date of Conviction", type: "date" }, { key: "col4", label: "Nature of Offence", type: "text" }, { key: "col5", label: "Penalty (Rs.)", type: "number" }] },
  { id: "annex9A", title: "ANNEX IX A — Prosecution Cases Filed",
    cols: [{ key: "col1", label: "Sample No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Court Name", type: "text" }, { key: "col4", label: "Date of Filing", type: "date" }, { key: "col5", label: "Remarks", type: "text" }] },
  { id: "annex9B", title: "ANNEX IX B — Pending Prosecution Cases",
    cols: [{ key: "col1", label: "Case No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Court Name", type: "text" }, { key: "col4", label: "Status", type: "text" }, { key: "col5", label: "Next Hearing", type: "date" }] },
  { id: "annex10", title: "ANNEX X — Punishment Awarded",
    cols: [{ key: "col1", label: "Case No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Date of Judgment", type: "date" }, { key: "col4", label: "Punishment Details", type: "text" }, { key: "col5", label: "Amount (Rs.)", type: "number" }] },
  { id: "annex11", title: "ANNEX XI — Eat Right Station and Campus",
    cols: [{ key: "station", label: "Station Name", type: "text" }, { key: "campus", label: "Campus", type: "text" }, { key: "remarks", label: "Remarks", type: "text" }] },
  { id: "annex12", title: "ANNEX XII — Pending Action on Unsatisfactory Samples",
    cols: [{ key: "col1", label: "Sample No.", type: "text" }, { key: "col2", label: "FBO Name", type: "text" }, { key: "col3", label: "Result", type: "text" }, { key: "col4", label: "Action Taken", type: "text" }, { key: "col5", label: "Pending Reason", type: "text" }] },
  { id: "annex13", title: "ANNEX XIII — Court Attendance",
    cols: [{ key: "date", label: "Date", type: "date" }, { key: "court", label: "Court Name", type: "text" }, { key: "purpose", label: "Purpose", type: "text" }, { key: "remarks", label: "Remarks", type: "text" }] },
  { id: "annex14", title: "ANNEX XIV — Public Complaints",
    cols: [{ key: "date", label: "Date", type: "date" }, { key: "complaint", label: "Complaint", type: "text" }, { key: "actionTaken", label: "Action Taken", type: "text" }, { key: "status", label: "Status", type: "text" }] }
];

// ============================================================
// STATE
// ============================================================
let currentUser = null;
let dashCharts = {};

// ============================================================
// LANDING / PORTAL NAVIGATION
// ============================================================
function showPortal(role) {
  hide('landing-screen');
  if (role === 'admin') show('admin-login-screen');
  else show('fso-login-screen');
}
function showLanding() {
  hide('admin-login-screen'); hide('fso-login-screen');
  show('landing-screen');
}
function show(id) { document.getElementById(id).style.display = ''; }
function hide(id) { document.getElementById(id).style.display = 'none'; }

// ============================================================
// AUTHENTICATION
// ============================================================
async function doLogin(expectedRole) {
  const email    = document.getElementById(`${expectedRole}-email`).value;
  const password = document.getElementById(`${expectedRole}-password`).value;
  const errEl    = document.getElementById(`${expectedRole}-login-error`);
  errEl.innerText = '';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.role !== expectedRole) throw new Error(`This portal is for ${expectedRole === 'admin' ? 'Administrators' : 'FSO Officers'} only.`);

    currentUser = data;
    hide('admin-login-screen'); hide('fso-login-screen');

    if (data.role === 'admin') {
      show('admin-dashboard');
      document.getElementById('admin-user-info').innerText = `🛡️ ${data.name}`;
      loadAdminDashboard();
    } else {
      show('fso-dashboard');
      document.getElementById('fso-user-info').innerText = `📋 ${data.name}`;
      renderFSOForm();
    }
  } catch(e) {
    errEl.innerText = '⚠️ ' + e.message;
  }
}

function doLogout() {
  currentUser = null;
  hide('admin-dashboard'); hide('fso-dashboard');
  show('landing-screen');
}

// ============================================================
// ADMIN NAVIGATION
// ============================================================
function adminNav(viewId) {
  document.querySelectorAll('#admin-dashboard .view').forEach(v => { v.style.display = 'none'; v.classList.remove('active'); });
  const el = document.getElementById(viewId);
  el.style.display = 'block'; el.classList.add('active');

  document.querySelectorAll('#admin-dashboard .nav-item').forEach(n => n.classList.remove('active'));
  const navMap = {
    'admin-dashboard-view': 'nav-admin-dashboard',
    'admin-reports-view': 'nav-admin-reports',
    'admin-monthly-view': 'nav-admin-monthly',
    'admin-yearly-view': 'nav-admin-yearly',
    'admin-users-view': 'nav-admin-users',
    'admin-detail-view': 'nav-admin-reports'
  };
  const navEl = document.getElementById(navMap[viewId]);
  if (navEl) navEl.classList.add('active');
}

// ============================================================
// ADMIN DASHBOARD — Load Stats + Charts
// ============================================================
async function loadAdminDashboard() {
  const res = await fetch(`/api/reports?userId=${currentUser.id}&role=admin`);
  const reports = await res.json();

  const total     = reports.length;
  const submitted = reports.filter(r => r.status === 'Submitted').length;
  const drafts    = reports.filter(r => r.status === 'Draft').length;
  const samples   = reports.reduce((s, r) => s + (r.q3_samplesSent || 0), 0);
  const inspections = reports.reduce((s, r) => s + (r.q2_staticUnits || 0) + (r.q2_mobileUnits || 0), 0);
  const cases     = reports.reduce((s, r) => s + (r.q7_casesFiled || 0), 0);

  document.getElementById('stat-total-reports').innerText = total;
  document.getElementById('stat-submitted').innerText = submitted;
  document.getElementById('stat-drafts').innerText = drafts;
  document.getElementById('stat-samples').innerText = samples;
  document.getElementById('stat-inspections').innerText = inspections;
  document.getElementById('stat-cases').innerText = cases;

  // Charts
  buildCharts(reports);

  // Recent Table
  const recent = reports.slice(0, 8);
  document.getElementById('admin-recent-tbody').innerHTML = recent.map(r => `
    <tr>
      <td><strong>${r.fsoName || '—'}</strong></td>
      <td>${r.division || '—'}</td>
      <td>${r.month}</td>
      <td>${r.year}</td>
      <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="viewReportDetail(${r.id})">📄 View</button></td>
    </tr>`).join('');
}

function buildCharts(reports) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthInspections = new Array(12).fill(0);
  const monthSamplesSent = new Array(12).fill(0);
  const monthSamplesAnalysed = new Array(12).fill(0);

  reports.forEach(r => {
    const mIdx = months.findIndex(m => r.month.startsWith(m));
    if (mIdx >= 0) {
      monthInspections[mIdx] += (r.q2_staticUnits || 0) + (r.q2_mobileUnits || 0);
      monthSamplesSent[mIdx] += r.q3_samplesSent || 0;
      monthSamplesAnalysed[mIdx] += (r.q4_conform || 0) + (r.q4_unsafe || 0) + (r.q4_substandard || 0) + (r.q4_misbranded || 0);
    }
  });

  const divisionCases = {};
  reports.forEach(r => {
    if (!divisionCases[r.division]) divisionCases[r.division] = 0;
    divisionCases[r.division] += (r.q7_casesFiled || 0);
  });

  const destroyed = (id) => { if (dashCharts[id]) { dashCharts[id].destroy(); } };

  destroyed('insp');
  dashCharts['insp'] = new Chart(document.getElementById('chart-inspections-monthly'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{ label: 'Inspections', data: monthInspections, backgroundColor: 'rgba(26,35,126,0.7)', borderRadius: 5 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });

  destroyed('status');
  dashCharts['status'] = new Chart(document.getElementById('chart-status-pie'), {
    type: 'doughnut',
    data: {
      labels: ['Submitted', 'Draft'],
      datasets: [{ data: [reports.filter(r=>r.status==='Submitted').length, reports.filter(r=>r.status==='Draft').length], backgroundColor: ['#276749','#c05621'] }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });

  destroyed('samples');
  dashCharts['samples'] = new Chart(document.getElementById('chart-samples'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: 'Sent', data: monthSamplesSent, backgroundColor: 'rgba(0,77,64,0.7)', borderRadius: 3 },
        { label: 'Analysed', data: monthSamplesAnalysed, backgroundColor: 'rgba(0,150,136,0.5)', borderRadius: 3 }
      ]
    },
    options: { plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
  });

  destroyed('adj');
  dashCharts['adj'] = new Chart(document.getElementById('chart-adjudication'), {
    type: 'bar',
    data: {
      labels: Object.keys(divisionCases).length ? Object.keys(divisionCases) : ['No Data'],
      datasets: [{ label: 'Cases Filed', data: Object.values(divisionCases).length ? Object.values(divisionCases) : [0], backgroundColor: 'rgba(128,90,213,0.7)', borderRadius: 5 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } }, indexAxis: 'y' }
  });
}

// ============================================================
// ADMIN — All Reports
// ============================================================
async function loadAllReports() {
  const month  = document.getElementById('filter-month').value;
  const year   = document.getElementById('filter-year').value;
  const status = document.getElementById('filter-status').value;

  const res = await fetch(`/api/reports?userId=${currentUser.id}&role=admin`);
  let reports = await res.json();

  if (month)  reports = reports.filter(r => r.month === month);
  if (year)   reports = reports.filter(r => r.year == year);
  if (status) reports = reports.filter(r => r.status === status);

  document.getElementById('all-reports-tbody').innerHTML = reports.map((r, i) => `
    <tr>
      <td>${i+1}</td>
      <td><strong>${r.fsoName || '—'}</strong></td>
      <td>${r.division || '—'}</td>
      <td>${r.month}</td>
      <td>${r.year}</td>
      <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
      <td>${new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="viewReportDetail(${r.id})">📄 View</button>
        <a href="/api/reports/${r.id}/excel" class="btn btn-secondary btn-sm">📊 Excel</a>
        <a href="/preview.html?id=${r.id}" target="_blank" class="btn btn-secondary btn-sm">🖨️ PDF</a>
      </td>
    </tr>`).join('') || '<tr><td colspan="8" style="text-align:center;color:#718096;padding:20px;">No reports found.</td></tr>';
}

// ============================================================
// ADMIN — Report Detail View
// ============================================================
async function viewReportDetail(id) {
  const res = await fetch(`/api/reports/${id}`);
  const r = await res.json();

  const totalInspections = (r.q2_staticUnits || 0) + (r.q2_mobileUnits || 0);
  const totalSamplesAnalysed = (r.q4_conform || 0) + (r.q4_unsafe || 0) + (r.q4_substandard || 0) + (r.q4_misbranded || 0);

  let html = `
    <div class="detail-section">
      <h4>📋 Report Header</h4>
      <div class="detail-row"><span class="detail-label">FSO Name</span><span class="detail-value">${r.fsoName}</span></div>
      <div class="detail-row"><span class="detail-label">Division</span><span class="detail-value">${r.division}</span></div>
      <div class="detail-row"><span class="detail-label">Month / Year</span><span class="detail-value">${r.month} ${r.year}</span></div>
      <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></span></div>
    </div>
    <div class="detail-section">
      <h4>📊 Summary Statistics</h4>
      <div class="summary-cards-wrap">
        <div class="summary-stat-card"><div class="val">${r.q1_totalFbo || 0}</div><div class="lbl">Total FBOs</div></div>
        <div class="summary-stat-card"><div class="val">${totalInspections}</div><div class="lbl">Total Inspections</div></div>
        <div class="summary-stat-card"><div class="val">${r.q3_samplesSent || 0}</div><div class="lbl">Samples Sent</div></div>
        <div class="summary-stat-card"><div class="val">${totalSamplesAnalysed}</div><div class="lbl">Samples Analysed</div></div>
        <div class="summary-stat-card"><div class="val">${r.q5_meetings || 0}</div><div class="lbl">Meetings</div></div>
        <div class="summary-stat-card"><div class="val">${r.q6_trainings || 0}</div><div class="lbl">Trainings / IEC</div></div>
        <div class="summary-stat-card"><div class="val">${r.q7_casesFiled || 0}</div><div class="lbl">Cases Filed</div></div>
        <div class="summary-stat-card"><div class="val">₹${r.q9_amountRealized || 0}</div><div class="lbl">Amount Realized</div></div>
      </div>
    </div>
    <div class="detail-section">
      <h4>📝 All 16 Questions</h4>
      ${questions.map(q => `
        <div style="margin-bottom:12px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:6px;">${q.label}</div>
          ${q.subfields.map(sub => `
            <div class="detail-row">
              <span class="detail-label">${sub.label}</span>
              <span class="detail-value">${r[sub.id] !== null && r[sub.id] !== undefined ? r[sub.id] : '—'}</span>
            </div>`).join('')}
        </div>`).join('')}
    </div>`;

  // Annexure tables
  const annexMeta = [
    { key: 'annex2', title: 'ANNEX II — Inspections', cols: ['Date','Station/Train','Units Inspected'] },
    { key: 'annex3', title: 'ANNEX III — Samples Sent', cols: ['Sample No','Date','Place','FBO','Licence','Article','Qty','Remarks'] },
    { key: 'annex4', title: 'ANNEX IV — Reports Received', cols: ['Sample No','Date','Place','FBO','Licence','Article','Result'] },
    { key: 'annex5', title: 'ANNEX V — Meetings', cols: ['Date','Station','Purpose'] },
    { key: 'annex6', title: 'ANNEX VI — Training/IEC', cols: ['Date','Station','Train No','No. Attended'] },
    { key: 'annex7A', title: 'ANNEX VII A — Adjudication Filed', cols: ['Date','FBO','Case No','Violation','Remarks'] },
    { key: 'annex7B', title: 'ANNEX VII B — Adjudication Decided', cols: ['Case No','FBO','Order Date','Decision','Penalty'] },
    { key: 'annex7C', title: 'ANNEX VII C — Adjudication Pending', cols: ['Case No','FBO','Filing Date','Reason','Remarks'] },
    { key: 'annex8',  title: 'ANNEX VIII — Conviction & Penalty', cols: ['Case No','FBO','Date','Offence','Penalty'] },
    { key: 'annex9A', title: 'ANNEX IX A — Prosecution Filed', cols: ['Sample No','FBO','Court','Date Filed','Remarks'] },
    { key: 'annex9B', title: 'ANNEX IX B — Prosecution Pending', cols: ['Case No','FBO','Court','Status','Next Hearing'] },
    { key: 'annex10', title: 'ANNEX X — Punishment Awarded', cols: ['Case No','FBO','Date','Details','Amount'] },
    { key: 'annex11', title: 'ANNEX XI — Eat Right', cols: ['Station','Campus','Remarks'] },
    { key: 'annex12', title: 'ANNEX XII — Unsatisfactory Pending', cols: ['Sample No','FBO','Result','Action','Reason'] },
    { key: 'annex13', title: 'ANNEX XIII — Court Attendance', cols: ['Date','Court','Purpose','Remarks'] },
    { key: 'annex14', title: 'ANNEX XIV — Public Complaints', cols: ['Date','Complaint','Action','Status'] }
  ];

  annexMeta.forEach(a => {
    const rows = r[a.key] || [];
    if (!rows.length) return;
    html += `<div class="detail-section">
      <h4>${a.title} (${rows.length} entries)</h4>
      <table class="data-table">
        <thead><tr>${a.cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(row => {
          const vals = Object.values(row).filter((_, i) => i > 1); // skip id & reportId
          return `<tr>${vals.map(v => `<td>${v || '—'}</td>`).join('')}</tr>`;
        }).join('')}</tbody>
      </table></div>`;
  });

  html += `<div style="display:flex;gap:12px;margin-top:20px;">
    <a href="/api/reports/${id}/excel" class="btn btn-fso">📊 Export Excel</a>
    <a href="/preview.html?id=${id}" target="_blank" class="btn btn-secondary">🖨️ View/Print PDF</a>
  </div>`;

  document.getElementById('report-detail-content').innerHTML = html;
  adminNav('admin-detail-view');
}

// ============================================================
// ADMIN — Monthly Report
// ============================================================
async function loadMonthlyReport() {
  const month = document.getElementById('monthly-month').value;
  const year  = document.getElementById('monthly-year').value;

  const res = await fetch(`/api/reports?userId=${currentUser.id}&role=admin`);
  let reports = await res.json();
  reports = reports.filter(r => r.month === month && r.year == year && r.status === 'Submitted');

  const el = document.getElementById('monthly-report-content');
  if (!reports.length) { el.innerHTML = '<div class="detail-section"><p style="color:#718096;text-align:center;padding:20px;">No submitted reports for this month/year.</p></div>'; return; }

  const totals = {
    inspections: reports.reduce((s,r) => s + (r.q2_staticUnits||0) + (r.q2_mobileUnits||0), 0),
    samplesSent: reports.reduce((s,r) => s + (r.q3_samplesSent||0), 0),
    samplesAnalysed: reports.reduce((s,r) => s + (r.q4_conform||0)+(r.q4_unsafe||0)+(r.q4_substandard||0)+(r.q4_misbranded||0), 0),
    conform: reports.reduce((s,r) => s + (r.q4_conform||0), 0),
    unsafe: reports.reduce((s,r) => s + (r.q4_unsafe||0), 0),
    substandard: reports.reduce((s,r) => s + (r.q4_substandard||0), 0),
    meetings: reports.reduce((s,r) => s + (r.q5_meetings||0), 0),
    trainings: reports.reduce((s,r) => s + (r.q6_trainings||0), 0),
    casesFiled: reports.reduce((s,r) => s + (r.q7_casesFiled||0), 0),
    casesPending: reports.reduce((s,r) => s + (r.q7_casesPending||0), 0),
    amount: reports.reduce((s,r) => s + (r.q9_amountRealized||0), 0),
  };

  el.innerHTML = `
    <div class="detail-section">
      <h4>📅 Monthly Summary — ${month} ${year}</h4>
      <div class="summary-cards-wrap">
        <div class="summary-stat-card"><div class="val">${reports.length}</div><div class="lbl">Reports Filed</div></div>
        <div class="summary-stat-card"><div class="val">${totals.inspections}</div><div class="lbl">Total Inspections</div></div>
        <div class="summary-stat-card"><div class="val">${totals.samplesSent}</div><div class="lbl">Samples Sent</div></div>
        <div class="summary-stat-card"><div class="val">${totals.samplesAnalysed}</div><div class="lbl">Samples Analysed</div></div>
        <div class="summary-stat-card"><div class="val">${totals.conform}</div><div class="lbl">Conform</div></div>
        <div class="summary-stat-card"><div class="val">${totals.unsafe}</div><div class="lbl">Unsafe</div></div>
        <div class="summary-stat-card"><div class="val">${totals.meetings}</div><div class="lbl">Meetings</div></div>
        <div class="summary-stat-card"><div class="val">${totals.trainings}</div><div class="lbl">Trainings</div></div>
        <div class="summary-stat-card"><div class="val">${totals.casesFiled}</div><div class="lbl">Cases Filed</div></div>
        <div class="summary-stat-card"><div class="val">₹${totals.amount.toFixed(0)}</div><div class="lbl">Amount Realized</div></div>
      </div>
    </div>
    <div class="detail-section">
      <h4>🗂️ Division-wise Breakdown</h4>
      <table class="data-table">
        <thead><tr><th>Division</th><th>FSO Name</th><th>Inspections</th><th>Samples Sent</th><th>Cases Filed</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${reports.map(r => `<tr>
            <td>${r.division}</td>
            <td>${r.fsoName}</td>
            <td>${(r.q2_staticUnits||0)+(r.q2_mobileUnits||0)}</td>
            <td>${r.q3_samplesSent||0}</td>
            <td>${r.q7_casesFiled||0}</td>
            <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
            <td><button class="btn btn-outline btn-sm" onclick="viewReportDetail(${r.id})">📄 View</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// ============================================================
// ADMIN — Yearly Report
// ============================================================
async function loadYearlyReport() {
  const year = document.getElementById('yearly-year').value;

  const res = await fetch(`/api/reports?userId=${currentUser.id}&role=admin`);
  let reports = await res.json();
  reports = reports.filter(r => r.year == year && r.status === 'Submitted');

  const el = document.getElementById('yearly-report-content');
  if (!reports.length) { el.innerHTML = '<div class="detail-section"><p style="color:#718096;text-align:center;padding:20px;">No submitted reports for this year.</p></div>'; return; }

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const byMonth = {};
  monthNames.forEach(m => { byMonth[m] = { count: 0, inspections: 0, samples: 0, cases: 0 }; });

  reports.forEach(r => {
    const m = r.month;
    if (byMonth[m]) {
      byMonth[m].count++;
      byMonth[m].inspections += (r.q2_staticUnits||0) + (r.q2_mobileUnits||0);
      byMonth[m].samples += r.q3_samplesSent || 0;
      byMonth[m].cases += r.q7_casesFiled || 0;
    }
  });

  const totals = {
    count: reports.length,
    inspections: Object.values(byMonth).reduce((s,m)=>s+m.inspections,0),
    samples: Object.values(byMonth).reduce((s,m)=>s+m.samples,0),
    cases: Object.values(byMonth).reduce((s,m)=>s+m.cases,0),
    amount: reports.reduce((s,r)=>s+(r.q9_amountRealized||0),0)
  };

  el.innerHTML = `
    <div class="detail-section">
      <h4>📆 Yearly Summary — ${year}</h4>
      <div class="summary-cards-wrap">
        <div class="summary-stat-card"><div class="val">${totals.count}</div><div class="lbl">Total Reports</div></div>
        <div class="summary-stat-card"><div class="val">${totals.inspections}</div><div class="lbl">Total Inspections</div></div>
        <div class="summary-stat-card"><div class="val">${totals.samples}</div><div class="lbl">Total Samples Sent</div></div>
        <div class="summary-stat-card"><div class="val">${totals.cases}</div><div class="lbl">Total Cases Filed</div></div>
        <div class="summary-stat-card"><div class="val">₹${totals.amount.toFixed(0)}</div><div class="lbl">Total Amount Realized</div></div>
      </div>
    </div>
    <div class="detail-section">
      <h4>📈 Month-wise Performance</h4>
      <canvas id="chart-yearly-inspections" style="max-height:280px;margin-bottom:20px;"></canvas>
      <table class="data-table" style="margin-top:20px;">
        <thead><tr><th>Month</th><th>Reports Filed</th><th>Inspections</th><th>Samples Sent</th><th>Cases Filed</th></tr></thead>
        <tbody>
          ${monthNames.filter(m => byMonth[m].count > 0).map(m => `<tr>
            <td><strong>${m}</strong></td>
            <td>${byMonth[m].count}</td>
            <td>${byMonth[m].inspections}</td>
            <td>${byMonth[m].samples}</td>
            <td>${byMonth[m].cases}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  // Build yearly chart
  setTimeout(() => {
    const ctx = document.getElementById('chart-yearly-inspections');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthNames,
          datasets: [
            { label: 'Inspections', data: monthNames.map(m => byMonth[m].inspections), backgroundColor: 'rgba(26,35,126,0.7)', borderRadius: 4 },
            { label: 'Samples Sent', data: monthNames.map(m => byMonth[m].samples), backgroundColor: 'rgba(0,77,64,0.6)', borderRadius: 4 },
            { label: 'Cases Filed', data: monthNames.map(m => byMonth[m].cases), backgroundColor: 'rgba(128,90,213,0.6)', borderRadius: 4 }
          ]
        },
        options: { plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
      });
    }
  }, 100);
}

// ============================================================
// ADMIN — Manage Users
// ============================================================
async function loadUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  document.getElementById('users-tbody').innerHTML = users.map((u, i) => `
    <tr>
      <td>${i+1}</td>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td><span class="badge" style="background:${u.role==='admin'?'#bee3f8':'#c6f6d5'};color:${u.role==='admin'?'#2b6cb0':'#276749'}">${u.role === 'admin' ? '🛡️ Admin' : '📋 FSO'}</span></td>
      <td>
        ${u.id !== currentUser.id
          ? `<button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id}, '${u.name}')">🗑️ Delete</button>`
          : `<span style="color:#718096;font-size:12px;">(You)</span>`}
      </td>
    </tr>`).join('');
}

async function createUser() {
  const name     = document.getElementById('new-user-name').value.trim();
  const email    = document.getElementById('new-user-email').value.trim();
  const password = document.getElementById('new-user-password').value;
  const role     = document.getElementById('new-user-role').value;
  const msgEl    = document.getElementById('create-user-msg');

  if (!name || !email || !password) {
    msgEl.style.color = '#c53030';
    msgEl.innerText = '⚠️ Please fill in all fields.';
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, requestorRole: currentUser.role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    msgEl.style.color = '#276749';
    msgEl.innerText = `✅ ${role === 'admin' ? 'Admin' : 'FSO'} account created for ${name}!`;
    document.getElementById('new-user-name').value = '';
    document.getElementById('new-user-email').value = '';
    document.getElementById('new-user-password').value = '';
    document.getElementById('new-user-role').value = 'fso';
    loadUsers();
  } catch(e) {
    msgEl.style.color = '#c53030';
    msgEl.innerText = '⚠️ ' + e.message;
  }
}

async function deleteUser(userId, userName) {
  if (!confirm(`Are you sure you want to delete the account for "${userName}"? This cannot be undone.`)) return;
  try {
    const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    loadUsers();
  } catch(e) {
    alert('⚠️ ' + e.message);
  }
}

// ============================================================
// FSO NAVIGATION
// ============================================================
function fsoNav(viewId) {
  document.querySelectorAll('#fso-dashboard .view').forEach(v => { v.style.display = 'none'; v.classList.remove('active'); });
  const el = document.getElementById(viewId);
  el.style.display = 'block'; el.classList.add('active');
  document.querySelectorAll('#fso-dashboard .nav-item').forEach(n => n.classList.remove('active'));
  const navMap = { 'fso-new-view': 'nav-fso-new', 'fso-my-view': 'nav-fso-my' };
  const navEl = document.getElementById(navMap[viewId]);
  if (navEl) navEl.classList.add('active');
  if (viewId === 'fso-my-view') loadFSOReports();
}

// ============================================================
// FSO FORM — RENDER
// ============================================================
function renderFSOForm() {
  const qContainer = document.getElementById('fixed-questions');
  let qHTML = '<div class="form-section"><h3>Main Questions (Fixed per FSS Act)</h3>';
  questions.forEach(q => {
    qHTML += `<div class="fixed-q-box">
      <div class="fixed-q-title">${q.label}</div>`;
    q.subfields.forEach(sub => {
      const type = sub.type || 'number';
      qHTML += `<div class="subfield-row">
        <div class="subfield-label">${sub.label}</div>
        <div class="subfield-input"><input type="${type}" id="${sub.id}" data-id="${sub.id}" placeholder="${type==='number'?'0':'—'}" /></div>
      </div>`;
    });
    qHTML += '</div>';
  });
  qHTML += '</div>';
  qContainer.innerHTML = qHTML;

  const aContainer = document.getElementById('annexures-container');
  let aHTML = '<div class="form-section"><h3>Annexures (Dynamic Tables)</h3>';
  annexures.forEach(annex => {
    aHTML += `<div class="annexure-box" id="box-${annex.id}">
      <div class="annexure-header">
        <span class="annexure-title">${annex.title}</span>
        <button class="btn btn-fso btn-sm" onclick="addAnnexRow('${annex.id}')">+ Add Row</button>
      </div>
      <table class="annex-table">
        <thead><tr>${annex.cols.map(c=>`<th>${c.label}</th>`).join('')}<th>Del</th></tr></thead>
        <tbody id="tbody-${annex.id}"></tbody>
      </table>
    </div>`;
  });
  aHTML += '</div>';
  aContainer.innerHTML = aHTML;
}

function addAnnexRow(annexId) {
  const annex = annexures.find(a => a.id === annexId);
  const tbody = document.getElementById(`tbody-${annexId}`);
  const tr = document.createElement('tr');
  let tds = annex.cols.map(c => `<td><input type="${c.type}" class="annex-input" data-key="${c.key}" /></td>`).join('');
  tds += `<td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">✕</button></td>`;
  tr.innerHTML = tds;
  tbody.appendChild(tr);
}

// ============================================================
// FSO — SAVE REPORT
// ============================================================
async function fsoSaveReport(status) {
  if (!currentUser) return;
  const month    = document.getElementById('r-month').value;
  const division = document.getElementById('r-division').value;
  const fsoName  = document.getElementById('r-fsoname').value;

  if (!month || !division || !fsoName) { alert('⚠️ Please fill in the Report Header (Month, Division, FSO Name) before saving.'); return; }

  const payload = {
    userId: currentUser.id, month,
    year: document.getElementById('r-year').value,
    division, fsoName, status, annexures: {}
  };

  document.querySelectorAll('[data-id]').forEach(input => {
    const val = input.value;
    payload[input.dataset.id] = input.type === 'number' ? (val ? parseFloat(val) : null) : (val || null);
  });

  annexures.forEach(annex => {
    const rows = document.querySelectorAll(`#tbody-${annex.id} tr`);
    payload.annexures[annex.id] = Array.from(rows).map(tr => {
      const obj = {};
      tr.querySelectorAll('.annex-input').forEach(inp => {
        obj[inp.dataset.key] = inp.type === 'number' ? (inp.value ? parseFloat(inp.value) : null) : (inp.value || null);
      });
      return obj;
    });
  });

  try {
    const res = await fetch('/api/reports', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save report');
    alert(`✅ Report ${status === 'Draft' ? 'saved as Draft' : 'submitted successfully'}!`);
    fsoNav('fso-my-view');
  } catch(e) { alert('⚠️ ' + e.message); }
}

// ============================================================
// FSO — LOAD MY REPORTS
// ============================================================
async function loadFSOReports() {
  const res = await fetch(`/api/reports?userId=${currentUser.id}&role=fso`);
  const reports = await res.json();
  document.getElementById('fso-reports-tbody').innerHTML = reports.map(r => `
    <tr>
      <td><strong>${r.month}</strong></td>
      <td>${r.year}</td>
      <td>${r.division}</td>
      <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
      <td>${new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
      <td>
        <a href="/preview.html?id=${r.id}" target="_blank" class="btn btn-secondary btn-sm">📄 View PDF</a>
        <a href="/api/reports/${r.id}/excel" class="btn btn-secondary btn-sm">📊 Excel</a>
      </td>
    </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:#718096;padding:20px;">No submissions yet.</td></tr>';
}

// ============================================================
// INIT — Intercept Enter keys for login
// ============================================================
window.onload = () => {
  document.getElementById('admin-password').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin('admin'); });
  document.getElementById('fso-password').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin('fso'); });
};

// Expose admin user load when navigating to user mgmt
const _origAdminNav = adminNav;
window.adminNav = function(viewId) {
  _origAdminNav(viewId);
  if (viewId === 'admin-users-view') loadUsers();
  if (viewId === 'admin-reports-view') loadAllReports();
  if (viewId === 'admin-dashboard-view') loadAdminDashboard();
};
