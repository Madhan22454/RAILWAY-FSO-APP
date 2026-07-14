// ============================================================
// FSS FORM ANALYTICS — app.js
// Core application logic: Auth, Routing, Form, Charts, Reports
// ============================================================

// ── State ──────────────────────────────────────────────────
let STATE = {
  role: 'fso',           // 'fso' | 'admin'
  currentUser: null,
  loginTab: 'fso',
  currentView: 'form',
  submissions: [],
  questions: [],
  formFiles: {},         // { qId: [{ name, size, type, dataUrl }] }
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
    saveUsers();
  }

  const subs = localStorage.getItem('fss_submissions');
  const qs   = localStorage.getItem('fss_questions');

  if (subs) {
    STATE.submissions = JSON.parse(subs);
  } else {
    STATE.submissions = [...window.SEED_SUBMISSIONS];
    saveSubmissions();
  }
  if (qs) {
    STATE.questions = JSON.parse(qs);
  } else {
    STATE.questions = [...window.SEED_QUESTIONS];
    saveQuestions();
  }
}
function saveSubmissions() { localStorage.setItem('fss_submissions', JSON.stringify(STATE.submissions)); }
function saveQuestions()   { localStorage.setItem('fss_questions',   JSON.stringify(STATE.questions));   }
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
  if (!user.approved) {
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
    approved: false // Needs admin approval
  };
  ALL_USERS.push(newUser);
  saveUsers();
  
  errEl.classList.remove('show');
  alert('✨ Account created successfully! Please wait for Admin approval before logging in.');
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

  if (isAdmin) {
    document.getElementById('role-admin-btn').classList.add('active');
    document.getElementById('role-fso-btn').classList.remove('active');
  } else {
    document.getElementById('role-fso-btn').classList.add('active');
    document.getElementById('role-admin-btn').classList.remove('active');
  }
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
  if (viewName === 'builder')          renderBuilder();
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
  const [yr, mo] = monthStr.split('-');
  return `${MONTH_NAMES[+mo-1]} ${yr}`;
}

function checkExistingSubmission() {
  const month = document.getElementById('form-month-select').value;
  const exists = STATE.submissions.find(s => s.month === month);
  const warn = document.getElementById('existing-warning');
  warn.style.display = exists ? 'inline' : 'none';
  if (exists) loadFormData(exists);
}

// ── Form Questions Renderer ────────────────────────────────
function renderFormQuestions() {
  const container = document.getElementById('form-questions');
  if (!container) return;
  STATE.formFiles = {};
  container.innerHTML = STATE.questions.map((q, i) => buildQuestionHTML(q, i)).join('');
  // Attach file listeners
  STATE.questions.forEach(q => {
    if (q.type === 'file') {
      const zone = document.getElementById(`zone-${q.id}`);
      const inp  = document.getElementById(`file-${q.id}`);
      if (zone && inp) {
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); handleFiles(q.id, e.dataTransfer.files); });
        inp.addEventListener('change', () => handleFiles(q.id, inp.files));
      }
    }
  });
}

function buildQuestionHTML(q, i) {
  const labelClass = q.bold ? 'question-label' : 'question-label' ;
  const labelStyle = q.bold ? 'font-weight:800;' : 'font-weight:500;';

  let inputHTML = '';
  if (q.type === 'text') {
    inputHTML = `<input class="form-input" id="ans-${q.id}" type="text" placeholder="Enter value..." />`;
  } else if (q.type === 'textarea') {
    inputHTML = `<textarea class="form-textarea" id="ans-${q.id}" placeholder="Enter your remarks here..."></textarea>`;
  } else if (q.type === 'file') {
    inputHTML = `
      <div class="upload-zone" id="zone-${q.id}" onclick="document.getElementById('file-${q.id}').click()">
        <div class="upload-icon">📎</div>
        <p><strong>Click to browse</strong> or drag &amp; drop any file here</p>
        <p style="font-size:11px;margin-top:4px;">Supports PDF, Excel, Word, Images, CSV — any format</p>
        <input type="file" id="file-${q.id}" multiple />
      </div>
      <div class="file-list" id="file-list-${q.id}"></div>`;
  }

  return `
    <div class="form-question">
      <div class="${labelClass}" style="${labelStyle}">
        <span class="question-num">${i+1}</span>
        <span>${q.label}</span>
      </div>
      ${inputHTML}
    </div>`;
}

function handleFiles(qId, fileList) {
  if (!STATE.formFiles[qId]) STATE.formFiles[qId] = [];
  Array.from(fileList).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      STATE.formFiles[qId].push({ name: file.name, size: file.size, type: file.type, dataUrl: e.target.result });
      renderFileList(qId);
    };
    reader.readAsDataURL(file);
  });
}

function renderFileList(qId) {
  const listEl = document.getElementById(`file-list-${qId}`);
  if (!listEl) return;
  const files = STATE.formFiles[qId] || [];
  listEl.innerHTML = files.map((f, i) => `
    <div class="file-item">
      <span class="file-icon">${getFileIcon(f.type)}</span>
      <div class="file-info">
        <div class="file-name">${f.name}</div>
        <div class="file-size">${formatSize(f.size)}</div>
      </div>
      <button class="file-remove" onclick="removeFile('${qId}',${i})">🗑️</button>
    </div>`).join('');
}

function removeFile(qId, idx) {
  STATE.formFiles[qId].splice(idx, 1);
  renderFileList(qId);
}

function getFileIcon(type) {
  if (!type) return '📄';
  if (type.includes('pdf'))   return '📕';
  if (type.includes('image')) return '🖼️';
  if (type.includes('excel') || type.includes('spreadsheet') || type.includes('csv')) return '📊';
  if (type.includes('word') || type.includes('document')) return '📘';
  if (type.includes('zip') || type.includes('rar')) return '📦';
  return '📄';
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/1048576).toFixed(1) + ' MB';
}

// ── Load Existing Data into Form ───────────────────────────
function loadFormData(sub) {
  STATE.questions.forEach(q => {
    const ans = sub.answers[q.id];
    if (!ans) return;
    if (q.type === 'text' || q.type === 'textarea') {
      const el = document.getElementById(`ans-${q.id}`);
      if (el) el.value = ans.text || '';
    } else if (q.type === 'file') {
      STATE.formFiles[q.id] = ans.files || [];
      renderFileList(q.id);
    }
  });
}

// ── Submit Form ────────────────────────────────────────────
function submitForm() {
  const month = document.getElementById('form-month-select').value;
  const district = document.getElementById('form-district').value || 'N/A';
  const designation = document.getElementById('form-designation').value || 'FSO';

  const answers = {};
  STATE.questions.forEach(q => {
    if (q.type === 'text' || q.type === 'textarea') {
      const el = document.getElementById(`ans-${q.id}`);
      answers[q.id] = { text: el ? el.value : '', files: [] };
    } else if (q.type === 'file') {
      answers[q.id] = { text: '', files: STATE.formFiles[q.id] || [] };
    }
  });

  const sub = {
    id: 'sub-' + month,
    month,
    submittedBy: STATE.currentUser.name,
    submittedAt: new Date().toISOString(),
    district,
    designation,
    answers
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
  STATE.questions.forEach(q => {
    if (q.type === 'text' || q.type === 'textarea') {
      const el = document.getElementById(`ans-${q.id}`);
      if (el) el.value = '';
    } else if (q.type === 'file') {
      STATE.formFiles[q.id] = [];
      renderFileList(q.id);
    }
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
      <td>${s.answers.q1?.text || '—'}</td>
      <td>${s.answers.q2?.text || '—'}</td>
      <td>${s.answers.q3?.text || '—'}</td>
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
    const unsafe = +(s.answers.q5?.text || 0);
    return `
    <tr>
      <td><strong>${monthLabel(s.month)}</strong></td>
      <td>${s.submittedBy}</td>
      <td>${s.district || '—'}</td>
      <td>${s.answers.q1?.text || '—'}</td>
      <td>${s.answers.q2?.text || '—'}</td>
      <td>${s.answers.q3?.text || '—'}</td>
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

  STATE.questions.forEach((q, i) => {
    const ans = sub.answers[q.id];
    if (!ans) return;
    html += `
      <div style="margin-bottom:14px;padding:12px;background:var(--bg-glass);border-radius:var(--radius-sm);border:1px solid var(--border);">
        <div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:6px;">${i+1}. ${q.label}</div>`;

    if (q.type === 'file') {
      if (ans.files && ans.files.length) {
        html += `<div style="display:flex;flex-direction:column;gap:6px;">` +
          ans.files.map(f => `<div class="file-item"><span class="file-icon">${getFileIcon(f.type)}</span>
            <div class="file-info"><div class="file-name">${f.name}</div><div class="file-size">${formatSize(f.size)}</div></div></div>`).join('') +
          `</div>`;
      } else {
        html += `<span style="color:var(--text-muted);font-size:13px;">No files uploaded</span>`;
      }
    } else {
      html += `<div style="font-size:14px;color:var(--text-secondary);">${ans.text || '—'}</div>`;
    }
    html += `</div>`;
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
  const totalFBOs        = +(latest?.answers?.q1?.text || 0);
  const totalInspections = subs.reduce((a,s) => a + +(s.answers.q2?.text||0), 0);
  const totalSamples     = subs.reduce((a,s) => a + +(s.answers.q3?.text||0), 0);
  const totalUnsafe      = subs.reduce((a,s) => a + +(s.answers.q5?.text||0), 0);
  const totalSubs        = subs.reduce((a,s) => a + +(s.answers.q6?.text||0), 0);
  const totalAdj         = subs.reduce((a,s) => a + +(s.answers.q10?.text||0), 0);
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
      <div class="stat-icon">📁</div>
      <div class="stat-label">Months on Record</div>
      <div class="stat-value">${subs.length}</div>
      <div class="stat-sub">Monthly returns filed</div>
    </div>`;

  const sorted = [...subs].sort((a,b) => a.month.localeCompare(b.month)).slice(-12);
  const labels = sorted.map(s => monthLabel(s.month).split(' ').map((w,i)=> i===0 ? w.slice(0,3):w).join(' '));

  // Chart 1: Inspections
  STATE.charts.inspections = new Chart(document.getElementById('chart-inspections'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Inspections',
        data: sorted.map(s => +(s.answers.q2?.text||0)),
        backgroundColor: 'rgba(99,179,237,0.7)',
        borderColor: '#63b3ed',
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: chartOptions('Number of Inspections')
  });

  // Chart 2: Sample Results Stacked
  STATE.charts.samples = new Chart(document.getElementById('chart-samples'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Conform',    data: sorted.map(s=>+(s.answers.q7?.text||0)), backgroundColor:'rgba(104,211,145,0.8)', borderRadius:4 },
        { label: 'Substandard',data: sorted.map(s=>+(s.answers.q6?.text||0)), backgroundColor:'rgba(246,173,85,0.8)', borderRadius:4 },
        { label: 'Unsafe',     data: sorted.map(s=>+(s.answers.q5?.text||0)), backgroundColor:'rgba(252,129,129,0.8)', borderRadius:4 },
        { label: 'Misbranded', data: sorted.map(s=>+(s.answers.q8?.text||0)), backgroundColor:'rgba(183,148,244,0.8)', borderRadius:4 },
      ]
    },
    options: { ...chartOptions('Samples'), plugins: { ...chartOptions('').plugins }, scales: { x: stackedAxis(), y: { ...stackedAxis(), stacked:true, ticks:{ color:'#94a3b8' } } } }
  });

  // Chart 3: Adjudication line
  STATE.charts.adjudication = new Chart(document.getElementById('chart-adjudication'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label:'Pending Cases',  data: sorted.map(s=>+(s.answers.q10?.text||0)), borderColor:'#f6ad55', backgroundColor:'rgba(246,173,85,0.1)', fill:true, tension:0.4, pointRadius:4 },
        { label:'Disposed Cases', data: sorted.map(s=>+(s.answers.q11?.text||0)), borderColor:'#68d391', backgroundColor:'rgba(104,211,145,0.1)', fill:true, tension:0.4, pointRadius:4 },
      ]
    },
    options: chartOptions('Cases')
  });

  // Chart 4: FBO Growth
  STATE.charts.fbos = new Chart(document.getElementById('chart-fbos'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label:'Registered FBOs',
        data: sorted.map(s=>+(s.answers.q1?.text||0)),
        borderColor:'#b794f4',
        backgroundColor:'rgba(183,148,244,0.12)',
        fill:true, tension:0.4, pointRadius:5,
        pointBackgroundColor:'#b794f4'
      }]
    },
    options: chartOptions('FBO Count')
  });
}

function chartOptions(yLabel) {
  return {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#94a3b8', font:{ size:11 } } },
      tooltip: { backgroundColor:'#1e293b', titleColor:'#e2e8f0', bodyColor:'#94a3b8', borderColor:'rgba(255,255,255,0.08)', borderWidth:1 }
    },
    scales: {
      x: { ticks:{ color:'#64748b', font:{size:11} }, grid:{ color:'rgba(255,255,255,0.04)' } },
      y: { ticks:{ color:'#94a3b8', font:{size:11} }, grid:{ color:'rgba(255,255,255,0.05)' }, title:{ display:!!yLabel, text:yLabel, color:'#64748b', font:{size:11} } }
    }
  };
}

function stackedAxis() {
  return { stacked: true, ticks:{ color:'#64748b', font:{size:11} }, grid:{ color:'rgba(255,255,255,0.04)' } };
}

function destroyAllCharts() {
  Object.values(STATE.charts).forEach(c => { try { c.destroy(); } catch(e){} });
  STATE.charts = {};
}

// ── Monthly Report ─────────────────────────────────────────
function renderMonthlyReport() {
  const month = document.getElementById('monthly-report-select')?.value;
  if (!month) return;
  const sub = STATE.submissions.find(s => s.month === month);
  const el  = document.getElementById('monthly-report-content');
  if (!sub) {
    el.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:60px;"><div style="font-size:48px;margin-bottom:12px;">📭</div><p>No submission found for ${monthLabel(month)}.</p></div>`;
    return;
  }

  const rows = STATE.questions.filter(q => q.type !== 'file').map((q, i) => {
    const val = sub.answers[q.id]?.text || '—';
    return `<tr>
      <td style="width:40px;font-weight:700;text-align:center;">${i+1}</td>
      <td><strong>${q.label}</strong></td>
      <td style="text-align:center;font-weight:700;color:var(--accent-blue);">${val}</td>
    </tr>`;
  }).join('');

  const fileQ = STATE.questions.filter(q => q.type === 'file');
  const fileSection = fileQ.map(q => {
    const files = sub.answers[q.id]?.files || [];
    if (!files.length) return '';
    return `<div style="margin-top:16px;"><strong>📎 ${q.label}</strong>
      <div class="file-list" style="margin-top:8px;">
        ${files.map(f => `<div class="file-item"><span class="file-icon">${getFileIcon(f.type)}</span>
          <div class="file-info"><div class="file-name">${f.name}</div><div class="file-size">${formatSize(f.size)}</div></div></div>`).join('')}
      </div></div>`;
  }).join('');

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
        <tr><th style="width:40px;">#</th><th>Parameter</th><th style="width:120px;">Value</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    ${fileSection}
    <div style="margin-top:24px;padding:16px;background:var(--bg-glass);border-radius:var(--radius-md);border:1px solid var(--border);">
      <strong>📌 Remarks:</strong>
      <p style="margin-top:8px;font-size:13px;color:var(--text-secondary);">${sub.answers.q16?.text || 'No remarks.'}</p>
    </div>
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

  const sum = k => subs.reduce((a,s) => a + +(s.answers[k]?.text||0), 0);
  const avg = k => subs.length ? (sum(k)/subs.length).toFixed(1) : 0;
  const lastFBO = subs[subs.length-1]?.answers?.q1?.text || '0';

  const totals = {
    fbos: lastFBO, inspections: sum('q2'), samples: sum('q3'),
    sampled: sum('q4'), unsafe: sum('q5'), substandard: sum('q6'),
    conform: sum('q7'), misbranded: sum('q8'), adjPending: sum('q10'),
    adjDisposed: sum('q11'), prosecutions: sum('q13')
  };

  const safeRate = totals.sampled > 0 ? ((totals.conform / totals.sampled)*100).toFixed(1) : '—';

  const monthRows = subs.map(s => `
    <tr>
      <td><strong>${monthLabel(s.month)}</strong></td>
      <td>${s.answers.q2?.text||0}</td>
      <td>${s.answers.q3?.text||0}</td>
      <td>${s.answers.q5?.text||0}</td>
      <td>${s.answers.q6?.text||0}</td>
      <td>${s.answers.q7?.text||0}</td>
      <td>${s.answers.q10?.text||0}</td>
      <td>${s.answers.q11?.text||0}</td>
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
        <tr style="background:rgba(99,179,237,0.08);">
          <td><strong>TOTAL</strong></td>
          <td><strong>${totals.inspections}</strong></td>
          <td><strong>${totals.samples}</strong></td>
          <td><strong style="color:var(--accent-red)">${totals.unsafe}</strong></td>
          <td><strong style="color:var(--accent-orange)">${totals.substandard}</strong></td>
          <td><strong style="color:var(--accent-green)">${totals.conform}</strong></td>
          <td><strong>${totals.adjPending}</strong></td>
          <td><strong>${totals.adjDisposed}</strong></td>
        </tr>
        <tr style="background:rgba(183,148,244,0.06);">
          <td><strong>MONTHLY AVG</strong></td>
          <td><strong>${avg('q2')}</strong></td>
          <td><strong>${avg('q3')}</strong></td>
          <td><strong>${avg('q5')}</strong></td>
          <td><strong>${avg('q6')}</strong></td>
          <td><strong>${avg('q7')}</strong></td>
          <td><strong>${avg('q10')}</strong></td>
          <td><strong>${avg('q11')}</strong></td>
        </tr>
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
  const user = ALL_USERS.find(u => u.email === email);
  if (user) {
    user.approved = true;
    saveUsers();
    renderUserManagement();
    showToast('✅ User approved successfully.', 'success');
  }
}

function revokeUser(email) {
  const user = ALL_USERS.find(u => u.email === email);
  if (user) {
    user.approved = false;
    saveUsers();
    renderUserManagement();
    showToast('User access revoked.', 'error');
  }
}

function deleteUser(email) {
  if (!confirm('Are you sure you want to permanently delete this user?')) return;
  ALL_USERS = ALL_USERS.filter(u => u.email !== email);
  saveUsers();
  renderUserManagement();
  showToast('🗑️ User deleted.', 'error');
}

// ── Form Builder ───────────────────────────────────────────
function renderBuilder() {
  const list = document.getElementById('builder-list');
  list.innerHTML = STATE.questions.map((q, i) => `
    <div class="builder-item">
      <span class="builder-drag">⠿</span>
      <span class="builder-label ${q.bold ? 'is-bold' : ''}">${i+1}. ${q.label}</span>
      <span class="builder-type-badge">
        <span class="badge ${q.type === 'file' ? 'badge-purple' : q.type === 'textarea' ? 'badge-orange' : 'badge-blue'}">
          ${q.type === 'file' ? '📎 File' : q.type === 'textarea' ? '📝 Long Text' : '✏️ Text'}
        </span>
        ${q.bold ? '<span class="badge badge-green" style="margin-left:4px;">Bold</span>' : ''}
      </span>
      <div class="builder-actions">
        <button class="btn btn-outline btn-sm" onclick="toggleBold(${i})">
          ${q.bold ? '🔡 Unbold' : '𝐁 Bold'}
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteQuestion(${i})">🗑️</button>
      </div>
    </div>`).join('');
}

function toggleBold(idx) {
  STATE.questions[idx].bold = !STATE.questions[idx].bold;
  saveQuestions();
  renderBuilder();
  renderFormQuestions();
}

function deleteQuestion(idx) {
  if (!confirm('Delete this question?')) return;
  STATE.questions.splice(idx, 1);
  saveQuestions();
  renderBuilder();
  renderFormQuestions();
  showToast('Question deleted.', 'info');
}

function addQuestion() {
  const label = document.getElementById('new-q-label').value.trim();
  const type  = document.getElementById('new-q-type').value;
  const bold  = document.getElementById('new-q-bold').checked;
  if (!label) { showToast('Please enter a question.', 'error'); return; }

  const id = 'q_custom_' + Date.now();
  STATE.questions.push({ id, label, type, bold });
  saveQuestions();
  renderBuilder();
  renderFormQuestions();
  document.getElementById('new-q-label').value = '';
  showToast('✅ Question added!', 'success');
}

// ── Export JSON ────────────────────────────────────────────
function exportJSON() {
  const data = JSON.stringify({ submissions: STATE.submissions, questions: STATE.questions }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'fss-data-export.json';
  a.click(); URL.revokeObjectURL(url);
  showToast('📦 Data exported as JSON!', 'success');
}

// ── Utilities ──────────────────────────────────────────────
function updateBadge() {
  document.getElementById('badge-submissions').textContent = STATE.submissions.length;
}

function formatDate(isoStr) {
  if (!isoStr) return '—';
  return new Date(isoStr).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ── Keyboard shortcut: Enter on login ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
  init();
});
