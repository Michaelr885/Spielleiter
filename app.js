/**
 * Spielleiter – App-Steuerung (UI-Schicht)
 * Geschäftslogik und State Machine werden hier schrittweise erweitert.
 */

const STORAGE_KEY = 'spielleiter_save';

/** @type {'menu' | 'playing'} */
let appState = 'menu';

/** @type {object|null} */
let gameState = null;

const PHASES = [
  { id: 'event', label: 'Ereignisphase' },
  { id: 'morale', label: 'Moralphase' },
  { id: 'production', label: 'Produktionsphase' },
  { id: 'action', label: 'Aktionsphase' },
  { id: 'weather', label: 'Wetterphase' },
  { id: 'night', label: 'Nachtphase' },
];

const TRACKER_KEYS = ['wood', 'food', 'fur', 'roof', 'palisade', 'weapon', 'morale'];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveGame() {
  if (!gameState) return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ appState, gameState })
  );
}

function getPhaseLabel(phaseId) {
  return PHASES.find((p) => p.id === phaseId)?.label ?? phaseId;
}

function defaultTrackers() {
  return {
    wood: 0,
    food: 0,
    fur: 0,
    roof: 0,
    palisade: 0,
    weapon: 0,
    morale: 0,
  };
}

function mergeGameState(base) {
  return {
    ...base,
    trackers: { ...defaultTrackers(), ...(base.trackers || {}) },
  };
}

function setView(viewName) {
  const menu = $('#main-menu');
  const dashboard = $('#game-dashboard');

  if (viewName === 'menu') {
    menu.classList.add('view--active');
    dashboard.classList.remove('view--active');
  } else {
    menu.classList.remove('view--active');
    dashboard.classList.add('view--active');
  }
}

function renderScenarioButtons() {
  const container = $('#scenario-list');
  if (!container || typeof SCENARIO_LIST === 'undefined') return;

  container.innerHTML = '';

  SCENARIO_LIST.forEach((scenario) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-scenario';
    if (scenario.isExpansion) btn.classList.add('btn-scenario--expansion');
    btn.dataset.scenarioKey = scenario.key;
    btn.setAttribute('role', 'listitem');

    btn.innerHTML = `
      <span class="btn-scenario__name">${scenario.name}</span>
      <span class="btn-scenario__meta">${scenario.maxRounds} Runden · Schwierigkeit ${scenario.difficulty}${scenario.isExpansion ? ' · Zusatz' : ''}</span>
      <span class="btn-scenario__desc">${scenario.description}</span>
    `;

    btn.addEventListener('click', () => startScenario(scenario.key));
    container.appendChild(btn);
  });
}

function startScenario(scenarioKey) {
  const base = createInitialGameState(scenarioKey);
  const scenario = getScenario(scenarioKey);

  gameState = mergeGameState({
    ...base,
    phase: base.round === 1 ? 'morale' : 'event',
    trackers: defaultTrackers(),
    scenarioName: scenario.name,
    maxRounds: scenario.maxRounds,
  });

  appState = 'playing';
  setView('playing');
  updateDashboard();
  saveGame();
}

function updateDashboard() {
  if (!gameState) return;

  const scenario = getScenario(gameState.currentScenario);
  $('#dash-scenario-name').textContent =
    gameState.scenarioName || scenario?.name || '—';
  $('#dash-round').textContent = String(gameState.round);
  $('#dash-phase').textContent = getPhaseLabel(gameState.phase);

  TRACKER_KEYS.forEach((key) => {
    const el = $(`#val-${key}`);
    if (el) el.textContent = String(gameState.trackers[key] ?? 0);
  });
}

function adjustTracker(key, delta) {
  if (!gameState?.trackers) return;
  const next = (gameState.trackers[key] ?? 0) + delta;
  gameState.trackers[key] = Math.max(0, next);
  updateDashboard();
  saveGame();
}

function nextPhase() {
  if (!gameState) return;

  const idx = PHASES.findIndex((p) => p.id === gameState.phase);
  let nextIdx = idx + 1;

  if (nextIdx >= PHASES.length) {
    gameState.round += 1;
    const max = gameState.maxRounds ?? getScenario(gameState.currentScenario)?.maxRounds ?? 12;
    if (gameState.round > max) {
      gameState.round = max;
      saveGame();
      return;
    }
    nextIdx = gameState.round === 1 ? PHASES.findIndex((p) => p.id === 'morale') : 0;
  }

  if (gameState.round === 1 && PHASES[nextIdx]?.id === 'event') {
    nextIdx = PHASES.findIndex((p) => p.id === 'morale');
  }

  gameState.phase = PHASES[nextIdx].id;
  updateDashboard();
  saveGame();
}

function bindEvents() {
  $$('.tracker').forEach((row) => {
    const key = row.dataset.track;
    if (!key) return;

    row.querySelectorAll('.btn-counter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = btn.dataset.action === 'inc' ? 1 : -1;
        adjustTracker(key, delta);
      });
    });
  });

  $('#btn-next-phase')?.addEventListener('click', nextPhase);
}

function init() {
  renderScenarioButtons();
  bindEvents();

  const saved = loadSave();
  if (saved?.appState === 'playing' && saved.gameState?.currentScenario) {
    appState = saved.appState;
    gameState = mergeGameState(saved.gameState);
    setView('playing');
    updateDashboard();
  } else {
    appState = 'menu';
    gameState = null;
    setView('menu');
  }
}

document.addEventListener('DOMContentLoaded', init);
