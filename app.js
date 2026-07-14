// ============================================================
// FSS FORM ANALYTICS — app.js
// Core application logic: Auth, Routing, Form, Charts, Reports
// ============================================================

// ── Fixed Questions & Subfields ─────────────────────────────
const questions = [
  {
    id: "q1", label: "1. Total No. of FBO in the Division",
    subfields: [
      { id: "q1_totalFbo", label: "Total FBO", type: "number" },
      { id: "q1_regCert",  label: "Registration Certificates", type: "number" },
      { id: "q1_licences", label: "Licences", type: "number" }
    ]
  },
  {
    id: "q2", label: "2. Total Number of Inspections Done",
    subfields: [
      { id: "q2_staticUnits", label: "Static Units", type: "number" },
      { id: "q2_mobileUnits", label: "Mobile Units", type: "number" }
    ]
  },
  { id: "q3", label: "3. Number of Food Samples Sent for Analysis",
    subfields: [{ id: "q3_samplesSent", label: "Samples Sent", type: "number" }] },
  {
    id: "q4", label: "4. Number of Food Samples Analysed (Result Received)",
    subfields: [
      { id: "q4_conform",     label: "Conform to Standard", type: "number" },
      { id: "q4_unsafe",      label: "Unsafe", type: "number" },
      { id: "q4_substandard", label: "Substandard", type: "number" },
      { id: "q4_misbranded",  label: "Misbranded", type: "number" }
    ]
  },
  { id: "q5", label: "5. Number of Meetings Attended",
    subfields: [{ id: "q5_meetings", label: "Meetings", type: "number" }] },
  { id: "q6", label: "6. Number of FBO Trainings / IEC Activities",
    subfields: [{ id: "q6_trainings", label: "Trainings / IEC", type: "number" }] },
  {
    id: "q7", label: "7. Adjudication",
    subfields: [
      { id: "q7_casesFiled",   label: "Cases Filed before AO", type: "number" },
      { id: "q7_casesDecided", label: "Cases Disposed", type: "number" },
      { id: "q7_casesPending", label: "Cases Pending", type: "number" }
    ]
  },
  { id: "q8", label: "8. Convictions and Penalties against FBO",
    subfields: [{ id: "q8_convictions", label: "Details", type: "text" }] },
  { id: "q9", label: "9. Amount Realized",
    subfields: [{ id: "q9_amountRealized", label: "Amount (Rs.)", type: "number" }] },
  { id: "q10", label: "10. Prosecution Cases Launched",
    subfields: [{ id: "q10_prosecutionsLaunched", label: "Cases Launched", type: "number" }] },
  { id: "q11", label: "11. Prosecution Cases Pending",
    subfields: [{ id: "q11_prosecutionsPending", label: "Cases Pending", type: "number" }] },
  { id: "q12", label: "12. Punishments Awarded",
    subfields: [{ id: "q12_punishments", label: "Details", type: "text" }] },
  {
    id: "q13", label: "13. Eat Right Stations & Campus",
    subfields: [
      { id: "q13_eatRightStations", label: "Eat Right Stations", type: "number" },
      { id: "q13_eatRightCampus",   label: "Eat Right Campus", type: "number" }
    ]
  },
  { id: "q14", label: "14. Pending Action on Unsatisfactory Samples",
    subfields: [{ id: "q14_pendingActionUnsatisfactory", label: "Details", type: "text" }] },
  { id: "q15", label: "15. Courts Attended",
    subfields: [{ id: "q15_courtsAttended", label: "Number of Courts", type: "number" }] },
  { id: "q16", label: "16. Food Safety Incidents / Public Complaints Attended",
    subfields: [{ id: "q16_incidentsComplaints", label: "Incidents / Complaints", type: "number" }] }
];

// ── Annexures — 14 Dynamic Tables ───────────────────────────
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

// ── State ──────────────────────────────────────────────────
let STATE = {
  role: 'fso',           // 'fso' | 'admin'
  currentUser: null,
  loginTab: 'fso',
  currentView: 'form',
  submissions: [],
  charts: {},            // chart instances
};

let ALL_USERS = [];

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// ── Init ───────────────────────────────────────────────────
function init() {
  loadData();
  populateMonthSelects();
  renderFormQuestions();
  updateBadge();
  
  // Expose methods globally for HTML actions
  window.doLogin = doLogin;
  window.doSignup = doSignup;
  window.doResetPassword = doResetPassword;
  window.doLogout = doLogout;
  window.switchLoginTab = switchLoginTab;
  window.showScreen = showScreen;
  window.setRole = setRole;
  window.showView = showView;
  window.checkExistingSubmission = checkExistingSubmission;
  window.submitForm = submitForm;
  window.clearForm = clearForm;
  window.addAnnexRow = addAnnexRow;
  window.viewSubmission = viewSubmission;
  window.deleteSubmission = deleteSubmission;
  window.closeModal = closeModal;
  window.closeModalDirect = closeModalDirect;
  window.renderMonthlyReport = renderMonthlyReport;
  window.renderYearlyReport = renderYearlyReport;
  window.exportJSON = exportJSON;
}

// ── LocalStorage Persistence ───────────────────────────────
function loadData() {
  const users = localStorage.getItem('fss_users');
  if (users) {
    ALL_USERS = JSON.parse(users);
  } else {
    ALL_USERS = [
      { name: 'System Admin', email: 'admin@fss.com', password: 'admin123', role: 'admin', approved: true }
    ];
    localStorage.setItem('fss_users', JSON.stringify(ALL_USERS));
  }

  const subs = localStorage.getItem('fss_submissions');
  if (subs) {
    STATE.submissions = JSON.parse(subs);
  } else {
    STATE.submissions = [...window.SEED_SUBMISSIONS];
    saveSubmissions();
  }
}

function saveSubmissions() { localStorage.setItem('fss_submissions', JSON.stringify(STATE.submissions)); }
function saveUsers()       { localStorage.setItem('fss_users',       JSON.stringify(ALL_USERS));         }

// ── Auth ───────────────────────────────────────────────────
let loginTabMode = 'fso';

function switchLoginTab(tab) {
  loginTabMode = tab;
  document.getElementById('tab-fso').classList.toggle('active', tab === 'fso');
  document.getElementById('tab-admin').classList.toggle('active', tab === 'admin');
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').classList.remove('show');
}

function showScreen(screenId) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('signup-screen').style.display = 'none';
  document.getElementById('forgot-screen').style.display = 'none';
  if (document.getElementById(screenId)) {
    document.getElementById(screenId).style.display = 'flex';
  }
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');

  if (!email || !pass) {
    errEl.textContent = '❌ Please enter email and password.';
    errEl.classList.add('show');
    return;
  }

  const user = ALL_USERS.find(u => u.email === email && u.password === pass);
  
  if (!user) {
    errEl.textContent = '❌ Invalid credentials. Please try again.';
    errEl.classList.add('show');
    return;
  }
  if (loginTabMode === 'admin' && user.role !== 'admin') {
    errEl.textContent = '❌ This account does not have admin privileges.';
    errEl.classList.add('show');
    return;
  }
  if (!user.approved && user.role !== 'admin') {
    errEl.textContent = '⏳ Account pending admin approval.';
    errEl.classList.add('show');
    return;
  }

  errEl.classList.remove('show');
  STATE.currentUser = { ...user };
  STATE.role = user.role;

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  document.getElementById('logged-in-user').textContent = user.name;

  applyRole();
  showView(STATE.role === 'admin' ? 'dashboard' : 'form');
}

function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const pass = document.getElementById('signup-pass').value;
  const role = document.getElementById('signup-role').value;
  const errEl = document.getElementById('signup-error');

  if (!name || !email || !pass) {
    errEl.textContent = '❌ All fields are required.';
    errEl.classList.add('show');
    return;
  }
  if (ALL_USERS.find(u => u.email === email)) {
    errEl.textContent = '❌ Email already registered.';
    errEl.classList.add('show');
    return;
  }

  const newUser = {
    name, email, password: pass, role,
    approved: role === 'admin' ? true : false // FSOs need admin approval, admins approved instantly for testing
  };
  ALL_USERS.push(newUser);
  saveUsers();
  
  errEl.classList.remove('show');
  alert(role === 'admin' ? '✨ Admin account created! Log in now.' : '✨ FSO account created! Please wait for Admin approval.');
  showScreen('login-screen');
}

function doResetPassword() {
  const email = document.getElementById('forgot-email').value.trim().toLowerCase();
  const pass = document.getElementById('forgot-pass').value;
  const errEl = document.getElementById('forgot-error');

  if (!email || !pass) {
    errEl.textContent = '❌ Email and new password are required.';
    errEl.classList.add('show');
    return;
  }

  const userIndex = ALL_USERS.findIndex(u => u.email === email);
  if (userIndex === -1) {
    errEl.textContent = '❌ Email not found in the system.';
    errEl.classList.add('show');
    return;
  }

  ALL_USERS[userIndex].password = pass;
  saveUsers();

  errEl.classList.remove('show');
  alert('🔄 Password reset successful! You can now sign in.');
  showScreen('login-screen');
}

function doLogout() {
  STATE.currentUser = null;
  STATE.role = 'fso';
  showScreen('login-screen');
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
  destroyAllCharts();
}

// ── Role Switching ─────────────────────────────────────────
function applyRole() {
  const isAdmin = STATE.role === 'admin';
  document.getElementById('fso-nav').style.display   = isAdmin ? 'none' : 'block';
  document.getElementById('admin-nav').style.display = isAdmin ? 'block' : 'none';
  document.getElementById('role-switcher').style.display =
    STATE.currentUser?.role === 'admin' ? 'flex' : 'none';
}

function setRole(role) {
  STATE.role = role;
  applyRole();
  showView(role === 'admin' ? 'dashboard' : 'form');
}

// ── View Routing ───────────────────────────────────────────
function showView(viewName) {
  STATE.currentView = viewName;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const viewEl = document.getElementById('view-' + viewName);
  if (viewEl) viewEl.classList.add('active');

  const navEl = document.getElementById('nav-' + viewName);
  if (navEl) navEl.classList.add('active');

  // Lazy render
  if (viewName === 'dashboard')        renderDashboard();
  if (viewName === 'submissions')      renderSubmissionsTable();
  if (viewName === 'my-submissions')   renderMySubmissions();
  if (viewName === 'users')            renderUserManagement();
  if (viewName === 'monthly')          populateMonthlySelect();
  if (viewName === 'yearly')           renderYearlyReport();
}

// ── Month Selects ──────────────────────────────────────────
function populateMonthSelects() {
  const months = getLastNMonths(18);
  const formSel = document.getElementById('form-month-select');
  formSel.innerHTML = months.map(m => `<option value="${m.value}">${m.label}</option>`).join('');
  checkExistingSubmission();
}

function populateMonthlySelect() {
  const subs = [...STATE.submissions].sort((a,b) => b.month.localeCompare(a.month));
  const sel = document.getElementById('monthly-report-select');
  if (!subs.length) { sel.innerHTML = '<option>No data</option>'; return; }
  sel.innerHTML = subs.map(s => {
    const [yr, mo] = s.month.split('-');
    return `<option value="${s.month}">${MONTH_NAMES[+mo-1]} ${yr}</option>`;
  }).join('');
  renderMonthlyReport();
}

function getLastNMonths(n) {
  const result = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const val = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    result.push({ value: val, label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` });
  }
  return result;
}

function monthLabel(monthStr) {
  if (!monthStr || !monthStr.includes('-')) return monthStr;
  const [yr, mo] = monthStr.split('-');
  return `${MONTH_NAMES[+mo-1]} ${yr}`;
}

function checkExistingSubmission() {
  const month = document.getElementById('form-month-select').value;
  const exists = STATE.submissions.find(s => s.month === month);
  const warn = document.getElementById('existing-warning');
  if (warn) warn.style.display = exists ? 'inline' : 'none';
  if (exists) loadFormData(exists);
  else clearForm();
}

// ── Form Questions Renderer ────────────────────────────────
function renderFormQuestions() {
  const container = document.getElementById('form-questions');
  if (!container) return;

  let html = '<div style="margin-bottom:30px;"><h3 style="font-size:15px;font-weight:700;color:var(--text-primary);margin-bottom:15px;border-bottom:1px solid var(--border);padding-bottom:8px;">16 Fixed Questions</h3>';

  // Render 16 questions
  questions.forEach(q => {
    html += `
      <div class="fixed-q-box" style="background:var(--bg-secondary);border:1px solid var(--border);padding:16px 18px;border-radius:var(--radius-sm);margin-bottom:14px;">
        <div class="fixed-q-title" style="font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:14px;">${q.label}</div>`;
    q.subfields.forEach(sub => {
      const type = sub.type || 'number';
      html += `
        <div class="subfield-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px dashed var(--border);">
          <div class="subfield-label" style="font-size:13px;color:var(--text-secondary);flex:1;">${sub.label}</div>
          <div class="subfield-input">
            <input type="${type}" id="ans-${sub.id}" placeholder="${type==='number'?'0':'—'}" style="padding:8px 12px;background:var(--bg-primary);border:1px solid var(--border);border-radius:5px;color:var(--text-primary);font-size:13px;width:180px;outline:none;" />
          </div>
        </div>`;
    });
    html += `</div>`;
  });

  html += '</div>';

  // Render 14 Annexures
  html += '<div style="margin-top:40px;"><h3 style="font-size:15px;font-weight:700;color:var(--text-primary);margin-bottom:15px;border-bottom:1px solid var(--border);padding-bottom:8px;">14 Annexures (Dynamic Tables)</h3>';

  annexures.forEach(annex => {
    html += `
      <div class="annexure-box" id="box-${annex.id}" style="margin-top:20px;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;background:var(--bg-secondary);margin-bottom:20px;">
        <div class="annexure-header" style="background:var(--bg-secondary);padding:12px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);">
          <span class="annexure-title" style="font-weight:700;font-size:13px;color:var(--accent-blue);">${annex.title}</span>
          <button class="btn btn-primary btn-sm" onclick="addAnnexRow('${annex.id}')" style="padding:6px 12px;font-size:12px;">+ Add Row</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="annex-table" style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:var(--bg-primary);">
                ${annex.cols.map(c=>`<th style="font-size:11px;font-weight:700;text-transform:uppercase;padding:10px 12px;color:var(--text-secondary);border-bottom:1px solid var(--border);text-align:left;">${c.label}</th>`).join('')}
                <th style="font-size:11px;font-weight:700;text-transform:uppercase;padding:10px 12px;color:var(--text-secondary);border-bottom:1px solid var(--border);text-align:left;width:50px;">Del</th>
              </tr>
            </thead>
            <tbody id="tbody-${annex.id}"></tbody>
          </table>
        </div>
      </div>`;
  });

  html += '</div>';
  container.innerHTML = html;
}

function addAnnexRow(annexId, rowData = null) {
  const annex = annexures.find(a => a.id === annexId);
  const tbody = document.getElementById(`tbody-${annexId}`);
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.style.borderBottom = '1px solid var(--border)';

  let tds = annex.cols.map(c => {
    const val = rowData ? (rowData[c.key] || '') : '';
    return `<td style="padding:8px 10px;"><input type="${c.type}" class="annex-input" data-key="${c.key}" value="${val}" style="width:100%;padding:6px 8px;border:1px solid var(--border);background:var(--bg-primary);color:var(--text-primary);font-size:12px;border-radius:4px;outline:none;" /></td>`;
  }).join('');

  tds += `<td style="padding:8px 10px;text-align:center;"><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()" style="padding:4px 8px;font-size:11px;">✕</button></td>`;
  tr.innerHTML = tds;
  tbody.appendChild(tr);
}

// ── Load Existing Data into Form ───────────────────────────
function loadFormData(sub) {
  // Clear any existing annexure table rows
  annexures.forEach(annex => {
    const tbody = document.getElementById(`tbody-${annex.id}`);
    if (tbody) tbody.innerHTML = '';
  });

  // Load 16 questions
  questions.forEach(q => {
    q.subfields.forEach(subfield => {
      const el = document.getElementById(`ans-${subfield.id}`);
      if (el) el.value = sub.answers?.[subfield.id] || '';
    });
  });

  // Load 14 annexures
  if (sub.annexures) {
    Object.keys(sub.annexures).forEach(annexId => {
      const rows = sub.annexures[annexId] || [];
      rows.forEach(rowData => {
        addAnnexRow(annexId, rowData);
      });
    });
  }
}

// ── Submit Form ────────────────────────────────────────────
function submitForm() {
  const month = document.getElementById('form-month-select').value;
  const district = document.getElementById('form-district').value || 'N/A';
  const designation = document.getElementById('form-designation').value || 'FSO';

  const answers = {};
  
  // Save 16 questions
  questions.forEach(q => {
    q.subfields.forEach(sub => {
      const el = document.getElementById(`ans-${sub.id}`);
      answers[sub.id] = el ? el.value : '';
    });
  });

  // Save 14 annexures
  const annexData = {};
  annexures.forEach(annex => {
    const rows = document.querySelectorAll(`#tbody-${annex.id} tr`);
    annexData[annex.id] = Array.from(rows).map(tr => {
      const obj = {};
      tr.querySelectorAll('.annex-input').forEach(inp => {
        const key = inp.dataset.key;
        obj[key] = inp.value;
      });
      return obj;
    });
  });

  const sub = {
    id: 'sub-' + month,
    month,
    submittedBy: STATE.currentUser.name,
    submittedAt: new Date().toISOString(),
    district,
    designation,
    answers,
    annexures: annexData
  };

  const existIdx = STATE.submissions.findIndex(s => s.month === month);
  if (existIdx >= 0) STATE.submissions[existIdx] = sub;
  else STATE.submissions.push(sub);

  saveSubmissions();
  updateBadge();
  showToast('✅ Monthly return submitted successfully!', 'success');
  clearForm();
}

function clearForm() {
  // Clear 16 questions
  questions.forEach(q => {
    q.subfields.forEach(subfield => {
      const el = document.getElementById(`ans-${subfield.id}`);
      if (el) el.value = '';
    });
  });

  // Clear 14 annexures
  annexures.forEach(annex => {
    const tbody = document.getElementById(`tbody-${annex.id}`);
    if (tbody) tbody.innerHTML = '';
  });
}

// ── My Submissions ─────────────────────────────────────────
function renderMySubmissions() {
  const tbody = document.getElementById('my-submissions-tbody');
  const subs  = [...STATE.submissions].sort((a,b) => b.month.localeCompare(a.month));
  if (!subs.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:40px;">No submissions yet.</td></tr>';
    return;
  }
  tbody.innerHTML = subs.map(s => `
    <tr>
      <td><strong>${monthLabel(s.month)}</strong></td>
      <td>${s.district || '—'}</td>
      <td>${s.answers.q1_totalFbo || '—'}</td>
      <td>${(+(s.answers.q2_staticUnits || 0)) + (+(s.answers.q2_mobileUnits || 0))}</td>
      <td>${s.answers.q3_samplesSent || '—'}</td>
      <td>${formatDate(s.submittedAt)}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="viewSubmission('${s.id}')">👁️ View</button>
      </td>
    </tr>`).join('');
}

// ── Admin: All Submissions Table ───────────────────────────
function renderSubmissionsTable() {
  const query  = (document.getElementById('submissions-search')?.value || '').toLowerCase();
  const tbody  = document.getElementById('submissions-tbody');
  const subs   = [...STATE.submissions]
    .sort((a,b) => b.month.localeCompare(a.month))
    .filter(s => !query ||
      monthLabel(s.month).toLowerCase().includes(query) ||
      (s.district || '').toLowerCase().includes(query) ||
      (s.submittedBy || '').toLowerCase().includes(query));

  if (!subs.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:40px;">No submissions found.</td></tr>';
    return;
  }

  tbody.innerHTML = subs.map(s => {
    const unsafe = +(s.answers.q4_unsafe || 0);
    return `
    <tr>
      <td><strong>${monthLabel(s.month)}</strong></td>
      <td>${s.submittedBy}</td>
      <td>${s.district || '—'}</td>
      <td>${s.answers.q1_totalFbo || '—'}</td>
      <td>${(+(s.answers.q2_staticUnits || 0)) + (+(s.answers.q2_mobileUnits || 0))}</td>
      <td>${s.answers.q3_samplesSent || '—'}</td>
      <td>${unsafe > 0 ? `<span class="badge badge-red">${unsafe}</span>` : `<span class="badge badge-green">0</span>`}</td>
      <td>${formatDate(s.submittedAt)}</td>
      <td style="display:flex;gap:6px;">
        <button class="btn btn-outline btn-sm" onclick="viewSubmission('${s.id}')">👁️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteSubmission('${s.id}')">🗑️</button>
      </td>
    </tr>`;
  }).join('');
}

function viewSubmission(id) {
  const sub = STATE.submissions.find(s => s.id === id);
  if (!sub) return;
  document.getElementById('modal-title').textContent = `📋 ${monthLabel(sub.month)} — Return Details`;

  let html = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;">
      <div><span style="font-size:12px;color:var(--text-muted);">SUBMITTED BY</span><br><strong>${sub.submittedBy}</strong></div>
      <div><span style="font-size:12px;color:var(--text-muted);">DISTRICT</span><br><strong>${sub.district}</strong></div>
      <div><span style="font-size:12px;color:var(--text-muted);">DESIGNATION</span><br><strong>${sub.designation}</strong></div>
      <div><span style="font-size:12px;color:var(--text-muted);">SUBMITTED ON</span><br><strong>${formatDate(sub.submittedAt)}</strong></div>
    </div>
    <hr style="border-color:var(--border);margin-bottom:18px;" />`;

  // Render 16 questions
  html += '<h3 style="font-size:14px;font-weight:700;color:var(--accent-blue);margin-bottom:10px;">16 Fixed Questions</h3>';
  questions.forEach((q, i) => {
    html += `
      <div style="margin-bottom:14px;padding:12px;background:var(--bg-glass);border-radius:var(--radius-sm);border:1px solid var(--border);">
        <div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:6px;">${q.label}</div>`;
    q.subfields.forEach(subfield => {
      html += `
        <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px;border-bottom:1px dashed rgba(255,255,255,0.05);">
          <span style="color:var(--text-secondary);">${subfield.label}</span>
          <span style="font-weight:700;color:var(--text-primary);">${sub.answers?.[subfield.id] || '—'}</span>
        </div>`;
    });
    html += `</div>`;
  });

  // Render 14 Annexures
  html += '<h3 style="font-size:14px;font-weight:700;color:var(--accent-blue);margin-top:20px;margin-bottom:10px;">14 Annexure Tables</h3>';
  annexures.forEach(annex => {
    const rows = sub.annexures?.[annex.id] || [];
    if (!rows.length) return;
    
    html += `
      <div style="margin-bottom:14px;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;background:var(--bg-glass);">
        <div style="background:rgba(255,255,255,0.02);padding:8px 12px;font-weight:700;font-size:12px;color:var(--text-primary);border-bottom:1px solid var(--border);">${annex.title}</div>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:12px;">
            <thead>
              <tr style="background:rgba(0,0,0,0.2);">
                ${annex.cols.map(c => `<th style="padding:6px 8px;color:var(--text-secondary);border-bottom:1px solid var(--border);text-align:left;">${c.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.02);">
                  ${annex.cols.map(c => `<td style="padding:6px 8px;color:var(--text-secondary);">${row[c.key] || '—'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
}

function deleteSubmission(id) {
  if (!confirm('Are you sure you want to delete this submission?')) return;
  STATE.submissions = STATE.submissions.filter(s => s.id !== id);
  saveSubmissions();
  renderSubmissionsTable();
  updateBadge();
  showToast('🗑️ Submission deleted.', 'error');
}

function closeModal(e) { if (e.target === document.getElementById('modal-overlay')) closeModalDirect(); }
function closeModalDirect() { document.getElementById('modal-overlay').classList.remove('open'); }

// ── Dashboard ──────────────────────────────────────────────
function renderDashboard() {
  destroyAllCharts();
  const subs = STATE.submissions;
  if (!subs.length) return;

  const latest = [...subs].sort((a,b) => b.month.localeCompare(a.month))[0];
  const totalFBOs        = +(latest?.answers?.q1_totalFbo || 0);
  const totalInspections = subs.reduce((a,s) => a + +(s.answers.q2_staticUnits||0) + +(s.answers.q2_mobileUnits||0), 0);
  const totalSamples     = subs.reduce((a,s) => a + +(s.answers.q3_samplesSent||0), 0);
  const totalUnsafe      = subs.reduce((a,s) => a + +(s.answers.q4_unsafe||0), 0);
  const totalSubs        = subs.reduce((a,s) => a + +(s.answers.q4_substandard||0), 0);
  const totalAdj         = subs.reduce((a,s) => a + +(s.answers.q7_casesPending||0), 0);
  const safeRate         = totalSamples > 0 ? (((totalSamples - totalUnsafe - totalSubs) / totalSamples) * 100).toFixed(1) : 100;

  document.getElementById('dashboard-stats').innerHTML = `
    <div class="stat-card blue">
      <div class="stat-icon">🏭</div>
      <div class="stat-label">Total FBOs Registered</div>
      <div class="stat-value">${totalFBOs.toLocaleString()}</div>
      <div class="stat-sub">As of ${monthLabel(latest.month)}</div>
    </div>
    <div class="stat-card green">
      <div class="stat-icon">🔍</div>
      <div class="stat-label">Total Inspections</div>
      <div class="stat-value">${totalInspections.toLocaleString()}</div>
      <div class="stat-sub">Across ${subs.length} months</div>
    </div>
    <div class="stat-card orange">
      <div class="stat-icon">🧪</div>
      <div class="stat-label">Samples Collected</div>
      <div class="stat-value">${totalSamples.toLocaleString()}</div>
      <div class="stat-sub">${totalUnsafe} unsafe detected</div>
    </div>
    <div class="stat-card teal">
      <div class="stat-icon">✅</div>
      <div class="stat-label">Food Safety Rate</div>
      <div class="stat-value">${safeRate}%</div>
      <div class="stat-sub">Conform to standard</div>
    </div>
    <div class="stat-card red">
      <div class="stat-icon">⚖️</div>
      <div class="stat-label">Adjudication Cases</div>
      <div class="stat-value">${totalAdj}</div>
      <div class="stat-sub">Total pending across all months</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-icon">📅</div>
      <div class="stat-label">Months on Record</div>
      <div class="stat-value">${subs.length}</div>
      <div class="stat-sub">Monthly returns filed</div>
    </div>`;

  buildInspectionsChart(subs);
  buildSamplesChart(subs);
  buildAdjudicationChart(subs);
  buildFboGrowthChart(subs);
}

// ── Chart Builders ─────────────────────────────────────────
function buildInspectionsChart(subs) {
  const sorted = [...subs].sort((a,b) => a.month.localeCompare(b.month)).slice(-12);
  const ctx = document.getElementById('chart-inspections')?.getContext('2d');
  if (!ctx) return;
  STATE.charts.inspections = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(s => monthLabel(s.month)),
      datasets: [{
        label: 'Inspections',
        data: sorted.map(s => (+(s.answers.q2_staticUnits||0)) + (+(s.answers.q2_mobileUnits||0))),
        backgroundColor: '#3182ce',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aec0' } }, x: { ticks: { color: '#a0aec0' } } }
    }
  });
}

function buildSamplesChart(subs) {
  const sorted = [...subs].sort((a,b) => a.month.localeCompare(b.month)).slice(-12);
  const ctx = document.getElementById('chart-samples')?.getContext('2d');
  if (!ctx) return;
  STATE.charts.samples = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(s => monthLabel(s.month)),
      datasets: [
        { label: 'Conform', data: sorted.map(s => +(s.answers.q4_conform||0)), backgroundColor: '#48bb78' },
        { label: 'Substandard', data: sorted.map(s => +(s.answers.q4_substandard||0)), backgroundColor: '#ecc94b' },
        { label: 'Unsafe', data: sorted.map(s => +(s.answers.q4_unsafe||0)), backgroundColor: '#f56565' },
        { label: 'Misbranded', data: sorted.map(s => +(s.answers.q4_misbranded||0)), backgroundColor: '#9f7aea' }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
      scales: {
        y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aec0' } },
        x: { stacked: true, ticks: { color: '#a0aec0' } }
      }
    }
  });
}

function buildAdjudicationChart(subs) {
  const sorted = [...subs].sort((a,b) => a.month.localeCompare(b.month)).slice(-12);
  const ctx = document.getElementById('chart-adjudication')?.getContext('2d');
  if (!ctx) return;
  STATE.charts.adjudication = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sorted.map(s => monthLabel(s.month)),
      datasets: [
        { label: 'Filed', data: sorted.map(s => +(s.answers.q7_casesFiled||0)), borderColor: '#ecc94b', tension: 0.3 },
        { label: 'Disposed', data: sorted.map(s => +(s.answers.q7_casesDecided||0)), borderColor: '#48bb78', tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } },
      scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aec0' } }, x: { ticks: { color: '#a0aec0' } } }
    }
  });
}

function buildFboGrowthChart(subs) {
  const sorted = [...subs].sort((a,b) => a.month.localeCompare(b.month)).slice(-12);
  const ctx = document.getElementById('chart-fbos')?.getContext('2d');
  if (!ctx) return;
  STATE.charts.fbos = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sorted.map(s => monthLabel(s.month)),
      datasets: [{ label: 'FBOs', data: sorted.map(s => +(s.answers.q1_totalFbo||0)), borderColor: '#3182ce', backgroundColor: 'rgba(49,130,206,0.1)', fill: true, tension: 0.3 }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aec0' } }, x: { ticks: { color: '#a0aec0' } } }
    }
  });
}

function destroyAllCharts() {
  Object.keys(STATE.charts).forEach(k => {
    if (STATE.charts[k]) { STATE.charts[k].destroy(); STATE.charts[k] = null; }
  });
}

// ── Monthly Report ──────────────────────────────────────────
function renderMonthlyReport() {
  const month = document.getElementById('monthly-report-select').value;
  const sub = STATE.submissions.find(s => s.month === month);
  const el  = document.getElementById('monthly-report-content');
  if (!sub) {
    el.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:60px;"><div style="font-size:48px;margin-bottom:12px;">📭</div><p>No submission found for ${monthLabel(month)}.</p></div>`;
    return;
  }

  let htmlRows = '';
  questions.forEach(q => {
    htmlRows += `
      <tr style="background:rgba(255,255,255,0.01);">
        <td colspan="3" style="font-weight:800;color:var(--accent-blue);padding:10px;">${q.label}</td>
      </tr>`;
    q.subfields.forEach(subfield => {
      const val = sub.answers?.[subfield.id] || '—';
      htmlRows += `
        <tr>
          <td style="padding-left:30px;color:var(--text-secondary);">${subfield.label}</td>
          <td style="text-align:center;font-weight:700;color:var(--text-primary);">${val}</td>
        </tr>`;
    });
  });

  let annexRows = '';
  annexures.forEach(annex => {
    const rows = sub.annexures?.[annex.id] || [];
    if (!rows.length) return;
    
    annexRows += `
      <div style="margin-top:20px;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;">
        <div style="background:rgba(255,255,255,0.02);padding:10px;font-weight:700;font-size:12px;border-bottom:1px solid var(--border);">${annex.title}</div>
        <div style="overflow-x:auto;">
          <table class="report-table" style="font-size:12px;">
            <thead>
              <tr style="background:rgba(0,0,0,0.2);">
                ${annex.cols.map(c => `<th>${c.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  ${annex.cols.map(c => `<td>${row[c.key] || '—'}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  });

  el.innerHTML = `
    <div class="report-header-block">
      <h2>Monthly Return — Food Safety Officer</h2>
      <p>Under FSS Act — 2006 &amp; FSS (Licensing &amp; Registration) Regulations 2011</p>
      <p style="margin-top:8px;">
        <span class="badge badge-blue">${monthLabel(month)}</span>
        &nbsp;
        <span class="badge badge-green">${sub.district}</span>
        &nbsp;
        <span class="badge badge-purple">${sub.submittedBy}</span>
      </p>
    </div>
    <table class="report-table">
      <thead>
        <tr><th>Parameter / subfield</th><th style="width:140px;text-align:center;">Value</th></tr>
      </thead>
      <tbody>${htmlRows}</tbody>
    </table>
    ${annexRows}
    <div style="margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:13px;color:var(--text-muted);">
      <div>Submitted by: <strong style="color:var(--text-primary);">${sub.submittedBy}</strong></div>
      <div>Submitted on: <strong style="color:var(--text-primary);">${formatDate(sub.submittedAt)}</strong></div>
    </div>`;
}

// ── Yearly Report ──────────────────────────────────────────
function renderYearlyReport() {
  const fy  = document.getElementById('yearly-fy-select')?.value;
  if (!fy) return;
  const [startYr, endYr] = fy.split('-').map(Number);
  const endYear = 2000 + endYr;

  const fyMonths = [];
  for (let m = 4; m <= 12; m++) fyMonths.push(`${startYr}-${String(m).padStart(2,'0')}`);
  for (let m = 1; m <= 3; m++)  fyMonths.push(`${endYear}-${String(m).padStart(2,'0')}`);

  const subs = fyMonths.map(mo => STATE.submissions.find(s => s.month === mo)).filter(Boolean);
  const el   = document.getElementById('yearly-report-content');

  if (!subs.length) {
    el.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:60px;"><div style="font-size:48px;margin-bottom:12px;">📭</div><p>No data available for FY ${fy}.</p></div>`;
    return;
  }

  const sum = k => subs.reduce((a,s) => a + +(s.answers[k]||0), 0);
  const avg = k => subs.length ? (sum(k)/subs.length).toFixed(1) : 0;
  const lastFBO = subs[subs.length-1]?.answers?.q1_totalFbo || '0';

  const totals = {
    fbos: lastFBO,
    inspections: subs.reduce((a,s) => a + +(s.answers.q2_staticUnits||0) + +(s.answers.q2_mobileUnits||0), 0),
    samples: sum('q3_samplesSent'),
    conform: sum('q4_conform'),
    unsafe: sum('q4_unsafe'),
    substandard: sum('q4_substandard'),
    adjPending: sum('q7_casesPending'),
    adjDisposed: sum('q7_casesDecided'),
    prosecutions: sum('q10_prosecutionsLaunched')
  };

  const safeRate = totals.samples > 0 ? (((totals.samples - totals.unsafe - totals.substandard) / totals.samples)*100).toFixed(1) : '—';

  const monthRows = subs.map(s => `
    <tr>
      <td><strong>${monthLabel(s.month)}</strong></td>
      <td>${(+(s.answers.q2_staticUnits||0)) + (+(s.answers.q2_mobileUnits||0))}</td>
      <td>${s.answers.q3_samplesSent||0}</td>
      <td>${s.answers.q4_unsafe||0}</td>
      <td>${s.answers.q4_substandard||0}</td>
      <td>${s.answers.q4_conform||0}</td>
      <td>${s.answers.q7_casesPending||0}</td>
      <td>${s.answers.q7_casesDecided||0}</td>
    </tr>`).join('');

  el.innerHTML = `
    <div class="report-header-block">
      <h2>Annual Performance Report — FY ${fy.replace('-', '–')}</h2>
      <p>Financial Year: April ${startYr} — March ${endYear} &nbsp;|&nbsp; ${subs.length} months on record</p>
    </div>

    <div class="yearly-summary">
      <div class="ys-card"><div class="ys-val">${(+totals.fbos).toLocaleString()}</div><div class="ys-label">FBOs Registered</div></div>
      <div class="ys-card"><div class="ys-val">${totals.inspections}</div><div class="ys-label">Total Inspections</div></div>
      <div class="ys-card"><div class="ys-val">${totals.samples}</div><div class="ys-label">Samples Collected</div></div>
      <div class="ys-card" style="--accent-blue:var(--accent-red)"><div class="ys-val" style="color:var(--accent-red)">${totals.unsafe}</div><div class="ys-label">Unsafe Samples</div></div>
      <div class="ys-card" style="--accent-blue:var(--accent-green)"><div class="ys-val" style="color:var(--accent-green)">${safeRate}%</div><div class="ys-label">Conform Rate</div></div>
      <div class="ys-card"><div class="ys-val">${totals.adjPending}</div><div class="ys-label">Adjudication Cases</div></div>
      <div class="ys-card"><div class="ys-val">${totals.adjDisposed}</div><div class="ys-label">Cases Disposed</div></div>
      <div class="ys-card"><div class="ys-val">${totals.prosecutions}</div><div class="ys-label">Prosecutions Launched</div></div>
    </div>

    <h3 style="font-family:var(--font-head);font-size:15px;font-weight:700;margin-bottom:14px;">📅 Month-wise Breakdown</h3>
    <table class="report-table" style="margin-bottom:28px;">
      <thead>
        <tr>
          <th>Month</th><th>Inspections</th><th>Samples</th>
          <th>Unsafe</th><th>Substandard</th><th>Conform</th>
          <th>Adj. Pending</th><th>Adj. Disposed</th>
        </tr>
      </thead>
      <tbody>
        ${monthRows}
      </tbody>
    </table>

    <div style="margin-top:8px;padding:16px;background:var(--bg-glass);border-radius:var(--radius-md);border:1px solid var(--border);font-size:13px;color:var(--text-secondary);">
      <strong style="color:var(--text-primary);">📋 Report Generated:</strong> ${new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}
    </div>`;
}

// ── User Management (Admin) ────────────────────────────────
function renderUserManagement() {
  const query = (document.getElementById('users-search')?.value || '').toLowerCase();
  const tbody = document.getElementById('users-tbody');
  
  const filteredUsers = ALL_USERS.filter(u => 
    !query || 
    u.name.toLowerCase().includes(query) || 
    u.email.toLowerCase().includes(query)
  );

  if (!filteredUsers.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:40px;">No users found.</td></tr>';
    return;
  }

  tbody.innerHTML = filteredUsers.map(u => {
    const isSelf = u.email === STATE.currentUser.email;
    const roleBadge = u.role === 'admin' ? '<span class="badge badge-purple">Admin</span>' : '<span class="badge badge-blue">FSO</span>';
    const statusBadge = u.approved 
      ? '<span class="badge badge-green">Approved</span>' 
      : '<span class="badge badge-orange">Pending</span>';
    
    let actions = '';
    if (!isSelf) {
      if (!u.approved) {
        actions += `<button class="btn btn-success btn-sm" onclick="approveUser('${u.email}')">✅ Approve</button>`;
      } else {
        actions += `<button class="btn btn-outline btn-sm" onclick="revokeUser('${u.email}')">Revoke</button>`;
      }
      actions += `<button class="btn btn-danger btn-sm" onclick="deleteUser('${u.email}')" style="margin-left:6px;">🗑️</button>`;
    } else {
      actions = '<span style="font-size:12px;color:var(--text-muted);">Current User</span>';
    }

    return `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td>${roleBadge}</td>
      <td>${statusBadge}</td>
      <td style="display:flex;gap:6px;">${actions}</td>
    </tr>`;
  }).join('');
}

function approveUser(email) {
  const idx = ALL_USERS.findIndex(u => u.email === email);
  if (idx >= 0) { ALL_USERS[idx].approved = true; saveUsers(); renderUserManagement(); showToast('Approved successfully.'); }
}
function revokeUser(email) {
  const idx = ALL_USERS.findIndex(u => u.email === email);
  if (idx >= 0) { ALL_USERS[idx].approved = false; saveUsers(); renderUserManagement(); showToast('Approval revoked.'); }
}
function deleteUser(email) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  ALL_USERS = ALL_USERS.filter(u => u.email !== email);
  saveUsers();
  renderUserManagement();
  showToast('User deleted.', 'error');
}

// ── Helpers & UI Actions ───────────────────────────────────
function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function updateBadge() {
  const badge = document.getElementById('badge-submissions');
  if (badge) {
    const count = STATE.submissions.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span style="font-size:16px;">${type === 'success' ? '🔔' : '⚠️'}</span> <span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3500);
}

function exportJSON() {
  const data = JSON.stringify(STATE.submissions, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `FSO_Submissions_Export_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

window.onload = init;
