// ══════════════════════════════════════════
//  ReliefConnect — Upgraded script.js
// ══════════════════════════════════════════

// ── UPGRADE HTML ON LOAD ──
document.addEventListener('DOMContentLoaded', () => {
    upgradeNav();
    upgradeHome();
    upgradeChecklist();
    upgradeContacts();
    displayShelters();
    upgradeScore();
    upgradeFooter();
    updateProgress();
    calculateScore();
});

// ── NAV: style the logo ──
function upgradeNav() {
    const h1 = document.querySelector('nav h1');
    if (h1) h1.innerHTML = '🛡 Relief<span>Connect</span>';
}

// ── HOME: add alert banner + quick cards ──
function upgradeHome() {
    const home = document.getElementById('home');
    if (!home) return;

    home.innerHTML = `
        <div class="alert-banner">
            <div class="alert-icon">⚠️</div>
            <div class="alert-text">
                <h3>Cyclone Alert — Odisha Coast</h3>
                <p>Bay of Bengal depression intensifying. Expected landfall near Puri in 48 hrs.</p>
            </div>
            <div class="alert-badge">🔴 LIVE</div>
        </div>

        <h2>Your Disaster<br>Preparedness Companion</h2>
        <div class="location-line">
            <div class="live-dot"></div>
            📍 Bhubaneswar, Odisha &nbsp;|&nbsp; ⛈ Cyclone Watch Active
        </div>

        <div class="quick-grid">
            <a class="quick-card" href="#sos">
                <div class="qicon">🚨</div>
                <div class="qlabel">SOS Generator</div>
            </a>
            <a class="quick-card" href="#checklist">
                <div class="qicon">🎒</div>
                <div class="qlabel">Emergency Kit</div>
            </a>
            <a class="quick-card" href="#contacts">
                <div class="qicon">📞</div>
                <div class="qlabel">Helplines</div>
            </a>
            <a class="quick-card" href="#shelters">
                <div class="qicon">🏫</div>
                <div class="qlabel">Shelters</div>
            </a>
            <a class="quick-card" href="#guide">
                <div class="qicon">📖</div>
                <div class="qlabel">Safety Guide</div>
            </a>
        </div>

        <button class="sos-main-btn" onclick="window.location='#sos'">
            🚨 Generate SOS Alert Now
        </button>
    `;
}

// ── CHECKLIST: upgrade items with icons + done state ──
function upgradeChecklist() {
    const section = document.getElementById('checklist');
    if (!section) return;

    const items = [
        { icon: '💧', label: 'Water (3L per person)' },
        { icon: '💊', label: 'Medicines & Prescriptions' },
        { icon: '🔦', label: 'Torch / Flashlight' },
        { icon: '🔋', label: 'Power Bank (fully charged)' },
        { icon: '📄', label: 'Important Documents (Aadhaar)' },
        { icon: '🩺', label: 'First Aid Kit' },
        { icon: '🍱', label: 'Non-perishable Food' },
        { icon: '📻', label: 'Battery-powered Radio' },
        { icon: '🪫', label: 'Spare Batteries' },
        { icon: '💰', label: 'Emergency Cash' },
        { icon: '🧥', label: 'Extra Clothes & Rain Gear' },
        { icon: '🧴', label: 'Water Purification Tablets' },
    ];

    // Replace existing checklist labels with upgraded list
    const oldLabels = section.querySelectorAll('label');
    oldLabels.forEach(l => l.remove());
    const oldBrs = section.querySelectorAll('br');
    oldBrs.forEach(b => b.remove());

    const h2 = section.querySelector('h2');
    const sub = document.createElement('p');
    sub.className = 'section-sub';
    sub.textContent = 'Check off what you have packed. Aim for 100% preparedness!';
    h2.after(sub);

    const ul = document.createElement('ul');
    ul.className = 'checklist-items';
    ul.id = 'checklist-ul';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="item">
            <span class="item-emoji">${item.icon}</span>
            ${item.label}
        `;
        li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                const cb = li.querySelector('input');
                cb.checked = !cb.checked;
            }
            li.classList.toggle('done', li.querySelector('input').checked);
            updateProgress();
            calculateScore();
        });
        ul.appendChild(li);
    });

    // Insert before progress bar
    const progressContainer = section.querySelector('.progress-container');
    section.insertBefore(ul, progressContainer);
}

// ── CONTACTS: upgrade to grid cards ──
function upgradeContacts() {
    const section = document.getElementById('contacts');
    if (!section) return;

    const contacts = [
        { icon: '🚑', name: 'Ambulance',          num: '108',          tel: '108' },
        { icon: '👮', name: 'Police',              num: '100',          tel: '100' },
        { icon: '🔥', name: 'Fire Brigade',        num: '101',          tel: '101' },
        { icon: '🆘', name: 'OSDMA Helpline',      num: '1070',         tel: '1070' },
        { icon: '🌊', name: 'Flood Control',       num: '1800-345-6789',tel: '18003456789' },
        { icon: '🏥', name: 'AIIMS Bhubaneswar',   num: '0674-2476789', tel: '06742476789' },
        { icon: '🚢', name: 'Coast Guard',         num: '1554',         tel: '1554' },
        { icon: '⚡', name: 'Power Emergency',     num: '1912',         tel: '1912' },
    ];

    // Remove old cards
    section.querySelectorAll('.card').forEach(c => c.remove());

    const h2 = section.querySelector('h2');
    const sub = document.createElement('p');
    sub.className = 'section-sub';
    sub.textContent = 'One-tap calling for all critical Odisha emergency numbers.';
    h2.after(sub);

    const grid = document.createElement('div');
    grid.className = 'contacts-grid';

    contacts.forEach(c => {
        grid.innerHTML += `
            <div class="contact-card">
                <div class="c-icon">${c.icon}</div>
                <div class="c-name">${c.name}</div>
                <div class="c-num">${c.num}</div>
                <a href="tel:${c.tel}">📞 Call Now</a>
            </div>
        `;
    });

    section.appendChild(grid);
}

// ── SOS GENERATOR ──
function generateSOS() {
    const name     = document.getElementById('name').value.trim();
    const location = document.getElementById('location').value.trim();
    const type     = document.getElementById('type').value.trim() || 'emergency';

    if (!name || !location) {
        alert('Please enter your name and location!');
        return;
    }

    const msg =
`🚨 SOS ALERT 🚨

My name is ${name}.
I am stuck near ${location}.
Need immediate assistance due to ${type}.
Please help. Please share this message.

📍 Location: ${location}
⏰ Time: ${new Date().toLocaleTimeString('en-IN')}`;

    const output = document.getElementById('output');
    output.value = msg;

    // Show styled box
    let box = document.querySelector('.sos-output-box');
    if (!box) {
        box = document.createElement('div');
        box.className = 'sos-output-box';
        box.innerHTML = `<div class="sos-output-label">🚨 SOS Alert Generated</div>`;
        output.parentNode.insertBefore(box, output);
        box.appendChild(output);
    }
    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copySOS() {
    const text = document.getElementById('output').value;
    if (!text) { alert('Generate an SOS message first!'); return; }
    navigator.clipboard.writeText(text).then(() => {
        const btn = [...document.querySelectorAll('button')]
            .find(b => b.textContent.includes('Copy'));
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = '✅ Copied!';
            btn.style.background = '#16A34A';
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
            }, 2000);
        }
    });
}

// ── CHECKLIST PROGRESS ──
function updateProgress() {
    const all     = document.querySelectorAll('.item');
    const checked = document.querySelectorAll('.item:checked');
    if (all.length === 0) return;

    const pct = Math.round((checked.length / all.length) * 100);
    const bar  = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if (bar)  bar.style.width = pct + '%';

    if (text) {
        if (pct === 0)       text.textContent = '0% Prepared — Start packing!';
        else if (pct < 40)   text.textContent = `${pct}% Prepared — Keep going!`;
        else if (pct < 70)   text.textContent = `${pct}% Prepared — Good progress!`;
        else if (pct < 100)  text.textContent = `${pct}% Prepared — Almost there!`;
        else                 text.textContent  = `100% Prepared — You're ready! 🎉`;
    }
}

// ── SHELTER DATA ──
const shelters = [
    { name: 'KIIT Convention Hall',          district: 'Bhubaneswar', capacity: 500, status: 'Open' },
    { name: 'SAI International School',      district: 'Bhubaneswar', capacity: 350, status: 'Open' },
    { name: 'Puri Community Center',         district: 'Puri',        capacity: 400, status: 'Open' },
    { name: 'Puri Government High School',   district: 'Puri',        capacity: 200, status: 'Open' },
    { name: 'Cuttack Town Hall',             district: 'Cuttack',     capacity: 600, status: 'Open' },
    { name: 'Cuttack Medical College Hall',  district: 'Cuttack',     capacity: 300, status: 'Full' },
    { name: 'Kendrapara High School',        district: 'Kendrapara',  capacity: 250, status: 'Open' },
    { name: 'Balasore Community Building',   district: 'Balasore',    capacity: 450, status: 'Open' },
    { name: 'Jagatsinghpur Cyclone Shelter', district: 'Jagatsinghpur', capacity: 800, status: 'Open' },
    { name: 'Ganjam Relief Center',          district: 'Ganjam',      capacity: 550, status: 'Open' },
    { name: 'Paradip Shelter Block A',       district: 'Jagatsinghpur', capacity: 320, status: 'Full' },
];

function displayShelters(list = shelters) {
    const container = document.getElementById('shelter-list');
    if (!container) return;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#64748B;padding:24px;">No shelters found.</p>';
        return;
    }

    list.forEach(s => {
        const badgeClass = s.status === 'Open' ? 'badge-open' : 'badge-full';
        const badgeIcon  = s.status === 'Open' ? '✅' : '🔴';
        container.innerHTML += `
            <div class="shelter-card">
                <div>
                    <h3>🏫 ${s.name}</h3>
                    <p>📍 ${s.district} &nbsp;|&nbsp; 👥 Capacity: ${s.capacity}</p>
                </div>
                <span class="shelter-badge ${badgeClass}">${badgeIcon} ${s.status}</span>
            </div>
        `;
    });
}

function searchShelters() {
    const q = document.getElementById('search').value.toLowerCase();
    displayShelters(shelters.filter(s =>
        s.name.toLowerCase().includes(q) || s.district.toLowerCase().includes(q)
    ));
}

document.addEventListener('DOMContentLoaded', () => {
    const searchEl = document.getElementById('search');
    if (searchEl) searchEl.addEventListener('keyup', searchShelters);
});

// ── SAFETY GUIDE ──
const guideData = {
    cyclone: {
        before: [
            'Listen to IMD weather updates and government advisories regularly.',
            'Stock up on water, food, and medicines for at least 3 days.',
            'Charge all phones, power banks, and electronic devices fully.',
            'Identify the nearest cyclone shelter and evacuation route.',
            'Secure doors, windows, and loose objects outside your home.',
        ],
        during: [
            'Stay indoors and move to the strongest part of the building.',
            'Stay away from windows, doors, and exterior walls.',
            'Do not go outside during the eye of the storm — danger continues.',
            'Switch off all electrical appliances and the main switch.',
            'Listen to a battery-powered radio for official updates.',
        ],
        after: [
            'Do not venture out until authorities declare it safe.',
            'Avoid downed power lines and flooded roads.',
            'Use only boiled or purified water for drinking.',
            'Report injuries or trapped persons to authorities immediately.',
        ]
    },
    flood: {
        before: [
            'Know your area\'s flood risk and nearest high-ground locations.',
            'Move valuables and important documents to higher floors.',
            'Prepare an emergency kit with water, food, and medicine.',
            'Disconnect electrical appliances if flooding seems likely.',
        ],
        during: [
            'Move immediately to higher ground — do not wait.',
            'Never walk, swim, or drive through flood water.',
            'If trapped, go to the highest point and signal for help.',
            'Avoid manholes, open drains, and electric poles.',
        ],
        after: [
            'Return home only after authorities confirm it is safe.',
            'Clean and disinfect everything that got wet to prevent disease.',
            'Boil water before drinking — flood water contaminates supplies.',
            'Watch out for snakes and insects in flooded areas.',
        ]
    },
    earthquake: {
        before: [
            'Secure heavy furniture and appliances to walls.',
            'Know where to find your gas, water, and electricity shut-offs.',
            'Identify safe spots in each room: under sturdy tables.',
            'Practice Drop, Cover, and Hold On with family members.',
        ],
        during: [
            'DROP to hands and knees immediately.',
            'Take COVER under a sturdy table or against an interior wall.',
            'HOLD ON until shaking stops — do not let go.',
            'Stay away from windows, exterior walls, and heavy objects.',
            'Never use elevators during or after shaking.',
        ],
        after: [
            'Expect aftershocks — take cover each time shaking starts.',
            'Check for gas leaks — if you smell gas, leave immediately.',
            'Do not use open flames until gas leaks are ruled out.',
            'Use text messages — phone lines are often overloaded.',
        ]
    }
};

let activeGuideTab = null;

function showGuide(type) {
    const content = document.getElementById('guide-content');
    const data    = guideData[type];
    if (!content || !data) return;

    // Update tab styles
    document.querySelectorAll('.guide-tabs button').forEach(b => b.classList.remove('active'));
    if (activeGuideTab !== type) {
        const activeBtn = [...document.querySelectorAll('.guide-tabs button')]
            .find(b => b.getAttribute('onclick').includes(type));
        if (activeBtn) activeBtn.classList.add('active');
        activeGuideTab = type;
    }

    const phases = [
        { label: 'Before', key: 'before' },
        { label: 'During', key: 'during' },
        { label: 'After',  key: 'after'  },
    ];

    content.innerHTML = phases.map(phase => `
        <div class="guide-phase">
            <div class="phase-title">${phase.label}</div>
            <ul class="guide-tips">
                ${data[phase.key].map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Upgrade guide buttons with class
document.addEventListener('DOMContentLoaded', () => {
    const guideSection = document.getElementById('guide');
    if (!guideSection) return;

    const btns = guideSection.querySelectorAll('button');
    const wrap = document.createElement('div');
    wrap.className = 'guide-tabs';
    btns.forEach(b => {
        b.className = '';
        wrap.appendChild(b);
    });
    const guideContent = document.getElementById('guide-content');
    guideSection.insertBefore(wrap, guideContent);

    const sub = document.createElement('p');
    sub.className = 'section-sub';
    sub.textContent = 'Before, During, and After guidance for each disaster type.';
    guideSection.querySelector('h2').after(sub);

    // Show cyclone by default
    showGuide('cyclone');
    btns[0].classList.add('active');
});

// ── SCORE SECTION ──
function upgradeScore() {
    const section = document.getElementById('score');
    if (!section) return;

    const h2 = section.querySelector('h2');
    const sub = document.createElement('p');
    sub.className = 'section-sub';
    sub.textContent = 'Based on your emergency kit checklist.';
    h2.after(sub);

    const display = document.createElement('div');
    display.className = 'score-display';
    display.innerHTML = `
        <div class="score-ring low" id="score-ring">0</div>
        <div class="score-label">Preparedness Score out of 100</div>
    `;
    h2.parentNode.insertBefore(display, section.querySelector('#score-text'));
}

function calculateScore() {
    const all     = document.querySelectorAll('.item');
    const checked = document.querySelectorAll('.item:checked');
    if (all.length === 0) return;

    const score = Math.round((checked.length / all.length) * 100);

    const ring = document.getElementById('score-ring');
    if (ring) {
        ring.textContent = score;
        ring.className = 'score-ring';
        if (score < 40)      ring.classList.add('low');
        else if (score < 75) ring.classList.add('mid');
    }

    const unchecked = [...all]
        .filter(cb => !cb.checked)
        .map(cb => {
            const li = cb.closest('li');
            return li ? li.textContent.trim() : '';
        })
        .filter(Boolean);

    const suggestions = document.getElementById('suggestions');
    if (!suggestions) return;

    if (score === 100) {
        suggestions.innerHTML = '✅ <strong>Excellent!</strong> You are fully prepared for an emergency.';
    } else if (unchecked.length > 0) {
        suggestions.innerHTML = `
            ⚠️ <strong>Still missing ${unchecked.length} item(s):</strong>
            <ul>${unchecked.slice(0, 5).map(i => `<li>${i}</li>`).join('')}</ul>
            ${unchecked.length > 5 ? `<p>...and ${unchecked.length - 5} more.</p>` : ''}
        `;
    } else {
        suggestions.innerHTML = 'Complete your checklist above to see suggestions.';
    }
}

// ── FOOTER ──
function upgradeFooter() {
    const footer = document.querySelector('footer p');
    if (footer) footer.innerHTML = '🛡 <strong>ReliefConnect</strong> — Built for Odisha, Built for Life &nbsp;|&nbsp; Hackathon 2025';
}
// ══════════════════════════════════════════
//  SIREN SOUND — Add this at the bottom of script.js
// ══════════════════════════════════════════

function playSiren() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    function beep(startTime, freq1, freq2, duration) {
        const oscillator = ctx.createOscillator();
        const gainNode   = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(freq1, startTime);
        oscillator.frequency.linearRampToValueAtTime(freq2, startTime + duration / 2);
        oscillator.frequency.linearRampToValueAtTime(freq1, startTime + duration);

        gainNode.gain.setValueAtTime(0.4, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    // Play 3 siren wails
    beep(ctx.currentTime + 0.0, 600, 900, 0.5);
    beep(ctx.currentTime + 0.5, 600, 900, 0.5);
    beep(ctx.currentTime + 1.0, 600, 900, 0.5);
}
