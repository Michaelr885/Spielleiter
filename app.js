/**
 * Spielleiter – Controller
 * State Machine, UI-Sync und Persistenz
 */

const STORAGE_KEY = 'spielleiter_gameState';

const GAME_PHASES = [
  { id: 'event', label: 'Ereignisphase' },
  { id: 'morale', label: 'Moralphase' },
  { id: 'production', label: 'Produktionsphase' },
  { id: 'action', label: 'Aktionsphase' },
  { id: 'weather', label: 'Wetterphase' },
  { id: 'night', label: 'Nachtphase' },
];

/** @type {object} Globaler Spielstand */
let gameState = createDefaultGameState();

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/**
 * Frischer Spielstand (Hauptmenü).
 * @returns {object}
 */
function createDefaultGameState() {
  return {
    phase: 'menu',
    round: 1,
    currentScenario: null,
    scenarioName: '',
    maxRounds: 12,
    resources: {
      wood: 0,
      food: 0,
      fur: 0,
    },
    camp: {
      roof: 0,
      palisade: 0,
      weapon: 0,
    },
    morale: 0,
    scenarioRuntime: null,
  };
}

/**
 * Szenario anhand Schlüssel (schiffbruechig) oder numerischer ID (1–7) finden.
 * @param {string|number} scenarioId
 * @returns {object|undefined}
 */
function resolveScenario(scenarioId) {
  if (scenarioId == null) return undefined;

  const asNumber = Number(scenarioId);
  if (!Number.isNaN(asNumber) && String(scenarioId).match(/^\d+$/)) {
    return SCENARIO_LIST.find((s) => s.id === asNumber);
  }

  return getScenario(String(scenarioId));
}

/**
 * Partie starten: Szenario laden, Ansicht wechseln, speichern.
 * @param {string|number} scenarioId
 */
function startGame(scenarioId) {
  const scenario = resolveScenario(scenarioId);
  if (!scenario) {
    console.error('Unbekanntes Szenario:', scenarioId);
    return;
  }

  const runtime = createInitialGameState(scenario.key);

  gameState = {
    ...createDefaultGameState(),
    phase: 'morale',
    round: 1,
    currentScenario: scenario.key,
    scenarioName: scenario.name,
    maxRounds: scenario.maxRounds,
    scenarioRuntime: runtime.scenarioRuntime,
  };
  syncGlobalState();

  showDashboard();
  updateUI();
  saveGameState();
}

/**
 * Hauptmenü anzeigen, Dashboard ausblenden.
 */

function syncGlobalState() {
  if (typeof window !== 'undefined') {
    window.gameState = gameState;
  }
}

function showMenu() {
  $('#main-menu')?.classList.add('view--active');
  $('#game-dashboard')?.classList.remove('view--active');
}

/**
 * Dashboard anzeigen, Hauptmenü ausblenden.
 */
function showDashboard() {
  $('#main-menu')?.classList.remove('view--active');
  $('#game-dashboard')?.classList.add('view--active');
}

/**
 * DOM anhand von gameState aktualisieren.
 */
function updateUI() {
  if (gameState.phase === 'menu') {
    showMenu();
    return;
  }

  showDashboard();

  $('#dash-scenario-name').textContent = gameState.scenarioName || '—';
  $('#dash-round').textContent = String(gameState.round);
  $('#dash-phase').textContent = getPhaseLabel(gameState.phase);

  setTrackerDisplay('wood', gameState.resources.wood);
  setTrackerDisplay('food', gameState.resources.food);
  setTrackerDisplay('fur', gameState.resources.fur);
  setTrackerDisplay('roof', gameState.camp.roof);
  setTrackerDisplay('palisade', gameState.camp.palisade);
  setTrackerDisplay('weapon', gameState.camp.weapon);
  setTrackerDisplay('morale', gameState.morale);
}

/**
 * @param {string} key
 * @param {number} value
 */
function setTrackerDisplay(key, value) {
  const el = $(`#val-${key}`);
  if (el) el.textContent = String(value);
}

/**
 * @param {string} phaseId
 * @returns {string}
 */
function getPhaseLabel(phaseId) {
  if (phaseId === 'menu') return 'Hauptmenü';
  return GAME_PHASES.find((p) => p.id === phaseId)?.label ?? phaseId;
}

/**
 * Ressource oder Stärke per Tracker-Key anpassen.
 * @param {string} key
 * @param {number} delta
 */
function adjustResource(key, delta) {
  if (gameState.phase === 'menu') return;

  if (key === 'morale') {
    gameState.morale += delta;
  } else if (key in gameState.resources) {
    gameState.resources[key] = Math.max(0, gameState.resources[key] + delta);
  } else if (key in gameState.camp) {
    gameState.camp[key] = Math.max(0, gameState.camp[key] + delta);
  } else {
    return;
  }

  updateUI();
  saveGameState();
}

/**
 * Nächste Spielphase (Runden-Ende → neue Runde).
 */
function nextPhase() {
  if (gameState.phase === 'menu') return;

  const idx = GAME_PHASES.findIndex((p) => p.id === gameState.phase);
  let nextIdx = idx + 1;

  if (nextIdx >= GAME_PHASES.length) {
    const maxRounds = gameState.maxRounds ?? 12;
    if (gameState.round >= maxRounds) {
      saveGameState();
      return;
    }

    gameState.round += 1;
    nextIdx = gameState.round === 1
      ? GAME_PHASES.findIndex((p) => p.id === 'morale')
      : 0;
  }

  if (gameState.round === 1 && GAME_PHASES[nextIdx]?.id === 'event') {
    nextIdx = GAME_PHASES.findIndex((p) => p.id === 'morale');
  }

  gameState.phase = GAME_PHASES[nextIdx].id;
  updateUI();
  saveGameState();
}

/**
 * gameState in localStorage speichern.
 */
function saveGameState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (err) {
    console.error('Speichern fehlgeschlagen:', err);
  }
}

/**
 * gameState aus localStorage laden und mit Defaults mergen.
 * @returns {boolean} true wenn ein Stand geladen wurde
 */
function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const saved = JSON.parse(raw);
    gameState = mergeWithDefaults(saved);
    return true;
  } catch (err) {
    console.error('Laden fehlgeschlagen:', err);
    return false;
  }
}

/**
 * Gespeicherten Stand mit Default-Struktur abgleichen.
 * @param {object} saved
 * @returns {object}
 */
function mergeWithDefaults(saved) {
  const defaults = createDefaultGameState();
  return {
    ...defaults,
    ...saved,
    resources: { ...defaults.resources, ...(saved.resources || {}) },
    camp: { ...defaults.camp, ...(saved.camp || {}) },
  };
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
    btn.setAttribute('role', 'listitem');

    btn.innerHTML = `
      <span class="btn-scenario__name">${scenario.name}</span>
      <span class="btn-scenario__meta">${scenario.maxRounds} Runden · Schwierigkeit ${scenario.difficulty}${scenario.isExpansion ? ' · Zusatz' : ''}</span>
      <span class="btn-scenario__desc">${scenario.description}</span>
    `;

    btn.addEventListener('click', () => startGame(scenario.key));
    container.appendChild(btn);
  });
}

function bindEvents() {
  $$('.tracker').forEach((row) => {
    const key = row.dataset.track;
    if (!key) return;

    row.querySelectorAll('.btn-counter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = btn.dataset.action === 'inc' ? 1 : -1;
        adjustResource(key, delta);
      });
    });
  });

  $('#btn-next-phase')?.addEventListener('click', nextPhase);
}

function init() {
  renderScenarioButtons();
  bindEvents();

  if (loadGameState()) {
    syncGlobalState();
    updateUI();
  } else {
    gameState = createDefaultGameState();
    syncGlobalState();
    updateUI();
  }
}

document.addEventListener('DOMContentLoaded', init);

if (typeof window !== 'undefined') {
  window.startGame = startGame;
  window.updateUI = updateUI;
  window.saveGameState = saveGameState;
  window.loadGameState = loadGameState;
  syncGlobalState();
}
