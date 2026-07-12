const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const ICONS = {
  leaf: `<path ${S} d="M11 20A7 7 0 014 13c0-5 4-9 7-9 0 0 5 2 6 8a7 7 0 01-6 8z"/><path ${S} d="M11 20c0-5 2-9 6-11"/>`,
  users: `<path ${S} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle ${S} cx="9" cy="7" r="4"/><path ${S} d="M22 21v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0119 7"/>`,
  shield: `<path ${S} d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path ${S} d="M9 12l2 2 4-4"/>`,
  globe: `<circle ${S} cx="12" cy="12" r="9"/><path ${S} d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>`,
  bolt: `<path ${S} d="M13 2L4 14h7l-1 8 9-12h-7z"/>`,
  check: `<path ${S} d="M5 13l4 4L19 7"/>`,
  flag: `<path ${S} d="M5 21V4M5 4h11l-2 4 2 4H5"/>`,
  alert: `<path ${S} d="M12 9v4M12 17h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/>`,
  trophy: `<path ${S} d="M7 4h10v3a5 5 0 01-10 0V4z"/><path ${S} d="M9 14l-1 6 4-2 4 2-1-6"/>`,
  inbox: `<path ${S} d="M22 12h-6l-2 3h-4l-2-3H2"/><path ${S} d="M5 5h14l4 7v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6z"/>`
};

const titles = {
  dashboard: "Dashboard", environmental: "Environmental", social: "Social",
  governance: "Governance", gamification: "Gamification", reports: "Reports", settings: "Settings"
};

const scores = [
  { key: "env", label: "Environmental", score: 82, delta: "+3.2", dir: "up", ico: "leaf" },
  { key: "social", label: "Social", score: 76, delta: "+1.8", dir: "up", ico: "users" },
  { key: "gov", label: "Governance", score: 88, delta: "+0.6", dir: "up", ico: "shield" },
  { key: "overall", label: "Overall ESG", score: 82, delta: "40 / 30 / 30", dir: "up", ico: "globe", sub: "weighted" }
];

const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const emissions = [42, 39, 41, 35, 33, 36, 31, 30, 29, 28, 27, 26];

const departments = [
  { name: "Manufacturing", score: 84 },
  { name: "Supply Chain", score: 81 },
  { name: "People Ops", score: 79 },
  { name: "Fleet", score: 73 }
];

const activity = [
  { ico: "bolt", cls: "", title: "Carbon Transaction generated from PO00042", sub: "Supply Chain · 62.4 kg CO2e", time: "2m", pill: ["good", "Calculated"] },
  { ico: "trophy", cls: "violet", title: "Badge unlocked for Dev Nair", sub: "CSR Champion awarded", time: "11m", pill: ["info", "Gamified"] },
  { ico: "alert", cls: "amber", title: "Compliance Issue raised", sub: "Fleet Fuel Audit is overdue", time: "34m", pill: ["bad", "Open"] },
  { ico: "flag", cls: "blue", title: "Policy reminder sent", sub: "Carbon Accounting Controls pending", time: "1h", pill: ["warn", "Reminder"] }
];

const state = {
  departments: [
    { name: "Manufacturing", code: "MFG", head: "Asha Rao", parent: "-", employees: 142, score: 84, current: 72, target: 100, deadline: "2026-12-31", status: "On Track" },
    { name: "Supply Chain", code: "SCM", head: "Kabir Mehta", parent: "-", employees: 86, score: 81, current: 65, target: 90, deadline: "2026-12-31", status: "On Track" },
    { name: "People Ops", code: "POP", head: "Naina Sen", parent: "-", employees: 54, score: 79, current: 18, target: 40, deadline: "2026-12-31", status: "Active" },
    { name: "Fleet", code: "FLT", head: "Rohan Iyer", parent: "Supply Chain", employees: 34, score: 73, current: 53, target: 70, deadline: "2026-10-30", status: "At Risk" }
  ],
  factors: [
    ["Diesel Fleet Fuel", "Fleet", "liter", "2.68", "Active"],
    ["Recycled Aluminium", "Purchase", "kg", "0.52", "Active"],
    ["Grid Electricity", "Manufacturing", "kWh", "0.71", "Active"],
    ["Business Flight", "Expense", "km", "0.16", "Active"]
  ],
  profiles: [
    ["Recycled Aluminium Sheet", "82%", "Yes", "Recycled Aluminium"],
    ["Packaging Film", "46%", "No", "Grid Electricity"],
    ["Solar Controller", "68%", "Yes", "Grid Electricity"]
  ],
  transactions: [
    { date: "2026-07-12", department: "Supply Chain", source: "Purchase PO00042", quantity: 120, co2: 62.4, status: "Calculated" },
    { date: "2026-07-10", department: "Manufacturing", source: "MO00031", quantity: 340, co2: 241.4, status: "Calculated" },
    { date: "2026-07-09", department: "Fleet", source: "Fleet Log FL018", quantity: 55, co2: 147.4, status: "Needs Review" }
  ],
  activities: [
    { name: "Urban Tree Mapping", department: "People Ops", joined: 38, evidence: "Required", status: "Active" },
    { name: "Supplier Ethics Workshop", department: "Supply Chain", joined: 26, evidence: "Optional", status: "Active" },
    { name: "Waste Segregation Drive", department: "Manufacturing", joined: 64, evidence: "Required", status: "Completed" }
  ],
  participation: [
    { employee: "Ira Shah", activity: "Urban Tree Mapping", proof: "Attached", points: 120, status: "Pending" },
    { employee: "Dev Nair", activity: "Waste Segregation Drive", proof: "Attached", points: 90, status: "Approved" },
    { employee: "Mira Das", activity: "Supplier Ethics Workshop", proof: "Missing", points: 80, status: "Rejected" }
  ],
  policies: [
    ["Code of Sustainable Procurement", "2026-06-15", "Published", "91%"],
    ["Anti Bribery and Ethics", "2026-05-22", "Published", "96%"],
    ["Carbon Accounting Controls", "2026-07-01", "Published", "84%"]
  ],
  acknowledgements: [
    ["Ira Shah", "Carbon Accounting Controls", "Pending", "-"],
    ["Dev Nair", "Anti Bribery and Ethics", "Acknowledged", "2026-06-02"],
    ["Mira Das", "Code of Sustainable Procurement", "Acknowledged", "2026-06-18"]
  ],
  audits: [
    ["Manufacturing", "Ritika Bose", "2026-07-04", "Energy meters reconciled with two exceptions.", "In Progress"],
    ["Supply Chain", "Omar Khan", "2026-06-28", "Supplier evidence complete for tier one vendors.", "Closed"],
    ["Fleet", "Ritika Bose", "2026-07-08", "Fuel log missing receipts for three trips.", "Open"]
  ],
  issues: [
    ["Fleet Fuel Audit", "High", "Missing fuel receipts for July trip batch.", "Rohan Iyer", "2026-07-10", "Open"],
    ["Energy Meter Audit", "Medium", "Meter reading variance requires reconciliation.", "Asha Rao", "2026-07-19", "In Progress"],
    ["Supplier Evidence", "Low", "Archive older certificates.", "Kabir Mehta", "2026-08-01", "Resolved"]
  ],
  challenges: [
    { title: "Low Carbon Commute", state: "Active", xp: 250, difficulty: "Medium", deadline: "2026-08-15" },
    { title: "Zero Waste Sprint", state: "Under Review", xp: 180, difficulty: "Easy", deadline: "2026-07-20" },
    { title: "Supplier ESG Scout", state: "Draft", xp: 320, difficulty: "Hard", deadline: "2026-09-10" },
    { title: "Energy Saver Month", state: "Completed", xp: 200, difficulty: "Medium", deadline: "2026-06-30" }
  ],
  challengeParts: [
    ["Ira Shah", "Low Carbon Commute", "70%", "Attached", "Pending", "250"],
    ["Dev Nair", "Energy Saver Month", "100%", "Attached", "Approved", "200"],
    ["Mira Das", "Zero Waste Sprint", "100%", "Attached", "Under Review", "180"]
  ],
  badges: [
    ["Carbon Cutter", "XP Threshold: 500", "Unlocked"],
    ["CSR Champion", "Challenge Count: 3", "Unlocked"],
    ["Audit Ally", "Custom Rule", "Locked"],
    ["Fleet Saver", "XP Threshold: 1000", "Locked"]
  ],
  rewards: [
    ["Reusable Desk Kit", 350, 14, "Active"],
    ["Transit Voucher", 600, 3, "Active"],
    ["Donation Match", 800, 0, "Out of Stock"]
  ],
  leaderboard: [
    ["1", "Dev Nair", 1240],
    ["2", "Ira Shah", 1180],
    ["3", "Mira Das", 990],
    ["4", "Kabir Mehta", 850]
  ]
};

function pill(value) {
  const text = String(value);
  let cls = "pill";
  if (/active|approved|acknowledged|calculated|completed|published|on track|unlocked/i.test(text)) cls += " good";
  if (/pending|review|progress|draft|medium|at risk|needs review/i.test(text)) cls += " warn";
  if (/rejected|overdue|critical|high|open|out of stock|locked/i.test(text)) cls += " bad";
  if (/low|info/i.test(text)) cls += " info";
  return `<span class="${cls}">${text}</span>`;
}

function progress(value) {
  return `<div class="progress"><i style="width:${Math.max(0, Math.min(100, value))}%"></i></div>`;
}

function table(headers, rows, statusCols = []) {
  return `<div class="table-wrap"><table class="data"><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => `<td>${statusCols.includes(i) ? pill(cell) : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function injectDefs() {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.innerHTML = `
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#34d399" stop-opacity="0.42"/>
        <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0fae74"/>
        <stop offset="100%" stop-color="#5ee6b0"/>
      </linearGradient>
      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#34d399"/>
        <stop offset="100%" stop-color="#4cc2ff"/>
      </linearGradient>
    </defs>`;
  document.body.appendChild(svg);
}

function ring(score, useGrad) {
  const r = 27, c = 2 * Math.PI * r, off = c * (1 - score / 100);
  const fg = useGrad ? `stroke="url(#ringGrad)"` : `stroke="var(--accent)"`;
  return `
    <div class="ring">
      <svg viewBox="0 0 64 64">
        <circle class="ring-bg" cx="32" cy="32" r="${r}"></circle>
        <circle class="ring-fg" cx="32" cy="32" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" data-circ="${c.toFixed(1)}" data-off="${off.toFixed(1)}" ${fg}></circle>
      </svg>
      <span class="ring-val">${score}</span>
    </div>`;
}

/* ---------- Real computed engine (golden path) ---------- */
const E = {
  scores: { env: 82, social: 76, gov: 88 },
  weights: { env: 0.4, social: 0.3, gov: 0.3 },
  emissions: [42, 39, 41, 35, 33, 36, 31, 30, 29, 28, 27, 26],
  departments: [
    { name: "Manufacturing", score: 84, current: 72, target: 100 },
    { name: "Supply Chain", score: 81, current: 65, target: 90 },
    { name: "People Ops", score: 79, current: 18, target: 40 },
    { name: "Fleet", score: 73, current: 53, target: 70 }
  ],
  factors: [
    { name: "Recycled Aluminium", unit: "kg", co2e: 0.52 },
    { name: "Diesel Fleet Fuel", unit: "liter", co2e: 2.68 },
    { name: "Grid Electricity", unit: "kWh", co2e: 0.71 },
    { name: "Business Flight", unit: "km", co2e: 0.16 }
  ]
};

function overall() {
  return Math.round(E.scores.env * E.weights.env + E.scores.social * E.weights.social + E.scores.gov * E.weights.gov);
}

function confirmPurchase() {
  const f = E.factors[Math.floor(Math.random() * E.factors.length)];
  const qty = 60 + Math.floor(Math.random() * 120);
  const co2 = +(qty * f.co2e).toFixed(1);
  const dept = E.departments.find(d => d.name === "Supply Chain");
  dept.current = +(dept.current + co2 / 1000).toFixed(1);
  dept.score = Math.max(0, dept.score - 1);
  E.scores.env = Math.max(0, E.scores.env - 1);
  E.emissions[E.emissions.length - 1] += Math.round(co2 / 10);
  activity.unshift({
    ico: "bolt", cls: "", title: `Carbon Transaction from PO${Math.floor(10000 + Math.random() * 89999)}`,
    sub: `${dept.name} · ${co2} kg CO2e (${qty} ${f.unit} × ${f.co2e})`, time: "now", pill: ["good", "Calculated"]
  });
  renderScores(true); renderEmissions(true); renderRanking(); renderActivity();
  toast(`PO confirmed → ${co2} kg CO2e from ${f.name} → Environmental score → ${E.scores.env}, Overall → ${overall()}.`);
}

/* ---------- Animation helpers ---------- */
function countUp(el, to, dur) {
  const start = performance.now(), from = 0;
  (function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(tick);
  })(performance.now());
}

function drawChart() {
  const wrap = $("#emissionChart");
  const line = wrap.querySelector(".line-stroke");
  if (!line) return;
  try {
    const len = line.getTotalLength();
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    wrap.classList.add("drawing");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      line.style.strokeDashoffset = 0;
      wrap.classList.remove("drawing");
    }));
  } catch (e) {
    // getTotalLength can throw before layout in some browsers; show final state.
    line.style.strokeDashoffset = 0;
  }
}

function renderScores(animate) {
  const data = [
    { ...scores[0], value: E.scores.env },
    { ...scores[1], value: E.scores.social },
    { ...scores[2], value: E.scores.gov },
    { ...scores[3], value: overall(), sub: "weighted" }
  ];
  $("#scoreGrid").innerHTML = data.map(s => `
    <article class="score-card ${s.key}">
      <div class="sc-top">
        <span class="sc-ico"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[s.ico]}</svg></span>
        <span class="sc-label">${s.label}</span>
      </div>
      <div class="sc-body">
        <div class="sc-num"><strong>${s.value}</strong><small>${s.sub ? s.sub : "/ 100"}</small></div>
        ${ring(s.value, s.key === "overall")}
      </div>
      <span class="sc-delta ${s.dir}">${s.dir === "up" ? "▲" : "▼"} ${s.delta}</span>
    </article>`).join("");

  $$("#scoreGrid .score-card").forEach((card, i) => {
    const numEl = card.querySelector(".sc-num strong");
    const ringFg = card.querySelector(".ring-fg");
    const circ = +ringFg.dataset.circ, off = +ringFg.dataset.off;
    if (animate) {
      countUp(numEl, data[i].value, 1100);
      ringFg.style.strokeDashoffset = circ;
      requestAnimationFrame(() => requestAnimationFrame(() => { ringFg.style.strokeDashoffset = off; }));
    } else {
      numEl.textContent = data[i].value;
      ringFg.style.strokeDashoffset = off;
    }
  });
}

function smoothTop(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
  }
  return d;
}

function renderEmissions(animate) {
  const W = 760, H = 260, padL = 46, padR = 18, padT = 18, padB = 30;
  const plotW = W - padL - padR, plotH = H - padT - padB, baseY = padT + plotH;
  const maxV = 45;
  const x = i => padL + (i / (months.length - 1)) * plotW;
  const y = v => padT + (1 - v / maxV) * plotH;
  const pts = emissions.map((v, i) => ({ x: x(i), y: y(v), v, m: months[i] }));

  const grid = [0, 15, 30, 45].map(v => {
    const gy = y(v);
    return `<line class="grid-line" x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}"></line>
            <text class="axis-label" x="${padL - 10}" y="${gy + 4}" text-anchor="end">${v}</text>`;
  }).join("");

  const top = smoothTop(pts);
  const area = `${top} L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`;

  const xlabels = pts.map(p => `<text class="axis-label" x="${p.x}" y="${H - 8}" text-anchor="middle">${p.m}</text>`).join("");
  const hits = pts.map((p, i) => `<rect class="hit" data-i="${i}" x="${(p.x - plotW / months.length / 2).toFixed(1)}" y="${padT}" width="${(plotW / months.length).toFixed(1)}" height="${plotH}"></rect>`).join("");

  $("#emissionChart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="12 month emissions trend">
      ${grid}
      <path class="area-fill" d="${area}"></path>
      <path class="line-stroke" d="${top}"></path>
      <line class="guide" id="guide" x1="0" y1="${padT}" x2="0" y2="${baseY}"></line>
      <circle class="focus-dot" id="focus" r="5"></circle>
      ${hits}
      ${xlabels}
    </svg>
    <div class="chart-tip" id="chartTip"></div>`;

  const wrap = $("#emissionChart"), tip = $("#chartTip"), guide = $("#guide"), focus = $("#focus");
  $$(".hit", wrap).forEach(rect => {
    rect.addEventListener("mouseenter", () => {
      const i = +rect.dataset.i, p = pts[i];
      guide.setAttribute("x1", p.x); guide.setAttribute("x2", p.x); guide.style.opacity = 1;
      focus.setAttribute("cx", p.x); focus.setAttribute("cy", p.y); focus.style.opacity = 1;
      const wr = wrap.getBoundingClientRect(), rr = rect.getBoundingClientRect();
      tip.style.left = (rr.left + rr.width / 2 - wr.left) + "px";
      tip.style.top = (p.y / H * wr.height) + "px";
      tip.innerHTML = `<strong>${p.v}t</strong> <span>CO2e · ${p.m}</span>`;
      tip.style.opacity = 1;
    });
  });
  wrap.addEventListener("mouseleave", () => {
    guide.style.opacity = 0; focus.style.opacity = 0; tip.style.opacity = 0;
  });

  if (animate) drawChart();
}

function renderRanking() {
  const max = Math.max(...departments.map(d => d.score));
  $("#departmentRanking").innerHTML = [...departments].sort((a, b) => b.score - a.score).map((d, i) => `
    <div class="rank-row">
      <span class="rank-pos">${i + 1}</span>
      <div class="rank-main">
        <span class="rank-name">${d.name}</span>
        <div class="rank-bar"><i style="width:${(d.score / max * 100).toFixed(0)}%"></i></div>
      </div>
      <span class="rank-score">${d.score}</span>
    </div>`).join("");
}

function renderActivity() {
  $("#activityFeed").innerHTML = activity.map(a => `
    <li>
      <span class="act-ico ${a.cls}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[a.ico]}</svg></span>
      <div><div class="act-title">${a.title}</div><div class="act-sub">${a.sub}</div></div>
      <div style="display:grid;justify-items:end;gap:6px">
        <span class="act-time">${a.time}</span>
        <span class="pill ${a.pill[0]}">${a.pill[1]}</span>
      </div>
    </li>`).join("");
}

function renderSkeleton() {
  return `
    <div class="score-grid">
      ${[0,1,2,3].map(() => `<div class="skeleton sk-card"></div>`).join("")}
    </div>
    <div class="dashboard-grid">
      <section class="panel wide"><div class="skeleton sk-chart"></div></section>
      <section class="panel"><div class="skeleton sk-chart"></div></section>
      <section class="panel">
        ${[0,1,2,3].map(() => `<div class="skeleton sk-line" style="width:${70 + Math.random()*25}%"></div>`).join("")}
      </section>
      <section class="panel">
        ${[0,1,2,3].map(() => `<div class="skeleton sk-line" style="width:${60 + Math.random()*30}%"></div>`).join("")}
      </section>
    </div>`;
}

function renderEmpty(title) {
  return `
    <div class="empty-state">
      <span class="empty-illo"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.inbox}</svg></span>
      <h2>No ${title} data yet</h2>
      <p>This is a fresh install. Connect your ERP or log your first entry and your ${title.toLowerCase()} dashboard will come to life here.</p>
      <button type="button" class="primary">Connect a data source</button>
    </div>`;
}

const MODULES = {
  environmental: {
    info: "Carbon Transactions are auto-generated from Purchase, Manufacturing, Fleet, and Expense records when Auto Emission Calculation is on.",
    tabs: [["factors", "Emission Factors"], ["profiles", "Product ESG Profiles"], ["transactions", "Carbon Transactions"], ["goals", "Environmental Goals"]]
  },
  social: { tabs: [["activities", "CSR Activities"], ["participation", "Employee Participation"], ["diversity", "Diversity Dashboard"]] },
  governance: { tabs: [["policies", "Policies"], ["acknowledgements", "Policy Acknowledgements"], ["audits", "Audits"], ["issues", "Compliance Issues"]] },
  gamification: { tabs: [["challenges", "Challenges"], ["challengeParticipation", "Challenge Participation"], ["badges", "Badges"], ["rewards", "Rewards"], ["leaderboard", "Leaderboard"]] },
  reports: { tabs: [["summary", "Reports Overview"]] },
  settings: { tabs: [["departments", "Departments"], ["categories", "Categories"], ["configuration", "ESG Configuration"], ["notifications", "Notification Settings"]] }
};

function renderModule(section) {
  const m = MODULES[section];
  const tabs = m.tabs.map(([k, label], i) =>
    `<button type="button" class="module-tab ${i === 0 ? "active" : ""}" data-modtab="${k}">${label}</button>`).join("");
  return `
    <div class="module-head">
      <p class="eyebrow accent-env">${section}</p>
      <h1>${titles[section]}</h1>
    </div>
    ${m.info ? `<div class="info-strip">${m.info}</div>` : ""}
    <div class="module-tabs" data-mod="${section}">${tabs}</div>
    <div class="module-body cards-fade" id="moduleBody">${renderSubtab(section, m.tabs[0][0])}</div>`;
}

function renderSubtab(section, tab) {
  const st = state;
  switch (section + ":" + tab) {
    case "environmental:factors":
      return table(["Name", "Activity Type", "Unit", "CO2e per Unit", "Status"], st.factors, [4]);
    case "environmental:profiles":
      return table(["Product", "Recyclability", "Sustainable Source", "Emission Factor"], st.profiles);
    case "environmental:transactions":
      return `<div class="table-wrap"><table class="data"><thead><tr><th>Date</th><th>Department</th><th>Source</th><th>Quantity</th><th>Calculated CO2e</th><th>Status</th></tr></thead><tbody>${st.transactions.map(tx => `<tr><td>${tx.date}</td><td>${tx.department}</td><td>${tx.source}</td><td>${tx.quantity}</td><td>${tx.co2.toFixed(1)} kg</td><td>${pill(tx.status)}</td></tr>`).join("")}</tbody></table></div>`;
    case "environmental:goals":
      return `<div class="table-wrap"><table class="data"><thead><tr><th>Department</th><th>Target CO2</th><th>Current CO2</th><th>Progress</th><th>Deadline</th><th>Status</th></tr></thead><tbody>${st.departments.map(d => { const p = Math.round(d.current / d.target * 100); return `<tr><td>${d.name}</td><td>${d.target}t</td><td>${d.current}t</td><td>${progress(p)} ${p}%</td><td>${d.deadline}</td><td>${pill(d.status)}</td></tr>`; }).join("")}</tbody></table></div>`;
    case "social:activities":
      return `<div class="card-grid cards-fade">${st.activities.map(a => `<article class="csr-card"><h2>${a.name}</h2><p>${a.department}</p><div class="card-meta">${pill(a.joined + " joined")}${pill(a.evidence)}${pill(a.status)}</div></article>`).join("")}</div>`;
    case "social:participation":
      return table(["Employee", "Activity", "Proof", "Points", "Approval Status"], st.participation.map(p => [p.employee, p.activity, p.proof, p.points, p.status]), [4]);
    case "social:diversity":
      return `<div class="metric-grid cards-fade">${[["Gender Balance", "48% women across ESG departments"], ["Training Completion", "87% completed ESG fundamentals"], ["Participation Rate", "63% joined at least one CSR activity"]].map(c => `<article class="metric-card"><h2>${c[0]}</h2><p>${c[1]}</p></article>`).join("")}</div>`;
    case "governance:policies":
      return table(["Policy", "Published", "Status", "Acknowledgement Rate"], st.policies, [2]);
    case "governance:acknowledgements":
      return table(["Employee", "Policy", "Status", "Acknowledged Date"], st.acknowledgements, [2]);
    case "governance:audits":
      return table(["Department", "Auditor", "Date", "Findings", "Status"], st.audits, [4]);
    case "governance:issues":
      return table(["Audit", "Severity", "Description", "Owner", "Due Date", "Status"], st.issues, [1, 5]);
    case "gamification:challenges":
      return `<div class="card-grid cards-fade">${st.challenges.map(c => `<article class="challenge-card"><h2>${c.title}</h2><p>${c.difficulty} difficulty · deadline ${c.deadline}</p><div class="card-meta">${pill(c.state)}${pill(c.xp + " XP")}</div></article>`).join("")}</div>`;
    case "gamification:challengeParticipation":
      return table(["Employee", "Challenge", "Progress", "Proof", "Approval", "XP"], st.challengeParts, [4]);
    case "gamification:badges":
      return `<div class="badge-grid cards-fade">${st.badges.map((b, i) => `<article class="badge-card ${b[2] === "Locked" ? "locked" : ""}"><div class="badge-icon">${i + 1}</div><h2>${b[0]}</h2><p>${b[1]}</p>${pill(b[2])}</article>`).join("")}</div>`;
    case "gamification:rewards":
      return table(["Reward", "Points Required", "Stock", "Status", "Action"], st.rewards.map(r => [r[0], r[1], r[2], r[3], r[2] > 0 ? "Redeem" : "—"]), [3]);
    case "gamification:leaderboard":
      return `<div class="leaderboard cards-fade">${st.leaderboard.map(r => `<div class="leader-row"><strong>#${r[0]}</strong><span>${r[1]}</span><strong>${r[2]} XP</strong></div>`).join("")}</div>`;
    case "reports:summary":
      return `<div class="report-grid cards-fade">
        <article class="report-card"><h2>Environmental Report</h2><p>Carbon transactions, goal progress, department breakdown.</p><div class="builder-cta"><button class="primary" type="button">Generate</button></div></article>
        <article class="report-card"><h2>Social Report</h2><p>CSR participation, diversity, and training summaries.</p><div class="builder-cta"><button class="primary" type="button">Generate</button></div></article>
        <article class="report-card"><h2>Governance Report</h2><p>Policy acknowledgements, audit findings, issue aging.</p><div class="builder-cta"><button class="primary" type="button">Generate</button></div></article>
        <article class="report-card"><h2>ESG Summary Report</h2><p>Environmental, Social, Governance, and Overall scores.</p><div class="builder-cta"><button class="primary" type="button">Generate</button></div></article>
      </div>
      <div class="builder-panel">
        <p class="eyebrow accent-env">Custom Report Builder</p>
        <h2>Combine filters freely</h2>
        <div class="chip-row"><button type="button">Date Range</button><button type="button">Department</button><button type="button">Module</button><button type="button">Employee</button><button type="button">Challenge</button><button type="button">ESG Category</button></div>
        <div class="builder-cta"><button class="primary" type="button">Run</button><button type="button">Export PDF</button><button type="button">Export Excel</button><button type="button">Export CSV</button></div>
      </div>`;
    case "settings:departments":
      return table(["Name", "Code", "Head", "Parent Dept", "Employees", "Status"], st.departments.map(d => [d.name, d.code, d.head, d.parent, d.employees, pill("Active")]));
    case "settings:categories":
      return table(["Name", "Type", "Status"], [["Volunteering", "CSR Activity", "Active"], ["Waste Reduction", "Challenge", "Active"], ["Ethics", "CSR Activity", "Active"]], [2]);
    case "settings:configuration":
      return `<div class="settings-grid cards-fade">
        <label><input type="checkbox" checked> Auto Emission Calculation</label>
        <label><input type="checkbox" checked> Evidence Requirement</label>
        <label><input type="checkbox" checked> Badge Auto-Award</label>
        <label><input type="checkbox" checked> Compliance Email Alerts</label>
      </div><div class="weight-panel"><span>Environmental 40%</span><span>Social 30%</span><span>Governance 30%</span></div>`;
    case "settings:notifications":
      return `<div class="settings-grid cards-fade">
        <label><input type="checkbox" checked> New Compliance Issue raised</label>
        <label><input type="checkbox" checked> Participation approval decision</label>
        <label><input type="checkbox" checked> Policy acknowledgement reminder</label>
        <label><input type="checkbox" checked> Badge unlocked</label>
      </div>`;
    default:
      return `<div class="empty-state"><span class="empty-illo"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.inbox}</svg></span><h2>${titles[section]}</h2><p>This section is coming together.</p></div>`;
  }
}

function setDashboardState(state) {
  $$(".state-switch button").forEach(b => b.classList.toggle("active", b.dataset.state === state));
  const grid = $(".score-grid"), dash = $(".dashboard-grid");
  let layer = $("#stateLayer");
  if (state === "populated") {
    grid.classList.remove("hidden"); dash.classList.remove("hidden");
    if (layer) layer.classList.add("hidden");
    return;
  }
  grid.classList.add("hidden"); dash.classList.add("hidden");
  if (!layer) {
    layer = document.createElement("div"); layer.id = "stateLayer";
    $("#screen-dashboard").appendChild(layer);
  }
  layer.classList.remove("hidden");
  layer.innerHTML = state === "loading" ? renderSkeleton() : renderEmpty("ESG");
}

function setScreen(section) {
  const isDash = section === "dashboard";
  $("#screen-dashboard").classList.toggle("active", isDash);
  $("#screen-module").classList.toggle("active", !isDash);
  $$("#topTabs button").forEach(b => b.classList.toggle("active", b.dataset.section === section));
  $$(".side-nav a, .side-nav button").forEach(b => b.classList.toggle("active", b.dataset.section === section));
  $("#pageTitle").textContent = titles[section] || "EcoSphere";
  const container = $("#moduleContent") || $("#moduleEmpty");
  if (!isDash && container) container.innerHTML = renderModule(section);
}

function toast(msg) {
  const box = $("#toast"); box.textContent = msg; box.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => box.classList.remove("show"), 3400);
}

/* ---- events ---- */
/* ---- pointer-follow glow + card tilt ---- */
function setupMotion() {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  let tx = 0, ty = 0, cx = 0, cy = 0, raf;
  window.addEventListener("mousemove", e => {
    tx = e.clientX; ty = e.clientY;
    glow.style.opacity = 1;
    if (!raf) raf = requestAnimationFrame(loop);
  });
  function loop() {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    glow.style.left = cx + "px"; glow.style.top = cy + "px";
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(loop);
    else raf = null;
  }
  $$(".score-card, .panel").forEach(el => {
    el.classList.add("tilt");
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-4px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

// ---- navigation is wired first so it works even if a render step throws ----
document.addEventListener("click", e => {
  const sectionBtn = e.target.closest("[data-section]");
  if (sectionBtn) { setScreen(sectionBtn.dataset.section); return; }

  const modtab = e.target.closest(".module-tab");
  if (modtab) {
    const mod = modtab.closest(".module-tabs").dataset.mod;
    $$(".module-tab", modtab.closest(".module-tabs")).forEach(b => b.classList.toggle("active", b === modtab));
    const body = $("#moduleBody");
    body.innerHTML = renderSubtab(mod, modtab.dataset.modtab);
    body.classList.remove("cards-fade"); void body.offsetWidth; body.classList.add("cards-fade");
    return;
  }

  const subtab = e.target.closest("[data-subtab]");
  if (subtab) {
    const section = subtab.closest("section")?.previousElementSibling?.dataset.section
      || subtab.closest(".screen")?.id || "dashboard";
    setScreen(section); return;
  }

  const stateBtn = e.target.closest(".state-switch button");
  if (stateBtn) { setDashboardState(stateBtn.dataset.state); return; }

  const range = e.target.closest("#rangeSwitch button");
  if (range) { $$("#rangeSwitch button").forEach(b => b.classList.toggle("active", b === range)); return; }

  const confirm = e.target.closest("#simulatePurchase");
  if (confirm) { confirmPurchase(); }
});

try {
  injectDefs();
  renderScores(true);
  renderEmissions(true);
  renderRanking();
  renderActivity();
  setupMotion();
  setDashboardState("populated");
  setScreen("dashboard");
} catch (err) {
  console.error("EcoSphere init failed:", err);
}
