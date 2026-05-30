# Szenario 4: Vulkaninsel

```yaml
scenario_id: 4
scenario_key: vulkaninsel
name: "Vulkaninsel"
difficulty: 4
rounds: 11
source: "54da8b894764c.pdf (Anhang S. 27–28)"
```

---

## 1. Ziel und Siegbedingungen

### Ziel
Die **Vulkaninsel** erkunden, alle erforderlichen **Forschungsziele** erfüllen und mit der **Jolle** entkommen.

### Sieg (`win`)
1. Laut Tabelle auf der Szenariotafel: bestimmte Anzahl **leerer Inselfelder** und **besondere Orte** (Totem-Felder) erforschen – abhängig von Spielerzahl (ohne Freitag).
2. In der **folgenden Runde** die **Jolle** bauen → **sofortiger Sieg**.

### Niederlage (`lose`)
- Lager steht auf **umgedrehtem** Inselteil / Vulkanfeld.
- Charakter stirbt.
- Rundenlimit ohne Jolle.

```yaml
win_conditions:
  explore_quota_met: true  # Tabelle: players -> fields + special_sites
  dinghy_built_next_round_after_quota: true
lose_conditions:
  camp_on_lava_tile: immediate
  character_death: true
```

### Forschungsquote (Tabelle Szenariotafel)
| spieler (ohne freitag) | leere felder | besondere orte |
|------------------------|--------------|----------------|
| 1 | siehe tafel | siehe tafel |
| 2 | siehe tafel | siehe tafel |
| 3 | siehe tafel | siehe tafel |
| 4 | siehe tafel | siehe tafel |

> Exakte Zahlen auf der Szenariotafel ablesen und in `gameState` hinterlegen.

---

## 2. Besondere Vorbereitungen

| element | abweichung |
|---------|------------|
| Startinsel | **Nr. 10** mit Lager (X nach oben), **nicht** Nr. 8 |
| Inselteil 8 | Auf **Rückseite (Vulkan)**; Layout laut Szenariotafel-Bild |
| Totem/Entdeckung auf Startfeld 10 | **Ignoriert** |
| Erforschen-Feld | Plättchen **zeitraubende Aktion** dauerhaft: jede Erforschung **+1 Stein** |
| Bauen | **Holz und Fell** mischbar (Fell zählt wie Holz, höhere Kosten möglich) |

---

## 3. Szenario-spezifische Sonderregeln

### Vulkanfeld
- Wie umgedrehtes Inselteil: **nicht betretbar**, nicht überquerbar, keine Marker/Aktionen, Lagerverlegung unmöglich (sonst alle **1 Wunde**).

### Lava (ab Runde 4)
- **Zu Beginn jeder Runde** (vor Ereignisphase): Inselteile/Felder mit Zahl = aktuelle Runde werden **umgedreht**; Marker/Plättchen entfernt.
- Lager auf betroffenem Teil → **sofort verloren**.

### Vulkanasche (weiße Marker) – wie Nebel in Szenario 2
| auslöser | effekt |
|----------|--------|
| Buchsymbol | 2 weiße Marker (nicht auf Vulkan/umgedrehte Teile) |
| Aktion auf markiertem Feld | +1 Aktionsstein (kumulativ mit Erforschen-Plättchen) |

### Besondere Orte (Totem)
- **Kein** automatisches Reihenfolgeplättchen bei Aufdecken.
- Orte werden in Entdeckungsreihenfolge mit #1, #2, … markiert; je Ort **1×** erforschbar.
- Geheimniskarten: **feste Maximalanzahl**, **kein Abbruch** bis Maximum (außer Karte stoppt Ziehen).
- **Letzte zwei** Orte: **+1 Aktionsstein** zusätzlich.
- Start-Totem auf Feld 10: dauerhaft **ignoriert**.

### Jolle
- Erst bauen, wenn Forschungsquote **in der vorherigen Runde** erfüllt wurde.

---

## 4. Spezielle Erfindungen und Entdeckungsplättchen

### Spezielle Erfindungen

| id | name | effekt |
|----|------|--------|
| `strickleiter` | Strickleiter | Neutraler grüner Stein nur für **besondere Orte** (Totem) |
| `jolle` | Jolle | Sieg, wenn Forschungsziele erfüllt (Vorrunde) |

### Spezielle Entdeckungsplättchen

| id | name | effekt |
|----|------|--------|
| `alte_karte` | Alte Karte | 1 Geheimniskarte weniger bei Orts-Erforschung (vor dem Ziehen) |
| `indys_tagebuch` | Indys Tagebuch | Effekt einer **Falle** ignorieren (Karte zählt als ausgeführt) |
| `fackel` | Fackel | Effekt einer **Kreatur** ignorieren (Karte zählt als ausgeführt) |
| `altes_segeltuch` | Altes Segeltuch | In Wetterphase 1 Wolke ignorieren |

---

## App-Hinweise

```yaml
gameState.scenario:
  camp_tile: 10
  volcano_tiles: [<tile_id>]
  ash_markers: []
  explore_field_extra_pawn: 1
  special_sites_done: []
  empty_fields_done: []
  dinghy_unlocked: false
```
