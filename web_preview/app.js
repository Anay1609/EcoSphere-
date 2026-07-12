const state = {
  scores: { environmental: 82, social: 76, governance: 88 },
  emissions: [42, 39, 41, 35, 33, 36, 31, 30, 29, 28, 27, 26],
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
  ],
  activityFeed: [
    ["Carbon Transaction generated from PO00042", "Supply Chain updated 62.4 kg CO2e"],
    ["Badge unlocked for Dev Nair", "CSR Champion awarded"],
    ["Compliance Issue raised", "Fleet Fuel Audit is overdue"],
    ["Policy reminder sent", "Carbon Accounting Controls pending"]
  ],
  selectedChallengeState: "All"
};

const titles = {
  dashboard: "Dashboard",
  environmental: "Environmental",
  social: "Social",
  governance: "Governance",
  gamification: "Gamification",
  reports: "Reports",
  settings: "Settings"
};

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

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

function renderRows(id, rows, statusColumns = []) {
  const el = qs(`#${id}`);
  if (!el) return;
  el.innerHTML = rows.map(row => {
    return `<tr>${row.map((cell, index) => `<td>${statusColumns.includes(index) ? pill(cell) : cell}</td>`).join("")}</tr>`;
  }).join("");
}

function renderDashboard() {
  const env = state.scores.environmental;
  const social = state.scores.social;
  const gov = state.scores.governance;
  animateCounter("envScore", env);
  animateCounter("socialScore", social);
  animateCounter("govScore", gov);
  const overall = Math.round(env * 0.4 + social * 0.3 + gov * 0.3);
  animateCounter("overallScore", overall);

  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const max = Math.max(...state.emissions);
  qs("#emissionChart").innerHTML = state.emissions.map((value, index) => {
    const height = Math.max(18, Math.round(value / max * 200));
    const delay = index * 0.05;
    return `<div class="bar" style="height:${height}px;animation-delay:${delay}s"><span>${months[index]}</span><span class="tip">${months[index]}: ${value}t CO2e</span></div>`;
  }).join("");

  qs("#departmentRanking").innerHTML = [...state.departments]
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .map(dept => `<div class="rank-row"><strong>${dept.name}</strong><div class="rank-meter"><i style="width:${dept.score}%"></i></div><span>${dept.score}</span></div>`)
    .join("");

  qs("#activityFeed").innerHTML = state.activityFeed
    .map(item => `<li><strong>${item[0]}</strong><small>${item[1]}</small></li>`)
    .join("");
}

function animateCounter(id, target) {
  const el = qs(`#${id}`);
  if (!el) return;
  const start = parseInt(el.textContent) || 0;
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function renderEnvironmental() {
  renderRows("factorRows", state.factors, [4]);
  renderRows("profileRows", state.profiles, []);
  qs("#transactionRows").innerHTML = state.transactions.map(tx => `
    <tr>
      <td>${tx.date}</td><td>${tx.department}</td><td>${tx.source}</td><td>${tx.quantity}</td>
      <td>${tx.co2.toFixed(1)} kg</td><td>${pill(tx.status)}</td>
    </tr>`).join("");
  qs("#goalRows").innerHTML = state.departments.map(dept => {
    const percent = Math.round((dept.current / dept.target) * 100);
    return `<tr><td>${dept.name}</td><td>${dept.target}t</td><td>${dept.current}t</td><td>${progress(percent)} ${percent}%</td><td>${dept.deadline}</td><td>${pill(dept.status)}</td></tr>`;
  }).join("");
}

function renderSocial() {
  qs("#csrCards").innerHTML = state.activities.map(activity => `
    <article class="csr-card">
      <h2>${activity.name}</h2>
      <p>${activity.department}</p>
      <div class="card-meta">${pill(`${activity.joined} joined`)}${pill(activity.evidence)}${pill(activity.status)}</div>
    </article>`).join("");
  qs("#participationRows").innerHTML = state.participation.map((item, index) => `
    <tr>
      <td>${item.employee}</td><td>${item.activity}</td><td>${item.proof}</td><td>${item.points}</td><td>${pill(item.status)}</td>
      <td><button type="button" data-approve="${index}">Approve</button> <button type="button" data-reject="${index}">Reject</button></td>
    </tr>`).join("");
  qs("#diversityCards").innerHTML = [
    ["Gender Balance", "48% women across ESG departments"],
    ["Training Completion", "87% completed ESG fundamentals"],
    ["Participation Rate", "63% joined at least one CSR activity"]
  ].map(card => `<article class="metric-card"><h2>${card[0]}</h2><p>${card[1]}</p></article>`).join("");
}

function renderGovernance() {
  renderRows("policyRows", state.policies, [2]);
  renderRows("ackRows", state.acknowledgements, [2]);
  renderRows("auditRows", state.audits, [4]);
  renderRows("issueRows", state.issues, [1, 5]);
  renderRows("issueRowsLinked", state.issues, [1, 5]);
}

function renderGamification() {
  const states = ["All", "Draft", "Active", "Under Review", "Completed", "Archived"];
  qs("#challengeFilters").innerHTML = states.map(value => `<button type="button" data-filter-state="${value}" class="${value === state.selectedChallengeState ? "active" : ""}">${value}</button>`).join("");
  const filtered = state.selectedChallengeState === "All" ? state.challenges : state.challenges.filter(challenge => challenge.state === state.selectedChallengeState);
  qs("#challengeCards").innerHTML = filtered.map(challenge => `
    <article class="challenge-card">
      <h2>${challenge.title}</h2>
      <p>${challenge.difficulty} difficulty, deadline ${challenge.deadline}</p>
      <div class="card-meta">${pill(challenge.state)}${pill(`${challenge.xp} XP`)}</div>
    </article>`).join("");
  renderRows("challengePartRows", state.challengeParts, [4]);
  qs("#badgeGallery").innerHTML = state.badges.map((badge, index) => `
    <article class="badge-card">
      <div class="badge-icon">B${index + 1}</div>
      <h2>${badge[0]}</h2>
      <p>${badge[1]}</p>
      ${pill(badge[2])}
    </article>`).join("");
  qs("#rewardRows").innerHTML = state.rewards.map((reward, index) => `
    <tr><td>${reward[0]}</td><td>${reward[1]}</td><td>${reward[2]}</td><td>${pill(reward[3])}</td><td><button type="button" data-redeem="${index}">Redeem</button></td></tr>`).join("");
  qs("#leaderboardRows").innerHTML = state.leaderboard.map(row => `<div class="leader-row"><strong>#${row[0]}</strong><span>${row[1]}</span><strong>${row[2]} XP</strong></div>`).join("");
}

function renderSettings() {
  qs("#departmentRows").innerHTML = state.departments.map(dept => `<tr><td>${dept.name}</td><td>${dept.code}</td><td>${dept.head}</td><td>${dept.parent}</td><td>${dept.employees}</td><td>${pill("Active")}</td></tr>`).join("");
  renderRows("categoryRows", [["Volunteering", "CSR Activity", "Active"], ["Waste Reduction", "Challenge", "Active"], ["Ethics", "CSR Activity", "Active"]], [2]);
}

function renderAll() {
  renderDashboard();
  renderEnvironmental();
  renderSocial();
  renderGovernance();
  renderGamification();
  renderSettings();
}

function setScreen(section) {
  qsa(".screen").forEach(screen => screen.classList.toggle("active", screen.id === section));
  qsa("[data-section]").forEach(button => button.classList.toggle("active", button.dataset.section === section));
  qs("#pageTitle").textContent = titles[section] || "EcoSphere";
}

function setSubtab(section, subtab) {
  const screen = qs(`#${section}`);
  if (!screen || !subtab) return;
  qsa(".module-tabs button", screen).forEach(button => button.classList.toggle("active", button.dataset.subtab === subtab));
  qsa(".subscreen", screen).forEach(panel => panel.classList.toggle("active", panel.dataset.subscreen === subtab));
}

function toast(message) {
  const box = qs("#toast");
  box.textContent = message;
  box.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => box.classList.remove("show"), 3200);
}

function simulatePurchase() {
  const co2 = 33.8;
  state.transactions.unshift({
    date: "2026-07-12",
    department: "Supply Chain",
    source: `Purchase PO${Math.floor(10000 + Math.random() * 89999)}`,
    quantity: 65,
    co2,
    status: "Calculated"
  });
  const supply = state.departments.find(dept => dept.name === "Supply Chain");
  supply.current = Math.round((supply.current + co2 / 1000) * 10) / 10;
  supply.score = Math.max(0, supply.score - 1);
  state.scores.environmental = Math.max(0, state.scores.environmental - 1);
  state.emissions[state.emissions.length - 1] += Math.round(co2 / 10);
  state.activityFeed.unshift(["Purchase Order confirmed", "Carbon Transaction generated and Environmental Score updated"]);
  state.activityFeed = state.activityFeed.slice(0, 5);
  renderAll();
  toast("Golden path complete: Purchase Order -> Carbon Transaction -> Department Score -> Overall ESG Score.");
}

document.addEventListener("click", event => {
  const sectionTarget = event.target.closest("[data-section]");
  if (sectionTarget) {
    const section = sectionTarget.dataset.section;
    setScreen(section);
    if (sectionTarget.dataset.subtab) setSubtab(section, sectionTarget.dataset.subtab);
  }

  const subtabTarget = event.target.closest("[data-subtab]");
  if (subtabTarget && !sectionTarget) {
    const section = subtabTarget.closest(".screen")?.id || location.hash.replace("#", "") || "dashboard";
    setScreen(section);
    setSubtab(section, subtabTarget.dataset.subtab);
  }

  const filter = event.target.closest("[data-filter-state]");
  if (filter) {
    state.selectedChallengeState = filter.dataset.filterState;
    renderGamification();
  }

  const approve = event.target.closest("[data-approve]");
  if (approve) {
    state.participation[Number(approve.dataset.approve)].status = "Approved";
    state.activityFeed.unshift(["CSR Participation approved", "Points credited to employee ledger"]);
    renderAll();
    toast("Participation approved and points ledger updated.");
  }

  const reject = event.target.closest("[data-reject]");
  if (reject) {
    state.participation[Number(reject.dataset.reject)].status = "Rejected";
    renderAll();
    toast("Participation rejected and employee notified.");
  }

  const redeem = event.target.closest("[data-redeem]");
  if (redeem) {
    const reward = state.rewards[Number(redeem.dataset.redeem)];
    if (reward[2] <= 0) {
      toast("Redemption blocked: reward is out of stock.");
      return;
    }
    reward[2] -= 1;
    toast("Reward redeemed with stock and point checks.");
    renderGamification();
  }
});

function injectNavIcons() {
  const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const sectionIcons = {
    dashboard: `<path ${S} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>`,
    environmental: `<path ${S} d="M11 20A7 7 0 014 13c0-5 4-9 7-9 0 0 5 2 6 8a7 7 0 01-6 8z"/><path ${S} d="M11 20c0-5 2-9 6-11"/>`,
    social: `<path ${S} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle ${S} cx="9" cy="7" r="4"/><path ${S} d="M22 21v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0119 7"/>`,
    governance: `<path ${S} d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path ${S} d="M9 12l2 2 4-4"/>`,
    gamification: `<path ${S} d="M7 4h10v3a5 5 0 01-10 0V4z"/><path ${S} d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14l-1 6 4-2 4 2-1-6"/>`,
    reports: `<path ${S} d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`,
    settings: `<path ${S} d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path ${S} d="M19 12a7 7 0 00-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 00-1.7-1L14.5 3h-5l-.3 2.5a7 7 0 00-1.7 1l-2.4-1-2 3.5L2 11a7 7 0 000 2l-2 1.5 2 3.5 2.4-1a7 7 0 001.7 1l.3 2.5h5l.3-2.5a7 7 0 001.7-1l2.4 1 2-3.5L22 13a7 7 0 00-3-1z"/>`
  };
  const subIcons = {
    "Emission Factors": `<path ${S} d="M3 17l5-5 4 4 8-8"/><path ${S} d="M16 8h5v5"/>`,
    "Product ESG Profiles": `<path ${S} d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>`,
    "Carbon Transactions": `<path ${S} d="M7 7h.01M3 11l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>`,
    "Environmental Goals": `<path ${S} d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path ${S} d="M12 7v5l3 2"/>`,
    "CSR Activities": `<path ${S} d="M20 7L9 18l-5-5"/>`,
    "Employee Participation": `<path ${S} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle ${S} cx="9" cy="7" r="4"/>`,
    "Diversity Dashboard": `<path ${S} d="M4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"/><circle ${S} cx="12" cy="7" r="4"/>`,
    "Policies": `<path ${S} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path ${S} d="M14 2v6h6M8 13h8M8 17h6"/>`,
    "Policy Acknowledgements": `<path ${S} d="M9 11l3 3 8-8"/><path ${S} d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`,
    "Audits": `<path ${S} d="M11 3a8 8 0 106 13l4 4-2 2-4-4A8 8 0 0011 3z"/>`,
    "Compliance Issues": `<path ${S} d="M12 9v4M12 17h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/>`,
    "Challenges": `<path ${S} d="M7 4h10v3a5 5 0 01-10 0V4z"/><path ${S} d="M9 14l-1 6 4-2 4 2-1-6"/>`,
    "Challenge Participation": `<path ${S} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle ${S} cx="9" cy="7" r="4"/>`,
    "Badges": `<path ${S} d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 17l.9-5.4L4.2 8.5l5.4-.8z"/>`,
    "Rewards": `<path ${S} d="M20 12V8H4v4a4 4 0 008 0 4 4 0 008 0z"/><path ${S} d="M4 8H2v4a2 2 0 002 2M20 8h2v4a2 2 0 01-2 2"/>`,
    "Leaderboard": `<path ${S} d="M6 9H4v11h16V9h-2M9 9V5h6v4M8 13h8"/>`,
    "Environmental Report": `<path ${S} d="M4 20V10M10 20V4M16 20v-7"/>`,
    "Social Report": `<path ${S} d="M4 20V10M10 20V4M16 20v-7"/>`,
    "Governance Report": `<path ${S} d="M4 20V10M10 20V4M16 20v-7"/>`,
    "ESG Summary Report": `<path ${S} d="M4 20V10M10 20V4M16 20v-7"/>`,
    "Custom Report Builder": `<path ${S} d="M6 3v18M3 6h18M3 18h18M18 3v18"/>`,
    "Departments": `<path ${S} d="M3 21V8l9-5 9 5v13M9 21v-6h6v6"/>`,
    "Categories": `<path ${S} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>`,
    "ESG Configuration": `<path ${S} d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path ${S} d="M19 12a7 7 0 00-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 00-1.7-1L14.5 3h-5l-.3 2.5a7 7 0 00-1.7 1l-2.4-1-2 3.5L2 11a7 7 0 000 2l-2 1.5 2 3.5 2.4-1a7 7 0 001.7 1l.3 2.5h5l.3-2.5a7 7 0 001.7-1l2.4 1 2-3.5L22 13a7 7 0 00-3-1z"/>`,
    "Notification Settings": `<path ${S} d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>`
  };
  const svg = (inner) => `<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
  qsa(".side-nav > a, .side-nav > button").forEach(el => {
    const key = el.dataset.section;
    if (sectionIcons[key]) el.insertAdjacentHTML("afterbegin", svg(sectionIcons[key]));
  });
  qsa(".side-nav section a").forEach(el => {
    const label = el.textContent.trim();
    el.insertAdjacentHTML("afterbegin", svg(subIcons[label] || `<circle ${S} cx="12" cy="12" r="3"/>`));
  });
}

function init3DCards() {
  qsa(".score-card, .panel, .report-card, .csr-card, .challenge-card, .metric-card, .badge-card, .leader-row").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initParallax() {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    qs(".orb-1").style.transform = `translate(${x}px, ${y}px)`;
    qs(".orb-2").style.transform = `translate(${-x}px, ${-y}px)`;
    qs(".orb-3").style.transform = `translate(${y}px, ${-x}px)`;
  });
}

qs("#simulatePurchase")?.addEventListener("click", simulatePurchase);

injectNavIcons();
renderAll();
init3DCards();
initParallax();
