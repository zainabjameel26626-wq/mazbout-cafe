/* ---------- 1. MENU DATA ----------
   Edit this object to change the menu. Each item: [name, description, price in EGP] */
const menu = {
  'Hot drinks': [
    ['Mazbout Turkish', 'Cardamom, medium sugar, served in a copper pot', 55],
    ['Espresso', 'Double shot of our house blend', 60],
    ['Flat white', 'Double ristretto, silky milk', 85],
    ['Cappuccino', 'Equal parts espresso, milk and foam', 80],
    ['V60 pour-over', 'Single origin, changes weekly', 110],
    ['Spiced hot chocolate', 'Dark chocolate, cinnamon, a pinch of salt', 90]
  ],
  'Cold drinks': [
    ['Cold brew', 'Steeped for 18 hours', 95],
    ['Iced Spanish latte', 'Condensed milk, espresso, ice', 100],
    ['Hibiscus tonic', 'Karkadeh, tonic water, lime', 80],
    ['Affogato', 'Vanilla ice cream drowned in espresso', 105],
    ['Mint lemonade', 'Fresh mint, lemon, a little sugar', 65],
    ['Mango iced tea', 'Black tea, mango purée, ice', 75]
  ],
  'Bakery': [
    ['Date and tahini roll', 'Baked every morning', 60],
    ['Butter croissant', 'Laminated in-house', 70],
    ['Pain au chocolat', 'Two bars of dark chocolate inside', 80],
    ['Basbousa cheesecake', 'Our twist on two classics', 90],
    ['Banana walnut loaf', 'Moist, with a crisp sugar top', 65],
    ['Zaatar cheese croissant', 'Savoury, warm from the oven', 85]
  ],
  'Light bites': [
    ['Halloumi sandwich', 'Grilled halloumi, tomato, basil, sourdough', 130],
    ['Smoked turkey toastie', 'Cheddar, pickles, mustard mayo', 140],
    ['Shakshuka', 'Baked eggs in spicy tomato sauce, with bread', 120],
    ['Avocado toast', 'Lime, chili flakes, soft egg', 125],
    ['Feta and olive salad', 'Greens, cucumber, lemon dressing', 110],
    ['Granola bowl', 'Yogurt, honey, seasonal fruit', 95]
  ]
};

const tabs = document.getElementById('menuTabs');
const content = document.getElementById('menuContent');
Object.keys(menu).forEach((cat, i) => {
  const id = 'cat' + i;
  tabs.insertAdjacentHTML('beforeend',
    `<li class="nav-item" role="presentation"><button class="nav-link ${i === 0 ? 'active' : ''}" data-bs-toggle="pill" data-bs-target="#${id}" type="button" role="tab">${cat}</button></li>`);
  const rows = menu[cat].map(([n, d, p]) =>
    `<div class="menu-row"><div><h3>${n}</h3><p>${d}</p></div><span class="price">EGP ${p}</span></div>`).join('');
  content.insertAdjacentHTML('beforeend',
    `<div class="tab-pane fade ${i === 0 ? 'show active' : ''}" id="${id}" role="tabpanel">${rows}</div>`);
});

/* ---------- 2. ROAST SLIDER ----------
   Moves between three colour stops and updates CSS variables on the page. */
const stops = [
  { bg: [242, 193, 78], fg: [23, 38, 31],    cf: [217, 152, 58] },  // light
  { bg: [184, 112, 60], fg: [23, 38, 31],    cf: [120, 70, 38] },   // medium
  { bg: [43, 27, 20],   fg: [247, 250, 244], cf: [24, 12, 8] }      // dark
];
const roasts = [
  { max: 33,  name: 'Light roast',  notes: 'Bright and fruity, with jasmine and citrus. Best as a pour-over.' },
  { max: 66,  name: 'Medium roast', notes: 'Balanced and sweet, with caramel and toasted nuts. Our house espresso.' },
  { max: 100, name: 'Dark roast',   notes: 'Bold and smoky, with dark chocolate and cardamom. Perfect for Turkish coffee.' }
];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = c => `rgb(${c.join(',')})`;
function colour(key, v) {
  const seg = v < 50 ? 0 : 1;
  return mix(stops[seg][key], stops[seg + 1][key], (v - seg * 50) / 50);
}
const slider = document.getElementById('roast');
const rootStyle = document.documentElement.style;
function updateRoast() {
  const v = +slider.value;
  rootStyle.setProperty('--roast-bg', rgb(colour('bg', v)));
  rootStyle.setProperty('--roast-fg', rgb(colour('fg', v)));
  rootStyle.setProperty('--roast-coffee', rgb(colour('cf', v)));
  const r = roasts.find(x => v <= x.max);
  document.getElementById('roastName').textContent = r.name;
  document.getElementById('roastNotes').textContent = r.notes;
}
slider.addEventListener('input', updateRoast);
updateRoast();

/* ---------- 3. BOOKING + TICKET IMAGE ---------- */
const form = document.getElementById('bookForm');
const $ = id => document.getElementById(id);
document.getElementById('date').min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

  const booking = {
    name: $('name').value.trim(),
    phone: $('phone').value.trim(),
    date: new Date($('date').value + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: $('time').value,
    guests: $('guests').value,
    ref: 'MZ-' + Math.random().toString(36).slice(2, 7).toUpperCase()
  };

  const url = await drawTicket(booking);
  document.getElementById('ticketImg').src = url;
  const dl = document.getElementById('ticketDownload');
  dl.href = url;
  dl.download = `mazbout-booking-${booking.ref}.png`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById('ticketModal')).show();

  form.reset();
  form.classList.remove('was-validated');
});

// Draws the ticket on a <canvas> and returns it as a PNG data URL.
async function drawTicket(b) {
  await Promise.all([
    document.fonts.load('800 60px "Bricolage Grotesque"'),
    document.fonts.load('400 30px "Figtree"')
  ]);
  const c = document.createElement('canvas');
  c.width = 800; c.height = 1100;
  const g = c.getContext('2d');

  g.fillStyle = '#17261f'; g.fillRect(0, 0, 800, 1100);
  g.fillStyle = '#f2c14e'; g.fillRect(0, 0, 800, 220);

  g.fillStyle = '#17261f'; g.textBaseline = 'alphabetic';
  g.font = '800 72px "Bricolage Grotesque", sans-serif';
  g.fillText('Mazbout', 60, 110);
  g.font = '500 30px "Figtree", sans-serif';
  g.fillText('Table booking confirmed', 60, 165);

  const rows = [
    ['Name', b.name], ['Date', b.date], ['Time', b.time],
    ['Guests', b.guests], ['Phone', b.phone]
  ];
  let y = 330;
  rows.forEach(([label, value]) => {
    g.fillStyle = '#9fb3a6'; g.font = '400 26px "Figtree", sans-serif';
    g.fillText(label, 60, y);
    g.fillStyle = '#f7faf4'; g.font = '700 40px "Bricolage Grotesque", sans-serif';
    g.fillText(value, 60, y + 48, 680);
    y += 125;
  });

  // dashed tear line
  g.strokeStyle = '#f2c14e'; g.lineWidth = 3; g.setLineDash([14, 12]);
  g.beginPath(); g.moveTo(40, 960); g.lineTo(760, 960); g.stroke(); g.setLineDash([]);

  g.fillStyle = '#9fb3a6'; g.font = '400 26px "Figtree", sans-serif';
  g.fillText('Booking code', 60, 1015);
  g.fillStyle = '#f2c14e'; g.font = '800 54px "Bricolage Grotesque", sans-serif';
  g.fillText(b.ref, 60, 1075);
  g.fillStyle = '#9fb3a6'; g.font = '400 22px "Figtree", sans-serif';
  g.textAlign = 'right';
  g.fillText('Held for 15 minutes', 740, 1075);

  return c.toDataURL('image/png');
}
