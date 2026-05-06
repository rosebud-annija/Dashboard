// ── SCORE DATA ──
// Auto-generated from indikatoren.js — edit values there, not here
var SCORE_DATA = (function() {
  if (typeof INDIKATOREN === 'undefined') {
    console.warn('indikatoren.js nicht geladen — SCORE_DATA leer');
    return {};
  }
  var out = {};
  Object.keys(INDIKATOREN).forEach(function(cat) {
    var catData = INDIKATOREN[cat];
    out[cat] = {
      label: catData.label,
      items: catData.items.map(function(item) {
        return { label: item.label, score: item.score };
      })
    };
  });
  return out;
})();

// ── SYNC SOURCE LINKS FROM CONFIG ────────────────────────────────────────────
// Liest source_url / source_name / data_period aus indikatoren.js
// und aktualisiert alle kpi-detail Links im DOM.
function syncSourceLinksFromConfig() {
  if (typeof INDIKATOREN === 'undefined') return;
  Object.keys(INDIKATOREN).forEach(function(cat) {
    INDIKATOREN[cat].items.forEach(function(item) {
      if (!item.source_url && !item.source_name) return;
      // Match card by normalized label
      var key = normalizeThermoLabel(item.label);
      var card = document.querySelector('.kpi-card[data-thermo-key="' + key + '"]');
      if (!card) {
        // Fallback: scan all cards
        var all = Array.prototype.slice.call(document.querySelectorAll('.kpi-card'));
        card = all.find(function(c) {
          var lbl = c.querySelector('.kpi-label');
          return lbl && normalizeThermoLabel(lbl.textContent) === key;
        }) || null;
      }
      if (!card) return;
      var link = card.querySelector('a.kpi-detail');
      if (!link) return;
      if (item.source_url) link.href = item.source_url;
      if (item.source_name) {
        var period = item.data_period ? item.data_period + ' · ' : '';
        link.textContent = period + item.source_name;
      }
    });
  });
}

function scoreColor(s) {
  return s >= 60 ? '#8ccaae' : s >= 45 ? '#f9b000' : '#e84e0f';
}

function normalizeThermoLabel(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&amp;/g, 'und')
    .replace(/[ä]/g, 'ae')
    .replace(/[ö]/g, 'oe')
    .replace(/[ü]/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

var THERMO_TARGET_ALIASES = {
  'exporte': ['exporte waren'],
  'beschaeftigte': ['unselbst beschaeftigte'],
  'arbeitslosenquote': ['arbeitslosenquote national'],
  'alq eurostat': ['alq eurostat ilo'],
  'arbeitskosten std': ['arbeitskosten std'],
  'pensionsantrittsalter': ['faktisches pensionsalter']
};

function syncValuesFromConfig() {
  if (typeof INDIKATOREN === 'undefined') return;
  Object.keys(INDIKATOREN).forEach(function(cat) {
    INDIKATOREN[cat].items.forEach(function(item) {
      if (!item.value) return;
      var key = normalizeThermoLabel(item.label);
      var card = document.querySelector('.kpi-card[data-thermo-key="' + key + '"]');
      if (!card) {
        var all = Array.prototype.slice.call(document.querySelectorAll('.kpi-card'));
        card = all.find(function(c) {
          var lbl = c.querySelector('.kpi-label');
          return lbl && normalizeThermoLabel(lbl.textContent) === key;
        }) || null;
      }
      if (!card) return;
      var valueEl = card.querySelector('.kpi-value');
      if (valueEl) valueEl.innerHTML = item.value;
    });
  });
}

function prepareThermoTargets() {
  document.querySelectorAll('.kpi-card').forEach(function(card) {
    var labelEl = card.querySelector('.kpi-label');
    if (!labelEl) return;
    var key = normalizeThermoLabel(labelEl.textContent);
    card.dataset.thermoKey = key;
    card.classList.add('card-thermo-target');
  });
}

function findThermoTarget(label) {
  var key = normalizeThermoLabel(label);
  var keys = [key].concat(THERMO_TARGET_ALIASES[key] || []);
  for (var i = 0; i < keys.length; i++) {
    var found = document.querySelector('.kpi-card[data-thermo-key="' + keys[i] + '"]');
    if (found) return found;
  }
  var cards = Array.prototype.slice.call(document.querySelectorAll('.kpi-card'));
  return cards.find(function(card) {
    return keys.some(function(candidate) {
      return (card.dataset.thermoKey || '').indexOf(candidate) !== -1 || candidate.indexOf(card.dataset.thermoKey || '') !== -1;
    });
  }) || null;
}

/* ── HERVORHEBUNG 2 — thermometer click ── */
/* Only the background changes; text always white; font sizes unchanged */
var _activeThermo = { link: null, card: null };

function clearHighlight2() {
  if (_activeThermo.card) {
    var c = _activeThermo.card;
    c.classList.remove('is-highlight-2');
    c.style.removeProperty('background');
    c.style.removeProperty('--hl2-bg');
    c.style.removeProperty('--hl2-text');
    c.style.removeProperty('--hl2-muted');
    c.style.removeProperty('--hl2-chip-bg');
  }
  if (_activeThermo.link) {
    _activeThermo.link.classList.remove('thermo-row-link--active');
  }
  _activeThermo.link = null;
  _activeThermo.card = null;
}

function applyHighlight2(card, color) {
  /* Background at ~72% opacity + always white text */
  card.style.setProperty('background', color);
  card.style.setProperty('--hl2-bg', color);
  card.style.setProperty('--hl2-text', '#ffffff');
  card.style.setProperty('--hl2-muted', 'rgba(255,255,255,0.72)');
  card.style.setProperty('--hl2-chip-bg', 'rgba(255,255,255,0.18)');
  card.classList.add('is-highlight-2');
}

function findThermoTarget(label) {
  var key = normalizeThermoLabel(label);
  var keys = [key].concat(THERMO_TARGET_ALIASES[key] || []);
  for (var i = 0; i < keys.length; i++) {
    var found = document.querySelector('.kpi-card[data-thermo-key="' + keys[i] + '"]');
    if (found) return found;
  }
  var cards = Array.prototype.slice.call(document.querySelectorAll('.kpi-card'));
  return cards.find(function(card) {
    return keys.some(function(candidate) {
      return (card.dataset.thermoKey || '').indexOf(candidate) !== -1
          || candidate.indexOf(card.dataset.thermoKey || '') !== -1;
    });
  }) || null;
}

function bindThermoLinks() {
  document.querySelectorAll('.thermo-row-link[data-thermo-target]').forEach(function(link) {
    link.addEventListener('click', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var target = findThermoTarget(link.getAttribute('data-thermo-target'));
      /* Toggle: same link = deselect */
      if (_activeThermo.link === link) { clearHighlight2(); return; }
      clearHighlight2();
      if (!target) return;
      var ptsEl = link.querySelector('.thermo-row-pts');
      var score = ptsEl ? parseInt(ptsEl.textContent, 10) : 0;
      var color = scoreColor(score);
      applyHighlight2(target, color);
      _activeThermo.link = link;
      _activeThermo.card = target;
      link.classList.add('thermo-row-link--active');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  /* Click anywhere outside → deselect */
  document.addEventListener('click', function(ev) {
    if (!_activeThermo.card) return;
    var bd = document.getElementById('thermo-breakdown');
    var inPanel = bd && bd.contains(ev.target);
    var inCard  = _activeThermo.card && _activeThermo.card.contains(ev.target);
    if (!inPanel && !inCard) clearHighlight2();
  });

  /* Info tooltip toggle */
  var infoBtn   = document.getElementById('thermo-info-btn');
  var infoPanel = document.getElementById('thermo-info-panel');
  if (infoBtn && infoPanel) {
    infoBtn.addEventListener('click', function(ev) {
      ev.stopPropagation();
      infoPanel.classList.toggle('open');
      infoBtn.classList.toggle('active');
    });
    document.addEventListener('click', function(ev) {
      if (!infoBtn.contains(ev.target) && !infoPanel.contains(ev.target)) {
        infoPanel.classList.remove('open');
        infoBtn.classList.remove('active');
      }
    });
  }
}

// Overall score
var catW = {wirtschaft:0.28, arbeitsmarkt:0.28, preise:0.22, finanzen:0.22};
var overall = 0;
Object.entries(SCORE_DATA).forEach(function(e) {
  var avg = e[1].items.reduce(function(s,x){return s+x.score;},0) / e[1].items.length;
  overall += avg * (catW[e[0]] || 0.25);
});
overall = Math.round(overall);
var col = scoreColor(overall);
prepareThermoTargets();
syncValuesFromConfig();
syncSourceLinksFromConfig();

// Ticks
var ticksEl = document.getElementById('thermo-ticks');
for (var t = 0; t < 9; t++) {
  var d = document.createElement('div');
  d.style.cssText = 'position:absolute;left:6px;right:6px;height:1px;background:rgba(39,52,139,0.12);top:' + ((t+1)*10) + '%';
  ticksEl.appendChild(d);
}

// Needle dot
var needle = document.getElementById('thermo-needle');
needle.innerHTML = '<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:' + col + ';border:2px solid #fff;box-shadow:0 0 8px ' + col + ';"></div>';

function verdictText(s) {
  return s >= 65 ? 'Auf Kurs' : s >= 50 ? 'Stabil' : s >= 35 ? 'Unter Druck' : 'Kritisch';
}

// Score + verdict — shows 0 initially, counts up during animation
document.getElementById('thermo-score-wrap').innerHTML =
    '<div class="thermo-score-val" id="thermo-score-num" style="color:' + col + ';">0</div>'
  + '<div class="thermo-score-label">von 100</div>'
  + '<div class="thermo-score-verdict" style="color:' + col + ';">' + verdictText(overall) + '</div>';

// Animate fill + needle + score count-up
setTimeout(function() {
  var fill = document.getElementById('thermo-fill');
  fill.style.height = overall + '%';
  fill.style.background = overall >= 50
    ? 'linear-gradient(to top, rgba(140,202,174,0.25), rgba(140,202,174,0.55))'
    : 'linear-gradient(to top, rgba(232,78,15,0.45), rgba(232,78,15,0.15))';
  fill.style.borderTop = '2px solid ' + col;
  needle.style.bottom = 'calc(' + overall + '% - 1px)';
  needle.style.background = col;
  needle.style.boxShadow = '0 0 8px ' + col;

  // Count-up: 0 → overall over ~1200 ms (matches CSS fill transition)
  var scoreNum = document.getElementById('thermo-score-num');
  var duration = 1200;
  var startTs = null;
  function countUp(ts) {
    if (!startTs) startTs = ts;
    var progress = Math.min((ts - startTs) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    scoreNum.textContent = Math.round(eased * overall);
    if (progress < 1) requestAnimationFrame(countUp);
  }
  requestAnimationFrame(countUp);
}, 600);

// Breakdown list (below tube+score block)
var bd = '';
Object.entries(SCORE_DATA).forEach(function(e) {
  bd += '<div class="thermo-cat-header">' + e[1].label + '</div>';
  e[1].items.forEach(function(x) {
    bd += '<div class="thermo-row">'
       + '<a href="#" class="thermo-row-link" data-thermo-target="' + x.label.replace(/"/g, '&quot;') + '">'
       + '<div class="thermo-row-dot" style="background:' + scoreColor(x.score) + ';"></div>'
       + '<div class="thermo-row-name">' + x.label + '</div>'
       + '<div class="thermo-row-pts" style="color:' + scoreColor(x.score) + ';">' + x.score + '</div>'
       + '</a>'
       + '</div>';
  });
});
document.getElementById('thermo-breakdown').innerHTML = bd;
bindThermoLinks();

// ── MOBILE ZUKUNFTSWERT TOGGLE ──
(function() {
  var btn = document.createElement('button');
  btn.className = 'thermo-mobile-toggle';
  btn.textContent = 'Alle Indikatoren ▾';
  var bd = document.getElementById('thermo-breakdown');
  if (bd && bd.parentNode) {
    bd.parentNode.insertBefore(btn, bd);
    btn.addEventListener('click', function() {
      var open = bd.classList.toggle('thermo-bd-open');
      btn.textContent = open ? 'Schließen ▴' : 'Alle Indikatoren ▾';
    });
  }
})();

// ── CHARTS ──
var tC = '#8090b8';
var gC = 'rgba(39,52,139,0.07)';
var PALETTE = ['#009fe3', '#a877b2', '#006780', '#caa87d'];

function hexToRgba(hex, alpha) {
  var h = hex.replace('#', '');
  var bigint = parseInt(h, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function lineOpts(color) {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 }, maxRotation: 0 }, grid: { color: gC }, border: { display: false } },
      y: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { color: gC }, border: { display: false } }
    },
    elements: { line: { borderWidth: 2, tension: 0.4, borderColor: color }, point: { radius: 0, hoverRadius: 4, backgroundColor: color } }
  };
}

// BIP
var chartBip = new Chart(document.getElementById('chart-bip'), {
  type: 'line',
  data: {
    labels: ['2018','2019','2020','2021','2022','2023','2024','2025E','2026P'],
    datasets: [{ data: [2.6,1.5,-6.3,4.9,5.3,-0.8,-0.7,0.5,1.2], fill: true, backgroundColor: hexToRgba(PALETTE[0], 0.10), borderColor: PALETTE[0] }]
  },
  options: lineOpts(PALETTE[0])
});

// Handel
var chartHandel = new Chart(document.getElementById('chart-handel'), {
  type: 'bar',
  data: {
    labels: ['2020','2021','2022','2023','2024'],
    datasets: [
      { label: 'Exporte', data: [142,168,195,201,191], backgroundColor: hexToRgba('#e84e0f', 0.82), borderColor: '#e84e0f', borderRadius: 3 },
      { label: 'Importe', data: [141,165,215,215,189], backgroundColor: hexToRgba(PALETTE[3], 0.82), borderColor: PALETTE[3], borderRadius: 3 }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true, labels: { color: tC, font: { family: 'MuseoSans', size: 9 }, boxWidth: 10 } } },
    scales: {
      x: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { display: false }, border: { display: false } },
      y: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { color: gC }, border: { display: false } }
    }
  }
});

// ALQ
var chartAlq = new Chart(document.getElementById('chart-alq'), {
  type: 'line',
  data: {
    labels: ['2018','2019','2020','2021','2022','2023','2024','2025','M26'],
    datasets: [{ data: [7.7,7.4,9.9,8.0,6.3,6.4,7.0,7.4,7.0], fill: true, backgroundColor: hexToRgba(PALETTE[1], 0.10), borderColor: PALETTE[1] }]
  },
  options: lineOpts(PALETTE[1])
});

// Stellen
var chartStellen = new Chart(document.getElementById('chart-stellen'), {
  type: 'line',
  data: {
    labels: ['2020','2021','2022','2023','2024','2025'],
    datasets: [{ data: [68,110,148,135,105,100], fill: true, backgroundColor: hexToRgba(PALETTE[2], 0.10), borderColor: PALETTE[2] }]
  },
  options: lineOpts(PALETTE[2])
});

// Inflation
var chartInflation = new Chart(document.getElementById('chart-inflation'), {
  type: 'line',
  data: {
    labels: ["Mär'23","Jun","Sep","Dez","Mär'24","Jun","Sep","Dez","Mär'25","Jun","Sep","Dez","Feb'26"],
    datasets: [{ data: [9.2,8.0,6.1,5.5,4.3,3.0,2.4,2.0,2.6,3.0,3.8,3.2,2.2], fill: true, backgroundColor: hexToRgba(PALETTE[0], 0.10), borderColor: PALETTE[0] }]
  },
  options: lineOpts(PALETTE[0])
});

// Immo
var chartImmo = new Chart(document.getElementById('chart-immo'), {
  type: 'line',
  data: {
    labels: ["Q1'21","Q3","Q1'22","Q3","Q1'23","Q3","Q1'24","Q3","Q1'25","Q3","Q4'25"],
    datasets: [{ data: [188,213,238,265,270,265,260,263,266,268,269], fill: true, backgroundColor: hexToRgba(PALETTE[3], 0.12), borderColor: PALETTE[3] }]
  },
  options: lineOpts(PALETTE[3])
});

// Schulden
var chartSchulden = new Chart(document.getElementById('chart-schulden'), {
  type: 'line',
  data: {
    labels: ['2018','2019','2020','2021','2022','2023','2024','2025','2026P'],
    datasets: [{ data: [74.0,70.5,83.3,82.8,78.5,77.8,81.8,81.5,84.7], fill: true, backgroundColor: hexToRgba(PALETTE[1], 0.12), borderColor: PALETTE[1] }]
  },
  options: lineOpts(PALETTE[1])
});

// Quoten
var chartQuoten = new Chart(document.getElementById('chart-quoten'), {
  type: 'line',
  data: {
    labels: ['2018','2019','2020','2021','2022','2023','2024','2025'],
    datasets: [
      { label: 'Abgabenquote', data: [43.3,43.5,43.1,43.3,43.5,43.7,44.3,44.3], borderColor: PALETTE[2], backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 0 },
      { label: 'Staatsquote',  data: [48.7,48.8,56.7,56.5,54.3,55.1,54.8,55.3], borderColor: PALETTE[3], backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 0 }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true, labels: { color: tC, font: { family: 'MuseoSans', size: 9 }, boxWidth: 10 } } },
    scales: {
      x: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { color: gC }, border: { display: false } },
      y: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { color: gC }, border: { display: false } }
    }
  }
});




// ── BEVÖLKERUNGSSTRUKTUR CHART ──
(function() {
  var el = document.getElementById('chart-bevoelkerung');
  if (!el) return;
  var tC = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
  var gC = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
  var ageGroups = ['75+', '65–74', '55–64', '45–54', '35–44', '25–34', '15–24', '0–14'];
  var maenner   = [300, 395, 590, 635, 675, 695, 590, 675];
  var frauen    = [490, 450, 570, 610, 635, 660, 545, 635];
  new Chart(el, {
    type: 'bar',
    data: {
      labels: ageGroups,
      datasets: [
        {
          label: 'Männer',
          data: maenner,
          backgroundColor: 'rgba(0,159,227,0.8)',
          borderColor: '#009fe3',
          borderWidth: 1,
          borderRadius: 2
        },
        {
          label: 'Frauen',
          data: frauen,
          backgroundColor: 'rgba(0,103,128,0.8)',
          borderColor: '#006780',
          borderWidth: 1,
          borderRadius: 2
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { color: tC, font: { family: 'MuseoSans', size: 10 }, boxWidth: 12, padding: 10 } },
        tooltip: {
          callbacks: {
            label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw.toLocaleString('de-AT') + ' Tsd.'; }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: tC, font: { family: 'MuseoSans', size: 9 }, callback: function(v) { return v + ' T'; } },
          grid: { color: gC },
          border: { display: false },
          title: { display: true, text: 'Tausend Personen', color: tC, font: { family: 'MuseoSans', size: 9 } }
        },
        y: {
          ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } },
          grid: { color: gC },
          border: { display: false }
        }
      }
    }
  });
})();




// ── PENSIONSANTRITTSALTER CHART ──
(function() {
  var el = document.getElementById('chart-pensionsalter');
  if (!el) return;
  var tC = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
  var gC = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
  new Chart(el, {
    type: 'line',
    data: {
      labels: ['2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
      datasets: [{
        label: 'Faktisches Pensionsantrittsalter (J.)',
        data: [58.2, 58.5, 59.1, 59.4, 59.7, 60.1, 60.3, 60.2, 60.5, 60.8, 61.2, 61.4],
        borderColor: '#f9b000',
        backgroundColor: 'rgba(249,176,0,0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#f9b000',
        borderWidth: 2
      }, {
        label: 'Gesetzliches Alter (65)',
        data: [65,65,65,65,65,65,65,65,65,65,65,65],
        borderColor: 'rgba(180,180,180,0.6)',
        borderDash: [4,4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { color: tC, font: { family: 'MuseoSans', size: 10 }, boxWidth: 12, padding: 8 } }
      },
      scales: {
        x: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { color: gC }, border: { display: false } },
        y: { min: 57, max: 66,
          ticks: { color: tC, font: { family: 'MuseoSans', size: 9 }, callback: function(v) { return v + ' J.'; } },
          grid: { color: gC }, border: { display: false }
        }
      }
    }
  });
})();

// ── ENERGIEPREISE MONATSVERLAUF ──
(function() {
  var el = document.getElementById('chart-energie');
  if (!el) return;
  var tC = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
  var gC = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
  new Chart(el, {
    type: 'line',
    data: {
      labels: ['Jan 23','Mär 23','Mai 23','Jul 23','Sep 23','Nov 23',
               'Jan 24','Mär 24','Mai 24','Jul 24','Sep 24','Nov 24',
               'Jan 25','Mär 25','Mai 25','Jul 25','Sep 25','Nov 25'],
      datasets: [{
        label: 'Haushaltsstrom (ct/kWh)',
        data: [29.4,28.8,27.6,26.8,25.4,24.2,23.5,22.8,22.0,21.4,20.8,20.2,19.8,19.4,19.1,18.9,18.7,18.5],
        borderColor: '#8ccaae',
        backgroundColor: 'rgba(140,202,174,0.15)',
        fill: true, tension: 0.4,
        pointRadius: 2, pointBackgroundColor: '#8ccaae', borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: function(ctx) { return ctx.raw.toFixed(1) + ' ct/kWh'; } } }
      },
      scales: {
        x: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 }, maxRotation: 45 }, grid: { color: gC }, border: { display: false } },
        y: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 }, callback: function(v) { return v + ' ct'; } }, grid: { color: gC }, border: { display: false } }
      }
    }
  });
})();

// ── STAATSAUSGABEN NACH AUFGABENBEREICHEN ──
(function() {
  var el = document.getElementById('chart-aufgaben');
  if (!el) return;
  var tC = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
  var gC = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
  var cats = ['Sozialschutz','Gesundheit','Allg. Verwaltung','Wirtschaft','Bildung','Öff. Ordnung','Wohnungswesen','Freizeit/Kultur','Umwelt','Verteidigung'];
  var vals = [101,38,31,26,25,11,5,5,4,3];
  var cols = vals.map(function(v) {
    return v >= 80 ? 'rgba(232,78,15,0.75)' : v >= 25 ? 'rgba(249,176,0,0.75)' : 'rgba(140,202,174,0.75)';
  });
  new Chart(el, {
    type: 'bar',
    data: {
      labels: cats,
      datasets: [{ label: 'Mrd. €', data: vals, backgroundColor: cols,
        borderColor: cols.map(function(c){return c.replace('0.75','1');}), borderWidth:1, borderRadius:3 }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: function(ctx){ return ctx.raw + ' Mrd. €'; } } }
      },
      scales: {
        x: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 }, callback: function(v){ return v + ' Mrd.'; } }, grid: { color: gC }, border: { display: false } },
        y: { ticks: { color: tC, font: { family: 'MuseoSans', size: 9 } }, grid: { color: gC }, border: { display: false } }
      }
    }
  });
})();

syncDashboardStyles();

var LIVE_REFRESH_MS = 15 * 60 * 1000;
var liveDataSources = {
  eurostatBase: 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/'
};

function formatNumberAT(value, digits) {
  if (value === null || value === undefined || Number.isNaN(value)) return '–';
  return new Intl.NumberFormat('de-AT', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

function monthLabel(value) {
  if (!value) return '';
  var str = String(value);
  var m = str.match(/^(\d{4})-(\d{2})$/);
  if (m) {
    return new Date(Number(m[1]), Number(m[2]) - 1, 1).toLocaleDateString('de-AT', { month: 'short', year: '2-digit' });
  }
  if (/^\d{4}M\d{2}$/.test(str)) {
    return new Date(Number(str.slice(0, 4)), Number(str.slice(5, 7)) - 1, 1).toLocaleDateString('de-AT', { month: 'short', year: '2-digit' });
  }
  if (/^\d{4}Q[1-4]$/.test(str)) {
    return 'Q' + str.slice(-1) + ' ' + str.slice(2, 4);
  }
  return str;
}

function parseTimeKey(value) {
  var str = String(value || '');
  if (/^\d{4}$/.test(str)) return new Date(Number(str), 0, 1).getTime();
  var m = str.match(/^(\d{4})-(\d{2})$/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, 1).getTime();
  m = str.match(/^(\d{4})M(\d{2})$/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, 1).getTime();
  m = str.match(/^(\d{4})Q([1-4])$/);
  if (m) return new Date(Number(m[1]), (Number(m[2]) - 1) * 3, 1).getTime();
  return Number.MAX_SAFE_INTEGER;
}

function getStatusKeyFromElement(el) {
  if (!el) return 'neutral';
  if (el.classList.contains('badge-good') || el.classList.contains('good')) return 'good';
  if (el.classList.contains('badge-bad') || el.classList.contains('bad')) return 'bad';
  return 'neutral';
}

function statusColorHex(key) {
  if (key === 'good') return '#8ccaae';
  if (key === 'bad') return '#e84e0f';
  return '#f9b000';
}

function preferredAltColor(base) {
  return PALETTE.find(function(c) { return c.toLowerCase() !== base.toLowerCase(); }) || PALETTE[0];
}

function hexLuma(hex) {
  var c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(function(ch) { return ch + ch; }).join('');
  var rgb = [0, 2, 4].map(function(i) {
    var v = parseInt(c.substr(i, 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function applyHighlightStyle(card) {
  if (!card || !card.classList.contains('is-highlight')) return;
  var key = getStatusKeyFromElement(card);
  var bg = statusColorHex(key);
  var useDarkText = false; /* always white text on highlight backgrounds */
  var fg = '#ffffff';
  var muted = 'rgba(255,255,255,0.78)';
  var chipBg = 'rgba(255,255,255,0.20)';
  var chipFg = fg;
  card.style.setProperty('--highlight-bg', bg);
  card.style.setProperty('--highlight-fg', fg);
  card.style.setProperty('--highlight-muted', muted);
  card.style.setProperty('--highlight-accent', useDarkText ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.28)');
  card.style.setProperty('--highlight-shadow', useDarkText ? 'rgba(20,25,58,0.12)' : 'rgba(39,52,139,0.18)');
  card.style.setProperty('--highlight-chip-bg', chipBg);
  card.style.setProperty('--highlight-chip-fg', chipFg);
}

function ensureBadgeArrow(badge) {
  if (!badge) return;
  var txt = badge.textContent.trim();
  if (/^[▲▼]/.test(txt)) return;
  var key = getStatusKeyFromElement(badge) || getStatusKeyFromElement(badge.closest('.kpi-card, .chart-card'));
  var arrow = key === 'bad' ? '▼' : '▲';
  badge.textContent = arrow + ' ' + txt.replace(/^[-—]\s*/, '');
}

function applyChartPaletteFromCard(card) {
  if (!card) return;
  var canvas = card.querySelector('canvas');
  if (!canvas) return;
  var chart = Chart.getChart(canvas);
  if (!chart) return;
  var key = getStatusKeyFromElement(card);
  var base = statusColorHex(key);
  var alt = preferredAltColor(base);
  chart.data.datasets.forEach(function(ds, idx) {
    var color = idx === 0 ? base : preferredAltColor(idx === 1 ? base : alt);
    if (canvas.id === 'chart-handel') {
      color = idx === 0 ? '#e84e0f' : PALETTE[3];
    }
    if (canvas.id === 'chart-bevoelkerung') {
      color = idx === 0 ? '#009fe3' : '#006780';
    }
    if (chart.config.type === 'bar') {
      ds.backgroundColor = hexToRgba(color, idx === 0 ? 0.82 : 0.72);
      ds.borderColor = color;
    } else {
      ds.borderColor = color;
      if (chart.data.datasets.length === 1) {
        ds.backgroundColor = hexToRgba(color, 0.12);
        ds.fill = true;
      } else {
        ds.backgroundColor = idx === 0 ? hexToRgba(color, 0.06) : 'transparent';
      }
      ds.pointBackgroundColor = color;
      ds.pointBorderColor = color;
    }
  });
  chart.update('none');
}

function syncDashboardStyles() {
  document.querySelectorAll('.kpi-badge, .chart-status').forEach(ensureBadgeArrow);
  document.querySelectorAll('.kpi-card.is-highlight').forEach(applyHighlightStyle);
  document.querySelectorAll('.chart-card').forEach(applyChartPaletteFromCard);
}

function statusFromSeries(series, higherIsGood) {
  if (!series || series.length < 2) return { text: (higherIsGood ? '▲ stabil' : '▼ stabil'), cls: 'badge-neutral', chartCls: 'neutral' };
  var values = series.map(function(p) { return Number(p.value); }).filter(function(v) { return Number.isFinite(v); });
  if (values.length < 2) return { text: (higherIsGood ? '▲ stabil' : '▼ stabil'), cls: 'badge-neutral', chartCls: 'neutral' };
  var prev = values[values.length - 2];
  var last = values[values.length - 1];
  var diff = last - prev;
  if (Math.abs(diff) < 0.05) return { text: (higherIsGood ? '▲ stabil' : '▼ stabil'), cls: 'badge-neutral', chartCls: 'neutral' };
  var rising = diff > 0;
  var positive = higherIsGood ? rising : !rising;
  return {
    text: rising ? 'steigend' : 'rückläufig',
    cls: positive ? 'badge-good' : 'badge-bad',
    chartCls: positive ? 'good' : 'bad'
  };
}

function setBadge(card, status) {
  if (!card || !status) return;
  var badge = card.querySelector('.kpi-badge, .chart-status');
  if (!badge) return;
  badge.textContent = status.text;
  ensureBadgeArrow(badge);
  badge.className = badge.className.replace(/badge-good|badge-bad|badge-neutral/g, '').trim();
  if (badge.classList.contains('kpi-badge')) {
    badge.classList.add(status.cls);
  }
  /* Card status class is set editorially in HTML (via data-score) — not overridden by live trend */
  applyHighlightStyle(card);
  applyChartPaletteFromCard(card);
}


function setKpiByLabel(labelText, valueHtml, detailText, noteText, status) {
  var labels = Array.from(document.querySelectorAll('.kpi-label'));
  var label = labels.find(function(el) { return el.textContent.trim().toLowerCase() === labelText.toLowerCase(); });
  if (!label) return;
  var card = label.closest('.kpi-card');
  if (!card) return;
  var valueEl = card.querySelector('.kpi-value');
  var detailEl = card.querySelector('.kpi-detail');
  var noteEl = card.querySelector('.kpi-note');
  if (valueEl && valueHtml) valueEl.innerHTML = valueHtml;
  if (detailEl && detailText) detailEl.textContent = detailText;
  if (noteEl && noteText) noteEl.textContent = noteText;
  setBadge(card, status);
}

function setChartStatus(canvasId, status) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var card = canvas.closest('.chart-card');
  setBadge(card, status);
}

function updateChart(chart, series, options) {
  if (!chart || !series || !series.length) return;
  chart.data.labels = series.map(function(p) { return options && options.labelFormatter ? options.labelFormatter(p.time) : p.time; });
  if (chart.config.type === 'bar' && Array.isArray(chart.data.datasets) && chart.data.datasets.length > 1 && series[0].exports !== undefined) {
    chart.data.labels = series.map(function(p) { return p.time; });
    chart.data.datasets[0].data = series.map(function(p) { return p.exports; });
    chart.data.datasets[1].data = series.map(function(p) { return p.imports; });
  } else if (chart.data.datasets.length === 1) {
    chart.data.datasets[0].data = series.map(function(p) { return p.value; });
  } else if (chart.data.datasets.length > 1 && series[0].series) {
    series[0].series.forEach(function(serie, idx) {
      if (chart.data.datasets[idx]) chart.data.datasets[idx].data = serie.values;
    });
    chart.data.labels = series[0].labels;
  }
  chart.update();
}

function flattenCategoryCodes(dimension) {
  var idx = (dimension.category && dimension.category.index) || {};
  return Object.keys(idx).sort(function(a, b) { return idx[a] - idx[b]; });
}

function decodeJsonStat(dataset) {
  if (!dataset || !Array.isArray(dataset.id) || !dataset.dimension) return [];
  var dims = dataset.id;
  var categories = {};
  dims.forEach(function(dim) {
    categories[dim] = flattenCategoryCodes(dataset.dimension[dim]);
  });
  var results = [];
  var total = dims.reduce(function(acc, dim) { return acc * categories[dim].length; }, 1);
  for (var flat = 0; flat < total; flat++) {
    var obs = {};
    var remainder = flat;
    for (var i = dims.length - 1; i >= 0; i--) {
      var dim = dims[i];
      var size = categories[dim].length;
      var pos = remainder % size;
      remainder = Math.floor(remainder / size);
      var code = categories[dim][pos];
      var labelMap = ((dataset.dimension[dim] || {}).category || {}).label || {};
      obs[dim] = code;
      obs[dim + '_label'] = labelMap[code] || code;
    }
    var rawValue = Array.isArray(dataset.value) ? dataset.value[flat] : dataset.value[String(flat)];
    if (rawValue === undefined || rawValue === null || rawValue === ':') continue;
    obs.value = Number(rawValue);
    results.push(obs);
  }
  return results;
}

function filterSeries(records, matcher) {
  var filtered = records.filter(function(row) {
    return Object.keys(matcher).every(function(key) {
      var wanted = matcher[key];
      var hay = String(row[key] || '').toLowerCase() + ' ' + String(row[key + '_label'] || '').toLowerCase();
      if (Array.isArray(wanted)) return wanted.some(function(term) { return hay.indexOf(String(term).toLowerCase()) !== -1; });
      return hay.indexOf(String(wanted).toLowerCase()) !== -1;
    });
  });
  filtered.sort(function(a, b) { return parseTimeKey(a.time || a.TIME_PERIOD || a.period) - parseTimeKey(b.time || b.TIME_PERIOD || b.period); });
  return filtered.map(function(row) {
    return { time: row.time || row.TIME_PERIOD || row.period, value: row.value };
  });
}

function seriesFromRecords(records) {
  return records
    .map(function(row) { return { time: row.time || row.TIME_PERIOD || row.period, value: row.value }; })
    .sort(function(a, b) { return parseTimeKey(a.time) - parseTimeKey(b.time); });
}

async function fetchEurostatDataset(code, params) {
  var url = new URL(liveDataSources.eurostatBase + code);
  var merged = Object.assign({ lang: 'EN', format: 'JSON' }, params || {});
  Object.keys(merged).forEach(function(key) { url.searchParams.set(key, merged[key]); });
  var response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) throw new Error('Eurostat ' + code + ' ' + response.status);
  return response.json();
}

async function refreshLiveData() {
  // Data-driven: reads from QUELLEN (quellen.js).
  // To add or change a live source, edit quellen.js only.
  if (typeof QUELLEN === 'undefined') {
    console.warn('[AA] quellen.js not loaded');
    return;
  }

  var eurostatItems = QUELLEN.filter(function(q) { return q.typ === 'eurostat'; });
  var datasetCache = {};

  // Build label→INDIKATOREN-item map for source_name fallback
  var indiMap = {};
  Object.values(INDIKATOREN).forEach(function(cat) {
    cat.items.forEach(function(item) { indiMap[item.label] = item; });
  });

  async function getDataset(datensatz, params) {
    var key = datensatz + JSON.stringify(params || {});
    if (!datasetCache[key]) {
      datasetCache[key] = await fetchEurostatDataset(datensatz, Object.assign({ geo: 'AT' }, params || {}));
    }
    return datasetCache[key];
  }

  for (var i = 0; i < eurostatItems.length; i++) {
    var q = eurostatItems[i];
    try {
      var json;
      try {
        json = await getDataset(q.datensatz, q.parameter);
      } catch (_) {
        if (q.fallback_datensatz) {
          json = await getDataset(q.fallback_datensatz, q.parameter);
        } else {
          throw _;
        }
      }

      var records = decodeJsonStat(json);
      var series = (q.filter ? filterSeries(records, q.filter) : seriesFromRecords(records))
                     .slice(-(q.reihen || 9));
      if (!series.length) continue;

      var labelFmtFn = q.zeitformat === 'monat' ? monthLabel : null;
      var status = statusFromSeries(series, q.hoeher_besser !== false);

      if (q.chart) {
        var chartInstance = Chart.getChart(q.chart);
        if (chartInstance) {
          updateChart(chartInstance, series, labelFmtFn ? { labelFormatter: labelFmtFn } : {});
          setChartStatus(q.chart, status);
        }
      }

      if (!q.nur_chart) {
        var latest = series[series.length - 1];
        var formatted = formatNumberAT(latest.value, q.dezimal != null ? q.dezimal : 1)
                      + (q.einheit ? '<span class="unit">' + q.einheit + '</span>' : '');
        var fallbackSource = (indiMap[q.label] || {}).source_name || '';
        setKpiByLabel(q.label, formatted, 'Letzte verfügbare Eurostat-Meldung', q.untertitel || fallbackSource, status);
      }
    } catch (err) {
      console.warn('[AA] Live fetch failed for "' + q.label + '":', err);
    }
  }

  var liveNoteId = 'live-data-note';
  var liveNote = document.getElementById(liveNoteId);
  if (!liveNote) {
    liveNote = document.createElement('div');
    liveNote.id = liveNoteId;
    liveNote.style.cssText = 'font-family:MuseoSans,sans-serif;font-size:10px;color:#6b7280;margin:0 0 18px 0;';
    var anchor = document.querySelector('.left');
    if (anchor) anchor.insertBefore(liveNote, anchor.firstChild.nextSibling);
  }
  liveNote.textContent = 'Live-Stand: ' + new Date().toLocaleString('de-AT') + ' · Daten soweit verfügbar direkt aus Eurostat geladen, sonst Fallback auf statische Werte.';
}

// Refresh live data only once per calendar week (Monday start)
(function() {
  function getWeekKey(d) {
    var jan1 = new Date(d.getFullYear(), 0, 1);
    return d.getFullYear() + '-W' + Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  }
  var thisWeek = getWeekKey(new Date());
  var lastWeek = '';
  try { lastWeek = localStorage.getItem('aa_refresh_week') || ''; } catch(e) {}
  if (lastWeek !== thisWeek) {
    refreshLiveData().then(function() {
      try { localStorage.setItem('aa_refresh_week', thisWeek); } catch(e) {}
      try { localStorage.setItem('aa_refresh_ts', new Date().toISOString()); } catch(e) {}
      updateRefreshBar(new Date());
    }).catch(function(e) { console.warn('Live data refresh failed:', e); });
  } else {
    console.log('[AA] Live data up to date — next refresh next week.');
    try { var ts = localStorage.getItem('aa_refresh_ts'); if (ts) updateRefreshBar(new Date(ts)); } catch(e) {}
  }
})();


// ── FILTER ──
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var f = btn.dataset.filter;
    document.querySelectorAll('.category-section').forEach(function(s) {
      s.classList.toggle('hidden', f !== 'all' && s.dataset.category !== f);
    });
  });
});


// ────────────────────────────────────────────────────────────────────────────

// ── DARK MODE ────────────────────────────────────────────────────────────────
(function() {
  var root = document.documentElement;
  var btn  = document.getElementById('theme-toggle');
  var saved = localStorage.getItem('aa-theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');


  function updateRefreshBar(date) {
    var el = document.getElementById('refresh-label');
    if (!el) return;
    var opts = { weekday:'short', day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' };
    el.textContent = 'Quelldaten zuletzt abgerufen: ' + date.toLocaleDateString('de-AT', opts) + ' Uhr';
  }

  function syncCharts() {
    if (typeof Chart === 'undefined') return;
    var s = getComputedStyle(root);
    var tC = s.getPropertyValue('--text').trim();
    var gC = s.getPropertyValue('--border').trim();
    var mC = s.getPropertyValue('--muted2').trim();
    document.querySelectorAll('canvas').forEach(function(canvas) {
      var chart = Chart.getChart ? Chart.getChart(canvas) : null;
      if (!chart) return;
      if (chart.options.scales) {
        Object.values(chart.options.scales).forEach(function(sc) {
          if (sc.ticks)  sc.ticks.color  = tC;
          if (sc.grid)   sc.grid.color   = gC;
          if (sc.title)  sc.title.color  = tC;
        });
      }
      var leg = chart.options.plugins && chart.options.plugins.legend;
      if (leg && leg.labels) leg.labels.color = tC;
      chart.update('none');
    });
    if (typeof syncDashboardStyles === 'function') syncDashboardStyles();
  }

  function setTheme(dark) {
    if (dark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('aa-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('aa-theme', 'light');
    }
    setTimeout(syncCharts, 30);
  }

  if (btn) {
    btn.addEventListener('click', function() {
      setTheme(root.getAttribute('data-theme') !== 'dark');
    });
  }

  if (saved === 'dark') setTimeout(syncCharts, 200);
})();


// ── EXPAND IN-PLACE ──────────────────────────────────────────────────────────
(function() {

var D = {
  'Bevölkerung': {
    e: 'Österreichs Bevölkerung wächst weiterhin, jedoch verlangsamt. Haupttreiber ist Zuwanderung, da die Geburtenrate mit 1,47 deutlich unter dem Reproduktionsniveau (2,1) liegt. Der demographische Wandel erhöht langfristig den Druck auf Pensionen, Gesundheit und Pflege.',
    vt: 'Bevölkerung',
    v: [{n:'Österreich',v:'9,19 Mio.',w:11,c:''},{n:'Schweiz',v:'8,8 Mio.',w:10,c:''},{n:'Deutschland',v:'84,4 Mio.',w:100,c:''}],
    b: 'Integration von Zuwanderern in den Arbeitsmarkt beschleunigen (Anerkennungsverfahren, Sprachkurse). Ganztagesbetreuungsausbau vorziehen, um Geburtenrate und Frauenerwerbstätigkeit gleichzeitig zu stärken.'
  },
  'BIP-Wachstum real': {
    e: '2025 kehrte Österreich mit +0,6 % ins leichte Plus zurück. Nach zwei Rezessionsjahren ist die Erholung jedoch fragil — das Wachstum liegt deutlich unter dem EU-Schnitt. Die Industrierezession setzt sich in abgeschwächter Form fort, und die Binnennachfrage zeigt nur zögerliche Signale.',
    vt: 'BIP-Wachstum real 2025',
    v: [{n:'Österreich',v:'+0,6 %',w:25,c:'bad'},{n:'Deutschland',v:'+0,0 %',w:15,c:'bad'},{n:'EU-Schnitt',v:'+1,4 %',w:55,c:''},{n:'USA',v:'+2,8 %',w:85,c:'good'}],
    b: 'Bürokratieabbau und Standortreformen priorisieren. Unternehmenssteuer für Investitionsanreize senken. Exportabhängigkeit von Deutschland durch gezielte Diversifizierung in neue Märkte (USA, Asien) reduzieren. Ausgabenbremse einführen, um strukturelles Defizit abzubauen.'
  },
  'BIP nominal': {
    e: 'Das nominale BIP-Wachstum zog im Q4 2025 auf +3,7 % an. Mit abnehmender Inflation spiegelt dies nun mehr echte Wirtschaftsaktivität wider als in den inflationsgetriebenen Vorjahren. Dennoch bleibt das reale Wachstum (+0,6 % für Gesamtjahr 2025) weit hinter dem nominalen Zuwachs.',
    vt: 'Nom. BIP-Wachstum (%)',
    v: [{n:'Österreich Q4 2025',v:'+3,7 %',w:65,c:''},{n:'Österreich 2024',v:'+3,4 %',w:60,c:''},{n:'Österreich 2023',v:'+6,5 %',w:100,c:'bad'}],
    b: 'Inflationsbereinigung in allen öffentlichen Wirtschaftsberichten als Standard festschreiben. Ausgabenwachstum des Staates gesetzlich an das reale BIP-Wachstum koppeln (Ausgabenbremse einführen).'
  },
  'BIP pro Kopf': {
    e: 'Leicht über EU-Durchschnitt, kaufkraftbereinigt deutlich darüber. Österreich zählt zur Gruppe der wohlhabendsten EU-Mitglieder. Der Abstand zu Deutschland schrumpft jedoch durch die jüngsten Rezessionsjahre.',
    vt: 'BIP pro Kopf (€, nominal)',
    v: [{n:'Österreich',v:'53.800 €',w:42,c:''},{n:'EU-Schnitt',v:'40.890 €',w:32,c:''},{n:'Deutschland',v:'53.200 €',w:42,c:''},{n:'Luxemburg',v:'135.000 €',w:100,c:'good'}],
    b: 'Produktivitätswachstum durch Digitalisierungsoffensive und konsequente Deregulierung stärken. Steuer- und Abgabenlast senken, damit mehr Wohlstand direkt bei Haushalten und Unternehmen verbleibt.'
  },
  'Exporte (Waren)': {
    e: 'Im Jänner 2026 lagen die Warenexporte bei 15,06 Mrd. € (−2,2 % ggü. Jänner 2025). Der Abwärtsdruck durch schwache EU-Nachfrage hält an, obwohl das Minus geringer ausfällt als im Vorjahr. Österreichs Exportquote liegt mit rund 39 % des BIP unter dem EU-Schnitt.',
    vt: 'Exportquote (% des BIP)',
    v: [{n:'Österreich',v:'39 %',w:54,c:''},{n:'EU-Schnitt',v:'50 %',w:70,c:''},{n:'Deutschland',v:'56 %',w:78,c:''},{n:'Belgien',v:'85 %',w:100,c:'good'}],
    b: 'Freihandelsabkommen aktiv unterstützen und rasch ratifizieren. Exportförderung auf neue Wachstumsmärkte (Asien, Nordamerika) ausrichten. Bürokratiekosten für exportierende KMU durch One-Stop-Shops senken.'
  },
  'Importe': {
    e: 'Warenimporte lagen im Jänner 2026 bei 15,13 Mrd. € (−3,0 % ggü. Vorjahr). Importe > Exporte bedeutet ein leichtes Handelsbilanzdefizit. Der anhaltende Rückgang signalisiert schwache Inlandsnachfrage — Konsumenten und Unternehmen investieren weiter zurückhaltend.',
    vt: 'Jän. 2026: Exporte vs. Importe',
    v: [{n:'Importe −3,0 %',v:'15,13 Mrd.',w:57,c:'bad'},{n:'Exporte −2,2 %',v:'15,06 Mrd.',w:55,c:'bad'}],
    b: 'Importrückgang als Warnsignal für Binnennachfrageschwäche ernst nehmen. Kaufkraft durch Senkung der Lohnnebenkosten und Abschaffung der Kalten Progression strukturell stärken.'
  },
  'Insolvenzen': {
    e: 'Im Q4 2025 wurden 1.669 Unternehmensinsolvenzen registriert (−2,2 % ggü. Q3 2025) — ein leichter Rückgang, der die Lage jedoch nicht grundlegend verändert. Besonders betroffen bleiben Gastronomie, Bau und Einzelhandel. Die Fallzahlen liegen weiterhin deutlich über dem Vorkrisenniveau.',
    vt: 'Unternehmensinsolvenzen AT',
    v: [{n:'2019 (prä-COVID)',v:'~5.100',w:55,c:''},{n:'2022 (Stützung)',v:'~1.800',w:19,c:'good'},{n:'Q4 2025 (ann.)',v:'~6.700',w:72,c:'bad'}],
    b: 'Frühwarnsystem für überschuldete Unternehmen ausbauen (z.B. steuerlich betreute Restrukturierungsberatung). Insolvenzrecht modernisieren, um Sanierung vor Liquidation zu ermöglichen. Finanzierungszugang für KMU in Umstrukturierungsphasen verbessern.'
  },
  'Direktinvestitionen': {
    e: 'Der Bestand ausländischer Direktinvestitionen (FDI) in Österreich lag 2023 bei 226,3 Mrd. € laut Parlamentsbericht 2025. Österreich bleibt eine wichtige Drehscheibe für Investitionen nach Mittel- und Osteuropa. Im EU-Vergleich liegt die FDI-Quote relativ stabil.',
    vt: 'FDI-Bestand (Mrd. €)',
    v: [{n:'Österreich 2023',v:'226,3 Mrd.',w:42,c:'good'},{n:'Niederlande',v:'~860 Mrd.',w:100,c:'good'},{n:'Irland',v:'~950 Mrd.',w:100,c:'good'}],
    b: 'Standortattraktivität durch niedrigere Körperschaftsteuer und Deregulierung aktiv verteidigen. Rechtsstaatlichkeit, Planungssicherheit und Investitionsschutz als zentrale Standortfaktoren pflegen. Verwaltungsverfahren für FDI-Genehmigungen beschleunigen.'
  },
  'Business Climate Indicator': {
    e: 'Negativwert zeigt Pessimismus unter österreichischen Unternehmen. Eintrübung in Industrie und Dienstleistungen. Konsumzurückhaltung, hohe Kosten und Fachkräftemangel belasten die Erwartungen.',
    vt: 'Business Climate 2025',
    v: [{n:'Österreich',v:'−0,7',w:15,c:'bad'},{n:'Deutschland',v:'−0,8',w:15,c:'bad'},{n:'EU-Schnitt',v:'+0,3',w:45,c:''},{n:'USA',v:'+1,1',w:65,c:'good'}],
    b: 'Sofortige Entlastungsmaßnahmen für Unternehmen signalisieren: Bürokratieabbau, schnellere Genehmigungen, Senkung der Energieabgaben. Konjunkturprogramm über Deregulierung statt Schulden finanzieren.'
  },
  'Lohnstückkosten': {
    e: 'Die nominalen Lohnstückkosten stiegen im Q4 2025 nur noch um +2,9 % ggü. Vorjahr — eine deutliche Abkühlung gegenüber dem Spitzenwert von +4,6 % in 2024. Die Wettbewerbsfähigkeit verbessert sich, liegt aber weiterhin über dem EU-Schnitt. Sinkende Inflation erleichtert moderatere KV-Abschlüsse.',
    vt: 'Lohnstückkostenwachstum Q4 2025',
    v: [{n:'Österreich',v:'+2,9 %',w:58,c:'bad'},{n:'Deutschland',v:'+2,5 %',w:50,c:'neu'},{n:'EU-Schnitt',v:'+2,3 %',w:46,c:'neu'},{n:'Polen',v:'+1,0 %',w:20,c:'good'}],
    b: 'Kollektivvertragsabschlüsse stärker an die Produktivitätsentwicklung koppeln. Digitalisierungsinvestitionen steuerlich begünstigen, um Produktivitätswachstum anzukurbeln. Den positiven Trend durch Strukturreformen (Arbeitszeitflexibilisierung, Qualifizierungsoffensive) verstetigen.'
  },
  'Bruttoanlageinvestitionen / Abschreibungen': {
    e: 'Die Investitionsquote ist auf 22,1 % gesunken und liegt unter dem EU-Schnitt. Wenn Investitionen die Abschreibungen nicht deutlich übersteigen, stagniert oder schrumpft der produktive Kapitalstock.',
    vt: 'Investitionsquote (% BIP)',
    v: [{n:'Österreich',v:'22,1 %',w:68,c:'bad'},{n:'EU-Schnitt',v:'23,8 %',w:73,c:''},{n:'Südkorea',v:'32,1 %',w:100,c:'good'}],
    b: 'Sofortabschreibung für Investitionen einführen. Öffentliche Investitionen auf produktive Infrastruktur (Breitband, Schienenausbau) konzentrieren. Regulierungshürden für private Investoren abbauen.'
  },
  'Industriestrompreis': {
    e: 'Österreich liegt mit 18,75 ct/kWh über dem EU-Schnitt von 15,1 ct/kWh — ein erheblicher Wettbewerbsnachteil für energieintensive Industrien wie Stahl, Chemie und Papier.',
    vt: 'Industriestrompreis (ct/kWh)',
    v: [{n:'Frankreich',v:'10,3',w:37,c:'good'},{n:'EU-Schnitt',v:'15,1',w:55,c:''},{n:'Österreich',v:'18,75',w:68,c:'bad'},{n:'Deutschland',v:'20,4',w:74,c:'bad'}],
    b: 'Netzentgelte reformieren und staatliche Energieabgaben schrittweise reduzieren. Langfristige Direktlieferverträge (PPAs) zwischen Produzenten und Industriekunden erleichtern. Erneuerbaren Ausbau beschleunigen.'
  },
  'Jugend-ALQ': {
    e: 'Die Jugendarbeitslosigkeit (15–24 J.) liegt leicht unter dem EU-Schnitt, aber strukturell erhöht. Betroffen: Schulabbrecher, Migranten der zweiten Generation, gering Qualifizierte.',
    vt: 'Jugend-ALQ (%, ILO, 2025)',
    v: [{n:'Deutschland',v:'6,2 %',w:33,c:'good'},{n:'Österreich',v:'11,1 %',w:59,c:'neu'},{n:'EU-Schnitt',v:'14,8 %',w:79,c:''},{n:'Spanien',v:'27,0 %',w:100,c:'bad'}],
    b: 'Lehrstellenförderung für KMU ausbauen. Schnittstelle Schule–Beruf mit Berufsorientierung ab der Mittelschule verbessern. AMS-Ressourcen auf NEET-Jugendliche konzentrieren (maßgeschneiderte Einstiegsprogramme).'
  },
  'Unselbst. Beschäftigte': {
    e: 'Leichtes Beschäftigungswachstum trotz Rezession — ein robustes Signal. Allerdings wächst Teilzeitbeschäftigung deutlich stärker als Vollzeit, was das gesamte Stundenvolumen drückt.',
    vt: 'Beschäftigte (Mio.)',
    v: [{n:'2020 (COVID)',v:'3,88 Mio.',w:79,c:'bad'},{n:'2022',v:'4,02 Mio.',w:82,c:''},{n:'2025',v:'4,09 Mio.',w:85,c:'good'}],
    b: 'Vollzeitarbeit steuerlich attraktiver machen (Übersteuenentlastung). Übergang von Teilzeit zu Vollzeit durch flächendeckenden Ausbau ganztägiger Kinderbetreuung strukturell erleichtern.'
  },
  'Arbeitslosenquote national': {
    e: 'Die nationale Definition (AMS) zählt alle vorgemerkten Arbeitslosen inklusive Schulungsteilnehmer. Mit 322.727 betroffenen Personen der höchste Wert seit Jahren. Frauen und ältere Arbeitnehmer überproportional betroffen.',
    vt: 'ALQ national (%) — März 2026',
    v: [{n:'2019 (prä-COVID)',v:'7,4 %',w:76,c:''},{n:'2022 (Tief)',v:'6,3 %',w:65,c:'good'},{n:'2026',v:'7,0 %',w:72,c:'bad'}],
    b: 'Zumutbarkeitsregeln im AMS an Marktbedarf anpassen. AMS-Schulungsangebote auf anerkannte Mangelberufe fokussieren. Eingliederungsbeihilfen für Langzeitarbeitslose ausbauen und Treffsicherheit erhöhen.'
  },
  'ALQ Eurostat (ILO)': {
    e: 'Die ILO-Definition (international vergleichbar) erfasst nur aktiv Arbeitssuchende. Österreich liegt knapp unter EU-Schnitt, aber deutlich über Deutschland und dem früheren österreichischen Bestwert.',
    vt: 'ALQ Eurostat/ILO (%, 2025)',
    v: [{n:'Deutschland',v:'3,4 %',w:34,c:'good'},{n:'Österreich',v:'5,8 %',w:58,c:''},{n:'EU-Schnitt',v:'6,0 %',w:60,c:''},{n:'Spanien',v:'11,4 %',w:100,c:'bad'}],
    b: 'Strukturelle Arbeitsmarktreformen priorisieren: Arbeitszeitflexibilisierung, niedrigere Lohnnebenkosten, bessere Weiterbildungssysteme. EU-Benchmarks als Zielgröße für nationale Arbeitsmarktpolitik nutzen.'
  },
  'Teilzeitquote': {
    e: 'Mit 29,2 % liegt Österreich deutlich über dem EU-Schnitt. Hauptbetroffene sind Frauen (48,9 %), besonders Mütter. Hohe Teilzeitquote senkt das Steuer- und Sozialversicherungsaufkommen.',
    vt: 'Teilzeitquote (%, gesamt)',
    v: [{n:'EU-Schnitt',v:'17,7 %',w:40,c:''},{n:'Österreich',v:'29,2 %',w:66,c:'bad'},{n:'Deutschland',v:'29,6 %',w:67,c:'bad'},{n:'Niederlande',v:'44,0 %',w:100,c:'bad'}],
    b: 'Rechtsanspruch auf ganztägige Kinderbetreuung ab 1 Jahr einführen. Steuerliche Benachteiligung von Zweitverdienern (Familienbonus) abschaffen. Pflegeurlaub und Elternzeit flexibler gestalten.'
  },
  'Steuerkeil (OECD)': {
    e: 'Der Steuerkeil misst die Differenz zwischen dem, was Arbeitgeber zahlen, und dem, was der Arbeitnehmer netto erhält. Mit 47,2 % liegt Österreich international im Spitzenfeld — nur Belgien und Deutschland sind höher.',
    vt: 'Steuerkeil (%, Durchschnittsverdiener)',
    v: [{n:'Schweiz',v:'22,0 %',w:35,c:'good'},{n:'OECD-Schnitt',v:'34,8 %',w:56,c:''},{n:'Österreich',v:'47,2 %',w:76,c:'bad'},{n:'Belgien',v:'52,7 %',w:85,c:'bad'}],
    b: 'Eingangssteuersatz und Dienstgeberbeiträge schrittweise senken — gegenfinanziert durch Ausgabenreformen, nicht Steuererhöhungen. Automatische Abschaffung der Kalten Progression dauerhaft verankern.'
  },
  'Arbeitskosten / Std.': {
    e: 'Mit 38,4 € pro Stunde liegt Österreich über dem EU-Schnitt (34,6 €). Die Kombination aus hohen Löhnen und überdurchschnittlichen Lohnnebenkosten belastet die Standortwettbewerbsfähigkeit.',
    vt: 'Arbeitskosten je Stunde (€, 2024)',
    v: [{n:'Slowakei',v:'16,3 €',w:24,c:'good'},{n:'EU-Schnitt',v:'34,6 €',w:51,c:''},{n:'Österreich',v:'38,4 €',w:57,c:'bad'},{n:'Luxemburg',v:'50,0 €',w:74,c:'bad'}],
    b: 'Dienstgeberbeiträge zur Sozialversicherung senken, um Lohnkostenbelastung zu reduzieren. Investitionen in betriebliche Weiterbildung steuerlich fördern, um Produktivitätswachstum nachhaltig anzuheben.'
  },
  'Faktisches Pensionsalter': {
    e: 'Das tatsächliche Pensionsantrittsalter liegt mit 61,4 Jahren weit unter dem gesetzlichen Ziel von 65 Jahren. Österreich hat eines der niedrigsten faktischen Pensionsalter in der EU, trotz offiziell hohem Pensionsalter.',
    vt: 'Faktisches Pensionsantrittsalter',
    v: [{n:'Österreich',v:'61,4 J.',w:63,c:'bad'},{n:'Deutschland',v:'63,8 J.',w:66,c:''},{n:'Schweden',v:'64,7 J.',w:67,c:'good'},{n:'Ziel AT',v:'65 J.',w:67,c:''}],
    b: 'Gesetzliches und faktisches Pensionsalter schrittweise auf 65 Jahre angleichen. Frühpensionsanreize (Korridorpension, Schwerarbeitspension) einschränken. Pensionsformel an steigende Lebenserwartung koppeln.'
  },
  'Geleistete Arbeitsstunden': {
    e: 'Das gesamte Arbeitsvolumen sinkt trotz wachsender Beschäftigtenzahl. Treiber: steigende Teilzeitquote und hoher Krankenstand (Österreich liegt EU-weit an der Spitze). Das verfügbare Arbeitsvolumen nimmt ab.',
    vt: 'Geleistete Arbeitsstunden (Mrd.)',
    v: [{n:'2019',v:'7,10 Mrd.',w:100,c:''},{n:'2022',v:'6,93 Mrd.',w:98,c:''},{n:'2024',v:'6,88 Mrd.',w:97,c:'bad'}],
    b: 'Jahresarbeitszeitmodelle ermöglichen, um Flexibilität ohne Mehrkosten zu schaffen. Krankenstandsreduktion durch betriebliche Gesundheitsförderung incentivieren. Überstundensteuer reformieren, Mehrarbeit attraktiver machen.'
  },
  'VPI / Inflation': {
    e: 'Deutliche Entspannung gegenüber den Hochpunkten 2022/23 (>10 %). Der Jahreswert 2025 liegt bei 3,6 % wegen starker früher Monate höher. EZB-Ziel: 2 % — noch nicht dauerhaft erreicht.',
    vt: 'VPI Inflation (%)',
    v: [{n:'EZB-Ziel',v:'2,0 %',w:44,c:'good'},{n:'Österreich (aktuell)',v:'2,2 %',w:48,c:'neu'},{n:'EU-Schnitt 2025',v:'2,3 %',w:50,c:''},{n:'AT Spitze 2022',v:'11,2 %',w:100,c:'bad'}],
    b: 'Wettbewerb in Lebensmittel- und Energiemärkten durch Marktöffnung stärken. Regulatorische Preistreiber (administrierte Gebühren, Netzentgelte) systematisch überprüfen und abbauen.'
  },
  'Reallöhne': {
    e: 'Nach zwei Jahren realer Lohnverluste (2022: −3,4 %, 2023: −1,2 %) wachsen die Reallöhne erstmals wieder. Die Kaufkraft erholt sich — ein Signal für stabilere Binnennachfrage.',
    vt: 'Reallohnwachstum (%)',
    v: [{n:'2022',v:'−3,4 %',w:20,c:'bad'},{n:'2023',v:'−1,2 %',w:30,c:'bad'},{n:'2024',v:'+0,8 %',w:50,c:'good'}],
    b: 'Kaufkraft strukturell durch Steuersenkungen stärken, nicht durch inflationstreibende Lohnrunden. Produktivitätsorientierte Lohnpolitik als Ziel in Kollektivverträgen verankern.'
  },
  'Immobilienpreisindex': {
    e: 'Nach einem Preisrückgang 2023/24 erholen sich Immobilienpreise wieder. EZB-Zinssenkungen stützen die Nachfrage. Strukturell bleiben Wohnkosten in Städten hoch und belasten Haushalte.',
    vt: 'Immopreisveränderung (%)',
    v: [{n:'2023 (Korrektur)',v:'−5,0 %',w:30,c:'bad'},{n:'2024',v:'+0,5 %',w:44,c:''},{n:'2025',v:'+3,7 %',w:60,c:'neu'}],
    b: 'Widmungs- und Bauverfahren vereinfachen, um Neubauvolumen zu erhöhen. Flächenmobilisierung durch Grundstücksbesteuerung von Brachflächen anreizen. Wohnbauförderung auf Neubau statt Bestandssubventionen lenken.'
  },
  'Mietentwicklung': {
    e: 'Mieten steigen weiterhin, aber moderat unter der Inflationsrate. Regulierte Richtwert- und Kategoriemieten steigen mit dem Verbraucherpreisindex. Freie Marktmieten wachsen in Wien und Graz deutlich stärker.',
    vt: 'Mietwachstum vs. Inflation (%)',
    v: [{n:'Mietentwicklung',v:'+3,0 %',w:55,c:'neu'},{n:'VPI Inflation',v:'+3,6 %',w:65,c:'bad'}],
    b: 'Mietpreisbremsen durch angebotsseitige Maßnahmen ersetzen: Neubauförderung, Baurechtsreform, schnellere Widmungsverfahren. Leerstand durch Abgaben mobilisieren. Gemeinnützige Bauträger mit mehr Eigenkapital ausstatten.'
  },
  'HVPI': {
    e: 'Der harmonisierte VPI (EU-Vergleichsmaß) liegt mit 3,1 % über dem EU-Ziel von 2 %. Österreich hatte im EU-Vergleich über längere Zeit eine höhere Inflation als der EU-Schnitt.',
    vt: 'HVPI Inflation (%, 2025)',
    v: [{n:'EZB-Ziel',v:'2,0 %',w:35,c:'good'},{n:'EU-Schnitt',v:'2,3 %',w:40,c:''},{n:'Österreich',v:'3,1 %',w:55,c:'bad'},{n:'Ungarn',v:'4,8 %',w:84,c:'bad'}],
    b: 'Wettbewerbsrecht stärken und Marktkonzentration in Lebensmittel- und Energiehandel überprüfen. Automatische Indexierungen in Kollektivverträgen dämpfen, um Inflationsspiralen zu vermeiden.'
  },
  'Energiepreise': {
    e: 'Deutliche Entlastung nach dem Energiepreisschock 2022/23. Sinkende Strom- und Gaspreise entlasten Haushalte und Industrie. Risiko: geopolitische Abhängigkeiten (Gas, Öl) bleiben strukturell bestehen.',
    vt: 'Energiepreise ggü. Vorjahr (%)',
    v: [{n:'2022 (Schock)',v:'+120 %',w:100,c:'bad'},{n:'2023',v:'+8 %',w:23,c:'bad'},{n:'2025',v:'−8,4 %',w:10,c:'good'}],
    b: 'Preisrückgang als Reformfenster nutzen: Energieeffizienzmaßnahmen im Gebäudesektor beschleunigen, fossile Importabhängigkeit reduzieren. Netzausbau für erneuerbare Energien priorisieren.'
  },
  'Staatsschuldenquote': {
    e: 'Trotz Rekordsteuereinnahmen steigt die Schuldenquote weiter, da die Ausgaben noch stärker wachsen. 2026 werden 84,7 % prognostiziert. Die EU-Maastricht-Grenze (60 %) wird um 24 Punkte überschritten.',
    vt: 'Staatsschuldenquote (% BIP)',
    v: [{n:'EU-Maastricht',v:'60 %',w:44,c:'good'},{n:'Deutschland',v:'62,9 %',w:46,c:'neu'},{n:'Österreich',v:'81,5 %',w:60,c:'bad'},{n:'Italien',v:'137,3 %',w:100,c:'bad'}],
    b: 'Schuldenquote mittelfristig auf EU-Maastricht-Niveau (60 % BIP) zurückführen. Ausgabenpfad gesetzlich an nominales Wirtschaftswachstum koppeln. Keine neuen Schulden für konsumtive Ausgaben — nur für produktive Investitionen.'
  },
  'Staatsdefizit': {
    e: 'Das Budgetdefizit von 4,2 % des BIP liegt klar über der EU-Maastricht-Grenze von 3 %. Die EU hat ein Defizitverfahren eingeleitet. Österreich muss einen Konsolidierungspfad vorlegen.',
    vt: 'Staatsdefizit (% BIP, 2024)',
    v: [{n:'Maastricht-Ziel',v:'3,0 %',w:53,c:'good'},{n:'Deutschland',v:'2,0 %',w:35,c:'good'},{n:'EU-Schnitt',v:'3,5 %',w:61,c:'bad'},{n:'Österreich',v:'4,2 %',w:74,c:'bad'}],
    b: 'Strukturelles Konsolidierungspaket von ~5–6 Mrd. € jährlich bis 2028 umsetzen — ausgabenseitig (Subventionsabbau, Verwaltungsreform), nicht durch Steuererhöhungen. EU-Defizitverfahren als Reformdruck nutzen.'
  },
  'Staatsquote': {
    e: 'Der Anteil der Staatsausgaben am BIP liegt mit 55,3 % im EU-Spitzenfeld. Eine hohe Staatsquote kann Effizienz der Ressourcenallokation senken und privates Investitionswachstum verdrängen.',
    vt: 'Staatsquote (% BIP)',
    v: [{n:'Schweiz',v:'35,2 %',w:37,c:'good'},{n:'EU-Schnitt',v:'49,8 %',w:52,c:''},{n:'Österreich',v:'55,3 %',w:58,c:'bad'},{n:'Frankreich',v:'58,0 %',w:61,c:'bad'}],
    b: 'Spending Reviews für alle Ressorts einführen. Ausgabenwachstum dauerhaft unter nominalem BIP-Wachstum halten. Alle Subventionen und Förderungen auf messbare Wirkung prüfen und unwirksame abschaffen.'
  },
  'Abgabenquote': {
    e: 'Mit 44,3 % Steuern und Abgaben am BIP liegt Österreich im obersten OECD-Quartil. Hohe Abgaben finanzieren den Wohlfahrtsstaat, belasten aber Wettbewerbsfähigkeit und Investitionsanreize.',
    vt: 'Abgabenquote (% BIP)',
    v: [{n:'OECD-Schnitt',v:'34,1 %',w:55,c:''},{n:'EU-Schnitt',v:'40,8 %',w:65,c:''},{n:'Österreich',v:'44,3 %',w:71,c:'bad'},{n:'Frankreich',v:'47,1 %',w:75,c:'bad'}],
    b: 'Steuerstrukturreform: Arbeit entlasten (Lohnnebenkosten), dafür Konsum maßvoll stärker belasten (Ökosteuern). Kalte Progression dauerhaft abschaffen. Gegenfinanzierung über Ausgabenreformen sicherstellen.'
  },
  'Zinsausgaben': {
    e: 'Durch die Zinswende 2022–2024 sind die Zinsausgaben von 1,5 % (2021) auf 2,8 % des BIP gestiegen — rund 10 Mrd. € jährlich. Jede Schuldenerhöhung verstärkt diesen Effekt.',
    vt: 'Zinsausgaben (% BIP)',
    v: [{n:'2021 (Tief)',v:'1,5 %',w:39,c:'good'},{n:'2023',v:'2,2 %',w:57,c:'neu'},{n:'2025',v:'2,8 %',w:73,c:'bad'}],
    b: 'Schuldenabbau priorisieren, um Zinslast langfristig zu senken. Zinspuffer von mindestens 0,5 % des BIP im Budgetplan einplanen. Keine Neuverschuldung für laufende Ausgaben — Zinslastanstieg ist irreversibel.'
  },
  'Pensionslücke': {
    e: 'Der staatliche Zuschuss zum Pensionssystem beträgt ~14 Mrd. € jährlich und wächst. Hauptursachen: früher Pensionsantritt (61,4 J.), Alterung, niedrige Vollzeitquote bei Frauen. Ohne Reformen drohen bis 2030 über 20 Mrd. €.',
    vt: 'Jährl. Pensionszuschuss (Mrd. €)',
    v: [{n:'2010',v:'8 Mrd.',w:40,c:''},{n:'2020',v:'11 Mrd.',w:55,c:''},{n:'2024',v:'14 Mrd.',w:70,c:'bad'},{n:'Prognose 2030',v:'>20 Mrd.',w:100,c:'bad'}],
    b: 'Faktisches Pensionsalter durch Abschaffung der Korridorpension auf 63+ anheben. Pensionsformel an Lebenserwartung koppeln. Vollzeitquote bei Frauen durch Kinderbetreuungsausbau erhöhen — schließt langfristig die Lücke.'
  },
  'Sozialquote': {
    e: 'Sozialausgaben machen 30,5 % des BIP aus — leicht über EU-Schnitt. Pensionen allein machen rund 15 % des BIP aus und dominieren den Sozialbereich. Der demographische Wandel erhöht den Druck weiter.',
    vt: 'Sozialquote (% BIP)',
    v: [{n:'OECD-Schnitt',v:'21,0 %',w:50,c:''},{n:'EU-Schnitt',v:'28,1 %',w:67,c:''},{n:'Schweden',v:'30,3 %',w:72,c:''},{n:'Österreich',v:'30,5 %',w:73,c:'bad'}],
    b: 'Sozialleistungen auf Treffsicherheit überprüfen. Transferentzugsraten senken, um Erwerbsaufnahme zu incentivieren. Pflege durch Qualitätswettbewerb und mehr private Anbieter effizienter gestalten.'
  },
  'Staatseinnahmen': {
    e: 'Trotz Rekordsteuereinnahmen bleibt das Defizit hoch, weil die Ausgaben noch stärker wachsen. Eine Einnahmenquote von 51,1 % des BIP zeigt, dass das Budgetproblem ausgabenseitig ist.',
    vt: 'Staatseinnahmen (% BIP)',
    v: [{n:'OECD-Schnitt',v:'38,5 %',w:56,c:''},{n:'EU-Schnitt',v:'46,3 %',w:67,c:''},{n:'Österreich',v:'51,1 %',w:74,c:'bad'},{n:'Frankreich',v:'53,8 %',w:78,c:'bad'}],
    b: 'Das Defizit ist ein Ausgabenproblem, kein Einnahmenproblem. Steuererhöhungen ablehnen. Stattdessen: Verwaltungsreform, Föderalismusreform (Aufgabenentflechtung) und Subventionsabbau umsetzen.'
  },
  'Budgetvollzug': {
    e: 'Einnahmen 107,1 Mrd. €, Ausgaben 121,5 Mrd. € — ein strukturelles Defizit von 14,4 Mrd. €. Das EU-Defizitverfahren ist eingeleitet. Österreich muss bis 2028 auf unter 3 % des BIP konsolidieren.',
    vt: 'Budget 2024 (Mrd. €)',
    v: [{n:'Einnahmen',v:'107,1 Mrd.',w:72,c:''},{n:'Ausgaben',v:'121,5 Mrd.',w:82,c:'bad'},{n:'Defizit',v:'−14,4 Mrd.',w:10,c:'bad'}],
    b: 'Monatlichen Budgetvollzug transparenter kommunizieren und ressortweise Ausgabenobergrenzen einführen. Nachtragsbudgets auf echte Notfälle beschränken. EU-Defizitverfahren als verbindlichen Konsolidierungsplan nutzen.'
  },
  'Staatsausgaben': {
    e: 'Mit 267 Mrd. € (55,2 % des BIP) liegt Österreich im EU-Spitzenfeld. Größte Posten: Soziales (~38 %), Gesundheit (~15 %), allgemeine öffentliche Verwaltung (~14 %). Die Ausgaben wachsen trotz Sparanforderungen.',
    vt: 'Staatsausgabenquote (% BIP)',
    v: [{n:'Schweiz',v:'35,2 %',w:37,c:'good'},{n:'EU-Schnitt',v:'49,8 %',w:52,c:''},{n:'Österreich',v:'55,2 %',w:58,c:'bad'},{n:'Frankreich',v:'58,0 %',w:61,c:'bad'}],
    b: 'Ausgabenwachstum auf unter 2 % p.a. begrenzen. Sozial- und Pensionsausgaben auf Effizienz prüfen. Bildungs- und Infrastrukturinvestitionen schützen und erhöhen — sie zahlen sich volkswirtschaftlich aus.'
  }
};

function buildPanel(label) {
  var d = D[label];
  if (!d) return null;
  var bars = '';
  if (d.v && d.v.length) {
    d.v.forEach(function(item) {
      bars += '<div class="kep-bar-row">' +
        '<span class="kep-bar-name">' + item.n + '</span>' +
        '<div class="kep-bar-track"><div class="kep-bar-fill ' + (item.c||'') + '" style="width:' + item.w + '%"></div></div>' +
        '<span class="kep-bar-val ' + (item.c==='bad'?'bad':item.c==='good'?'good':'') + '">' + item.v + '</span>' +
        '</div>';
    });
  }
  return '<div>' +
      '<div class="kep-title">Einordnung</div>' +
      '<div class="kep-text">' + d.e + '</div>' +
    '</div>' +
    '<div>' +
      '<div class="kep-title">' + (d.vt||'Vergleich') + '</div>' +
      bars +
    '</div>' +
    '<div>' +
      '<div class="kep-title">Handlungsempfehlung</div>' +
      '<div class="kep-text">' + d.b + '</div>' +
    '</div>';
}

var _init = false;
function initExpand() {
  if (_init) return;
  _init = true;
  document.querySelectorAll('.kpi-card').forEach(function(card) {
    var btn = document.createElement('button');
    btn.className = 'kep-close';
    btn.setAttribute('aria-label', 'Schließen');
    btn.innerHTML = '&#x2715;';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      collapse(card);
    });
    card.appendChild(btn);

    var panel = document.createElement('div');
    panel.className = 'kpi-expand-panel';
    card.appendChild(panel);

    card.addEventListener('click', function() {
      if (card.classList.contains('expanded')) return;
      var lbl = card.querySelector('.kpi-label');
      if (!lbl) return;
      var html = buildPanel(lbl.textContent.trim());
      if (!html) return;
      document.querySelectorAll('.kpi-card.expanded').forEach(function(c){ collapse(c); });
      panel.innerHTML = html;
      card.classList.add('expanded');
      setTimeout(function(){
        card.scrollIntoView({behavior:'smooth', block:'nearest'});
      }, 50);
    });
  });
}

function collapse(card) {
  card.classList.remove('expanded');
  var p = card.querySelector('.kpi-expand-panel');
  if (p) p.innerHTML = '';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExpand);
} else {
  initExpand();
}

})();
