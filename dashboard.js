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
        var displayValue = q.wert_faktor ? latest.value * q.wert_faktor : latest.value;
        var formatted = formatNumberAT(displayValue, q.dezimal != null ? q.dezimal : 1)
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

var D = (typeof PANEL_TEXTE !== 'undefined') ? PANEL_TEXTE : {};

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
