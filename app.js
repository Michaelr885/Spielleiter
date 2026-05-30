/**
 * Spielleiter – Controller
 * State Machine, PhaseManager, UI-Sync und Persistenz
 */

const STORAGE_KEY = 'spielleiter_gameState';

/** @type {object} Globaler Spielstand */
let gameState = createDefaultGameState();

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/**
 * Phasen-Reihenfolge (Anzeigenamen wie am Tisch).
 * Interne IDs für gameState.phase in Klammern.
 */
const PHASE_MANAGER = {
  phases: [
    { name: 'Ereignisphase', id: 'event' },
    { name: 'Moralphase', id: 'morale' },
    { name: 'Produktionsphase', id: 'production' },
    { name: 'Aktionsphase', id: 'action' },
    { name: 'Wetterphase', id: 'weather' },
    { name: 'Nachtphase', id: 'night' },
  ],

  /** Nur die Anzeigenamen */
  get phaseNames() {
    return this.phases.map((p) => p.name);
  },

  getIndexById(phaseId) {
    return this.phases.findIndex((p) => p.id === phaseId);
  },

  getNameById(phaseId) {
    return this.phases.find((p) => p.id === phaseId)?.name ?? phaseId;
  },

  /**
   * Nächste Phase – wird vom Button „Nächste Phase“ aufgerufen.
   */
  goToNextPhase() {
    if (gameState.phase === 'menu') return;

    const currentId = gameState.phase;

    if (currentId === 'night') {
      this.endNightAndStartNewRound();
      return;
    }

    let nextIndex = this.getIndexById(currentId) + 1;
    if (nextIndex >= this.phases.length) {
      nextIndex = 0;
    }

    if (gameState.round === 1 && this.phases[nextIndex].id === 'event') {
      nextIndex = this.getIndexById('morale');
    }

    gameState.phase = this.phases[nextIndex].id;
    this.onEnterPhase(gameState.phase);
    updateUI();
    saveGameState();
  },

  endNightAndStartNewRound() {
    const maxRounds = gameState.maxRounds ?? 12;

    if (gameState.round >= maxRounds) {
      showModal({
        title: 'Rundenlimit',
        body: `Runde ${maxRounds} ist erreicht. Das Szenario endet – prüft die Siegbedingungen.`,
        buttons: [{ label: 'Verstanden', primary: true }],
      });
      saveGameState();
      return;
    }

    gameState.round += 1;
    gameState.phase = 'event';
    this.onEnterPhase('event');
    updateUI();
    saveGameState();
  },

  /**
   * Automatische Checks beim Betreten einer Phase.
   * @param {string} phaseId
   */
  onEnterPhase(phaseId) {
    switch (phaseId) {
      case 'morale':
        this.handleMoralePhaseEnter();
        break;
      case 'production':
        this.handleProductionPhaseEnter();
        break;
      case 'night':
        this.handleNightPhaseEnter();
        break;
      case 'event':
        if (gameState.round > 1) {
          showModal({
            title: 'Ereignisphase',
            body: 'Zieht die oberste Ereigniskarte und führt das Sofortige Ereignis am Tisch aus.',
            buttons: [{ label: 'Erledigt', primary: true }],
          });
        }
        break;
      default:
        break;
    }
  },

  handleMoralePhaseEnter() {
    const moral = gameState.morale;

    if (moral < 0) {
      const amount = Math.min(3, Math.abs(moral));
      showModal({
        title: 'Moralphase',
        body: `Du musst ${amount} Entschlossenheitsplättchen abgeben. Ziehe sie manuell ab oder trage dir Wunden ein.`,
        buttons: [{ label: 'Verstanden', primary: true }],
      });
      return;
    }

    if (moral > 0) {
      const amount = moral >= 2 ? 2 : 1;
      showModal({
        title: 'Moralphase',
        body: `Du erhältst ${amount} Entschlossenheitsplättchen.`,
        buttons: [{ label: 'Verstanden', primary: true }],
      });
      return;
    }

    showModal({
      title: 'Moralphase',
      body: 'Die Moral steht auf neutral (0). Keine Plättchen für den Startspieler.',
      buttons: [{ label: 'Weiter', primary: true }],
    });
  },

  handleProductionPhaseEnter() {
    const body = document.createElement('div');
    body.innerHTML = `
      <p>Welche Ressourcen produziert dein aktuelles Lager-Inselteil?</p>
      <p class="modal__hint">Tippe die Buttons – die Werte werden im Tracker links aktualisiert.</p>
    `;

    showModal({
      title: 'Produktionsphase',
      bodyEl: body,
      buttons: [
        {
          label: '+ Holz',
          className: 'btn-modal--resource',
          onClick: () => {
            gameState.resources.wood += 1;
            updateUI();
            saveGameState();
          },
        },
        {
          label: '+ Nahrung',
          className: 'btn-modal--resource',
          onClick: () => {
            gameState.resources.food += 1;
            updateUI();
            saveGameState();
          },
        },
        { label: 'Fertig', primary: true },
      ],
      stackActions: true,
    });
  },

  handleNightPhaseEnter() {
    const nahrung = gameState.resources.food;
    const spieler = gameState.playerCount;

    if (nahrung >= spieler) {
      gameState.resources.food -= spieler;
      syncGlobalState();
      updateUI();
      showModal({
        title: 'Nachtphase',
        body: `${spieler} Nahrung wurde abgezogen (${gameState.resources.food} verbleibend). Jeder Charakter isst.`,
        buttons: [{ label: 'Weiter', primary: true }],
      });
      saveGameState();
      return;
    }

    showModal({
      title: 'Nachtphase – Warnung',
      body: `Zu wenig Nahrung! (${nahrung}/${spieler} verfügbar). Trage Wunden für hungernde Spieler ein.`,
      buttons: [{ label: 'Verstanden', primary: true, warn: true }],
    });
  },
};

/** Öffentliches Array der Phasennamen (laut Anforderung) */
const PHASE_NAMES = PHASE_MANAGER.phaseNames;

function createDefaultGameState() {
  return {
    phase: 'menu',
    round: 1,
    currentScenario: null,
    scenarioName: '',
    maxRounds: 12,
    playerCount: 4,
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

function resolveScenario(scenarioId) {
  if (scenarioId == null) return undefined;

  const asNumber = Number(scenarioId);
  if (!Number.isNaN(asNumber) && String(scenarioId).match(/^\d+$/)) {
    return SCENARIO_LIST.find((s) => s.id === asNumber);
  }

  return getScenario(String(scenarioId));
}

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
  PHASE_MANAGER.onEnterPhase('morale');
  saveGameState();
}

function syncGlobalState() {
  if (typeof window !== 'undefined') {
    window.gameState = gameState;
  }
}

function showMenu() {
  $('#main-menu')?.classList.add('view--active');
  $('#game-dashboard')?.classList.remove('view--active');
}

function showDashboard() {
  $('#main-menu')?.classList.remove('view--active');
  $('#game-dashboard')?.classList.add('view--active');
}

function updateUI() {
  if (gameState.phase === 'menu') {
    showMenu();
    return;
  }

  showDashboard();

  $('#dash-scenario-name').textContent = gameState.scenarioName || '—';
  $('#dash-round').textContent = String(gameState.round);
  $('#dash-phase').textContent = PHASE_MANAGER.getNameById(gameState.phase);

  setTrackerDisplay('wood', gameState.resources.wood);
  setTrackerDisplay('food', gameState.resources.food);
  setTrackerDisplay('fur', gameState.resources.fur);
  setTrackerDisplay('roof', gameState.camp.roof);
  setTrackerDisplay('palisade', gameState.camp.palisade);
  setTrackerDisplay('weapon', gameState.camp.weapon);
  setTrackerDisplay('morale', gameState.morale);

  const playersEl = $('#val-players');
  if (playersEl) playersEl.textContent = String(gameState.playerCount);
}

function setTrackerDisplay(key, value) {
  const el = $(`#val-${key}`);
  if (el) el.textContent = String(value);
}

function adjustResource(key, delta) {
  if (gameState.phase === 'menu') return;

  if (key === 'morale') {
    gameState.morale += delta;
  } else if (key in gameState.resources) {
    gameState.resources[key] = Math.max(0, gameState.resources[key] + delta);
  } else if (key in gameState.camp) {
    gameState.camp[key] = Math.max(0, gameState.camp[key] + delta);
  } else if (key === 'players') {
    gameState.playerCount = Math.max(1, Math.min(4, gameState.playerCount + delta));
  } else {
    return;
  }

  syncGlobalState();
  updateUI();
  saveGameState();
}

/**
 * Button „Nächste Phase“ – delegiert an PhaseManager.
 */
function nextPhase() {
  PHASE_MANAGER.goToNextPhase();
}

/**
 * @param {object} options
 * @param {string} options.title
 * @param {string} [options.body]
 * @param {HTMLElement} [options.bodyEl]
 * @param {Array<{label: string, primary?: boolean, warn?: boolean, className?: string, onClick?: function}>} options.buttons
 * @param {boolean} [options.stackActions]
 */
function showModal({ title, body, bodyEl, buttons = [], stackActions = false }) {
  const root = $('#modal-root');
  const titleEl = $('#modal-title');
  const bodyContainer = $('#modal-body');
  const actionsEl = $('#modal-actions');

  if (!root || !titleEl || !bodyContainer || !actionsEl) return;

  titleEl.textContent = title;
  bodyContainer.innerHTML = '';
  if (bodyEl) {
    bodyContainer.appendChild(bodyEl);
  } else {
    bodyContainer.innerHTML = `<p>${body ?? ''}</p>`;
  }

  actionsEl.innerHTML = '';
  actionsEl.classList.toggle('modal__actions--stack', stackActions);

  buttons.forEach((btn) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.textContent = btn.label;
    el.className = 'btn-modal';
    if (btn.primary) el.classList.add('btn-modal--primary');
    if (btn.warn) el.classList.add('btn-modal--warn');
    if (btn.className) el.classList.add(btn.className);
    el.addEventListener('click', () => {
      if (btn.onClick) btn.onClick();
      if (btn.close !== false) hideModal();
    });
    actionsEl.appendChild(el);
  });

  root.hidden = false;
  root.setAttribute('aria-hidden', 'false');
}

function hideModal() {
  const root = $('#modal-root');
  if (!root) return;
  root.hidden = true;
  root.setAttribute('aria-hidden', 'true');
}

function saveGameState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    syncGlobalState();
  } catch (err) {
    console.error('Speichern fehlgeschlagen:', err);
  }
}

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

  $('#btn-players-inc')?.addEventListener('click', () => adjustResource('players', 1));
  $('#btn-players-dec')?.addEventListener('click', () => adjustResource('players', -1));
  $('#btn-next-phase')?.addEventListener('click', nextPhase);

  $$('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', hideModal);
  });
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
  window.PHASE_NAMES = PHASE_NAMES;
  window.PHASE_MANAGER = PHASE_MANAGER;
  window.startGame = startGame;
  window.updateUI = updateUI;
  window.nextPhase = nextPhase;
  window.saveGameState = saveGameState;
  window.loadGameState = loadGameState;
  window.showModal = showModal;
  window.hideModal = hideModal;
  syncGlobalState();
}
