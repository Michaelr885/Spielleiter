/**
 * Szenario-Datenbank für die Spielleiter-App (Robinson Crusoe).
 * Regeldetails: szenarien_regeln/*.md | phasen.md | aktionen.md
 *
 * Wetter-Schlüssel: rain = Regenwürfel, winter = Winterwürfel, beast = Tierwürfel (rot)
 */
const SCENARIOS = {
  schiffbruechig: {
    id: 1,
    key: 'schiffbruechig',
    name: 'Schiffbrüchig',
    description:
      'Einstiegsszenario: Ein Leuchtfeuer aus Holz errichten und bis zur Schiffs-Ankunft in den Runden 10–12 überleben. Buch- und Totem-Symbole haben keine Wirkung.',
    difficulty: 1,
    maxRounds: 12,
    rulesFile: 'szenarien_regeln/szenario_1_schiffbruechig.md',
    eventCardsPerDeck: 6,
    setup: {
      startIslandTile: 8,
      startItems: 'random_2',
      ignoreBookSymbol: true,
      ignoreTotemSymbol: true,
    },
    startWeather: [
      { fromRound: 1, toRound: 3, dice: [] },
      { fromRound: 4, toRound: 6, dice: ['rain'] },
      { fromRound: 7, toRound: 12, dice: ['rain', 'winter', 'beast'] },
    ],
    specialInventions: [
      { id: 'beil', name: 'Beil', type: 'invention', repeatable: false },
      { id: 'mast', name: 'Mast', type: 'invention', repeatable: false },
    ],
    specialActions: [
      {
        id: 'wood_pile_place',
        name: 'Holz auf Leuchtfeuer-Stapel',
        type: 'phase_action',
        phase: 'before_action',
        note: 'Vor Aktionsphase, keine Aktionssteine; 1 Spalte pro Runde',
      },
    ],
    discoveryTokens: [
      { id: 'oel', name: 'Öl' },
      { id: 'rosenkranz', name: 'Rosenkranz' },
    ],
  },

  verfluchte_insel: {
    id: 2,
    key: 'verfluchte_insel',
    name: 'Die verfluchte Insel',
    description:
      'Fünf Kreuze auf verschiedenen Inselteilen errichten, um den Nebelfluch zu brechen. Nebelmarker erschweren Aktionen und blockieren Produktion.',
    difficulty: 2,
    maxRounds: 12,
    rulesFile: 'szenarien_regeln/szenario_2_verfluchte_insel.md',
    eventCardsPerDeck: 6,
    setup: {
      startIslandTile: 8,
      startItems: 'random_2',
    },
    startWeather: [
      { fromRound: 1, toRound: 3, dice: [] },
      { fromRound: 4, toRound: 6, dice: ['rain'] },
      { fromRound: 7, toRound: 12, dice: ['rain', 'winter', 'beast'] },
    ],
    specialInventions: [
      { id: 'geweihte_glocke', name: 'Geweihte Glocke', type: 'invention', repeatable: true },
      { id: 'kreuz', name: 'Kreuz', type: 'invention', repeatable: true },
    ],
    specialActions: [
      {
        id: 'build_cross',
        name: 'Kreuz errichten',
        type: 'build',
        usesDistanceRules: true,
        winTarget: 5,
      },
      {
        id: 'explore_temple',
        name: 'Tempel erforschen (Totem)',
        type: 'explore',
        drawsMysteryCards: true,
      },
    ],
    discoveryTokens: [
      { id: 'kerzen_kultisten', name: 'Kerzen der Kultisten' },
      { id: 'seltsame_phiolen', name: 'Seltsame Phiolen' },
      { id: 'opferdolch', name: 'Opferdolch' },
    ],
  },

  jenny: {
    id: 3,
    key: 'jenny',
    name: 'Jenny braucht Hilfe!',
    description:
      'Jenny mit dem Floß ins Lager holen und das Rettungsboot bauen. Wetterglas ist nicht verfügbar; Jenny erleidet außerhalb des Lagers 2 Wunden pro Nacht.',
    difficulty: 3,
    maxRounds: 11,
    rulesFile: 'szenarien_regeln/szenario_3_jenny.md',
    eventCardsPerDeck: 6,
    setup: {
      startIslandTile: 8,
      startItems: 'random_2',
      excludedStartItems: ['wetterglas'],
      jennyWoundTrack: true,
    },
    startWeather: [
      { fromRound: 1, toRound: 3, dice: [] },
      { fromRound: 4, toRound: 6, dice: ['rain'] },
      { fromRound: 7, toRound: 11, dice: ['rain', 'winter', 'beast'] },
    ],
    specialInventions: [
      { id: 'floss', name: 'Floß', type: 'invention', repeatable: false },
      { id: 'rettungsboot', name: 'Rettungsboot', type: 'invention', repeatable: false },
    ],
    specialActions: [
      {
        id: 'rescue_jenny',
        name: 'Jenny ins Lager holen',
        type: 'explore',
        requiresInvention: 'floss',
        note: 'Ab Runde nach Floß-Bau, auf Floß-Gegenstand',
      },
    ],
    discoveryTokens: [],
  },

  vulkaninsel: {
    id: 4,
    key: 'vulkaninsel',
    name: 'Vulkaninsel',
    description:
      'Vulkaninsel erkunden, Forschungsziele erfüllen und mit der Jolle entkommen. Lava dreht ab Runde 4 Inselteile um; Erforschen kostet dauerhaft +1 Stein.',
    difficulty: 4,
    maxRounds: 11,
    rulesFile: 'szenarien_regeln/szenario_4_vulkaninsel.md',
    eventCardsPerDeck: 6,
    setup: {
      startIslandTile: 10,
      secondaryTile: { number: 8, side: 'volcano' },
      exploreFieldModifier: { extraPawns: 1 },
      buildAllowFurAsWood: true,
      ignoreTotemOnStartTile: true,
    },
    startWeather: [
      { fromRound: 1, toRound: 3, dice: [] },
      { fromRound: 4, toRound: 6, dice: ['rain'] },
      { fromRound: 7, toRound: 11, dice: ['rain', 'winter', 'beast'] },
    ],
    specialInventions: [
      { id: 'strickleiter', name: 'Strickleiter', type: 'invention', repeatable: false },
      { id: 'jolle', name: 'Jolle', type: 'invention', repeatable: false },
    ],
    specialActions: [
      {
        id: 'explore_special_site',
        name: 'Besonderen Ort erforschen',
        type: 'explore',
        drawsMysteryCards: true,
        noEarlyStop: true,
      },
      {
        id: 'lava_flip',
        name: 'Lava (Inselteil umdrehen)',
        type: 'round_start',
        fromRound: 4,
      },
    ],
    discoveryTokens: [
      { id: 'alte_karte', name: 'Alte Karte' },
      { id: 'indys_tagebuch', name: "Indy's Tagebuch" },
      { id: 'fackel', name: 'Fackel' },
      { id: 'altes_segeltuch', name: 'Altes Segeltuch' },
    ],
  },

  kannibaleninsel: {
    id: 5,
    key: 'kannibaleninsel',
    name: 'Kannibaleninsel',
    description:
      'Kannibalendörfer niederringen und die Stadt (Startstärke 21) besiegen. Start mit Rum und Pfeife & Tabak; Stadt wird in Runde 4 aufgedeckt.',
    difficulty: 5,
    maxRounds: 12,
    rulesFile: 'szenarien_regeln/szenario_5_kannibaleninsel.md',
    eventCardsPerDeck: 6,
    setup: {
      startIslandTile: 8,
      hiddenTile: { number: 4, role: 'cannibal_city' },
      startItems: ['rum', 'pfeife_tabak'],
      cityRevealRound: 4,
      cityBaseStrength: 21,
    },
    startWeather: [
      { fromRound: 1, toRound: 3, dice: [] },
      { fromRound: 4, toRound: 6, dice: ['rain'] },
      { fromRound: 7, toRound: 12, dice: ['rain', 'winter', 'beast'] },
    ],
    specialInventions: [{ id: 'kanu', name: 'Kanu', type: 'invention', repeatable: false }],
    specialActions: [
      {
        id: 'hunt_cannibal_village',
        name: 'Kannibalendorf angreifen',
        type: 'hunt',
        noAnimalCard: true,
        strengthFormula: '4_plus_visible_totems',
      },
      {
        id: 'hunt_cannibal_city',
        name: 'Kannibalenstadt angreifen',
        type: 'hunt',
        noAnimalCard: true,
        strengthFormula: '21_minus_3_per_burned_village',
      },
    ],
    discoveryTokens: [],
  },

  familie_robinson: {
    id: 6,
    key: 'familie_robinson',
    name: 'Familie Robinson',
    description:
      'Neun zufällige Erfindungen der Eröffnung bauen, Familie ernähren (Kinder in Runde 7/9/11) und Insel rekultivieren. Hälfte der Produktion muss wieder abgegeben werden.',
    difficulty: 6,
    maxRounds: 12,
    rulesFile: 'szenarien_regeln/szenario_6_familie_robinson.md',
    eventCardsPerDeck: 6,
    setup: {
      startIslandTile: 8,
      startItems: 'random_2',
      randomInventionCards: 9,
      childBirthRounds: [7, 9, 11],
      productionTax: 0.5,
    },
    startWeather: [
      { fromRound: 1, toRound: 3, dice: [] },
      { fromRound: 4, toRound: 6, dice: ['rain'] },
      { fromRound: 7, toRound: 12, dice: ['rain', 'winter', 'beast'] },
    ],
    specialInventions: [],
    specialActions: [
      {
        id: 'rekultivierung',
        name: 'Rekultivierung',
        type: 'action_field',
        requiredPawns: 2,
        effect: 'remove_one_grey_marker',
      },
    ],
    discoveryTokens: [
      { id: 'altes_werkzeug', name: 'Altes Werkzeug' },
      { id: 'pflug', name: 'Pflug' },
      { id: 'schieszpulver', name: 'Schießpulver' },
    ],
  },

  king_kong: {
    id: 7,
    key: 'king_kong',
    name: 'King Kong auf der Totenkopfinsel',
    description:
      'Zusatzszenario: Drei Fallen bauen, King Kong mit spezieller Jagd betäuben/fangen und die Filmcrew lebend von der Insel bringen. Regisseur darf nicht sterben; Schauspielerin darf nicht entführt sein.',
    difficulty: 7,
    maxRounds: 10,
    isExpansion: true,
    rulesFile: 'szenarien_regeln/king_kong_szenario.md',
    eventCardsPerDeck: 5,
    setup: {
      startIslandTile: 8,
      startItems: 'random_2',
      campStartsWithShelter: true,
      soldierAllowedAtLowPlayerCount: true,
    },
    startWeather: [
      {
        fromRound: 1,
        toRound: 10,
        dice: ['beast'],
        note: 'Pro nummeriertem Marker auf dem Brett 1× roter Würfel; Palisade<0 → Crew-/Wunden-Sonderregel',
      },
    ],
    specialInventions: [
      { id: 'trap', name: 'Falle', type: 'invention', repeatable: true, maxPerTile: 1 },
      { id: 'tranquilizer', name: 'Betäubungsmittel', type: 'invention', repeatable: false },
    ],
    specialActions: [
      {
        id: 'build_trap',
        name: 'Falle errichten',
        type: 'build',
        requiresTotem: true,
        winTarget: 3,
      },
      {
        id: 'hunt_king_kong',
        name: 'King Kong fangen (spezielle Jagd)',
        type: 'hunt',
        requiredPawns: 2,
        weaponModifier: -5,
        weaponModifierWithTranquilizer: -1,
        requiresTraps: 3,
      },
      {
        id: 'rescue_actress',
        name: 'Schauspielerin retten',
        type: 'explore',
        totemNumber: 4,
        mysteryDraws: 1,
        resolveOnly: 'creature',
      },
    ],
    discoveryTokens: [
      { id: 'vodka', name: 'Flasche Wodka' },
      { id: 'giant_footprint', name: 'Riesiger Affenfuß' },
      { id: 'firecracker', name: 'Böller' },
      { id: 'film_crew_lost_item', name: 'Verlorener Filmcrew-Gegenstand' },
    ],
  },
};

/** Alle Szenario-Schlüssel in Menü-Reihenfolge */
const SCENARIO_LIST = [
  SCENARIOS.schiffbruechig,
  SCENARIOS.verfluchte_insel,
  SCENARIOS.jenny,
  SCENARIOS.vulkaninsel,
  SCENARIOS.kannibaleninsel,
  SCENARIOS.familie_robinson,
  SCENARIOS.king_kong,
];

/**
 * @param {string} key - z. B. gameState.currentScenario
 * @returns {object|undefined}
 */
function getScenario(key) {
  return SCENARIOS[key];
}

/**
 * Erzeugt einen frischen gameState für die gewählte Partie.
 * @param {string} scenarioKey
 * @returns {object}
 */
function createInitialGameState(scenarioKey) {
  const scenario = getScenario(scenarioKey);
  if (!scenario) {
    throw new Error(`Unbekanntes Szenario: ${scenarioKey}`);
  }
  return {
    currentScenario: scenarioKey,
    round: 1,
    phase: 'event',
    scenarioRuntime: {
      maxRounds: scenario.maxRounds,
      specialInventions: scenario.specialInventions.map((i) => ({ ...i, built: false })),
      specialActions: [...scenario.specialActions],
    },
  };
}

if (typeof window !== 'undefined') {
  window.SCENARIOS = SCENARIOS;
  window.SCENARIO_LIST = SCENARIO_LIST;
  window.getScenario = getScenario;
  window.createInitialGameState = createInitialGameState;
}
