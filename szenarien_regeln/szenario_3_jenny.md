# Szenario 3: Jenny braucht Hilfe!

```yaml
scenario_id: 3
scenario_key: jenny
name: "Jenny braucht Hilfe!"
difficulty: 3
rounds: 11
source: "54da8b894764c.pdf (Anhang S. 27)"
```

---

## 1. Ziel und Siegbedingungen

### Ziel
**Jenny** (überlebende Kameradin) retten und mit dem **Rettungsboot** von der Insel entkommen.

### Sieg (`win`)
1. **Floß** bauen.
2. Jenny mit Floß-Aktion ins **Lager** holen.
3. **Rettungsboot** bauen (nur wenn Jenny im Lager) → **sofortiger Sieg**.

### Niederlage (`lose`)
- Charakter oder **Jenny** stirbt.
- Rundenlimit ohne Rettungsboot.

```yaml
win_conditions:
  raft_built: true
  jenny_in_camp: true
  lifeboat_built: true
lose_conditions:
  character_death: true
  jenny_death: true
  round_limit: 11
```

---

## 2. Besondere Vorbereitungen

| element | abweichung |
|---------|------------|
| Startgegenstände | **Kein Wetterglas** (weder Start noch später ziehbar) |
| Sonstiger Aufbau | Standard (Inselteil 8, 2 andere Startgegenstände, 5 Erfindungen + 9 Standard) |
| Szenariotafel | **Jennys Verwundungsleiste** (eigene Wund-/Rundenlogik) |
| Ereignisse | Je **6** Karten pro Stapel bei 12 Runden auf Tafel – **Rundenleiste meist 11** (Tafel prüfen) |

---

## 3. Szenario-spezifische Sonderregeln

### Jenny (NPC)

| regel | detail |
|-------|--------|
| Nicht im Lager | **2 Wunden** pro Nachtphase; **nicht heilbar** (außer Ausruhen-Regel im Lager) |
| Im Lager | Wie Charakter ohne Produktion; nur **Ausruhen 1×/Runde** |
| Versorgung | Braucht **Nahrung**; Freiluft-Schlaf → Wunden |
| Betroffen von | Ereignissen, Tierwürfel, Unerfülltem Bedarf |
| Nicht | Erhöht Unterschlupf-Kosten; kann **nicht** Startspieler sein (wie Freitag) |

### Buchsymbol (Szenario)
- **Palisadenstärke −1**; bei Palisade 0 → alle Charaktere (außer Freitag) **1 Wunde**.

### Totemsymbole
| nr | effekt bei Aufdecken |
|----|----------------------|
| #1 | Reihenfolgeplättchen; Tempel-Erforschung (Geheimniskarten, siehe S. 26 Allgemein) |
| #2 | Soforteffekt **1×** |
| #3 | **Seil** sofort auf Gegenstandsseite → zukünftige Ressourcen |
| #4+ | Soforteffekte; 5./6. Totem ohne Effekt |

### Floß → Jenny retten
- Nach Floß-Bau: **nächste Runde** normale **Erforschen**-Aktion auf Floß (1–2 Steine).
- Muss **vor** Rettungsboot erledigt werden.
- Bei 1 Stein + Abenteuerwürfel **?** → **keine** Abenteuerkarte, stattdessen **1 Wunde**.

---

## 4. Spezielle Erfindungen und Entdeckungsplättchen

### Spezielle Erfindungen

| id | name | voraussetzung | effekt |
|----|------|---------------|--------|
| `floss` | Floß | – | Ermöglicht Jenny-Rettung per Erforschen |
| `rettungsboot` | Rettungsboot | Jenny im Lager | Sofortiger Sieg |

### Entdeckungsplättchen
- Symbole auf Szenariotafel verweisen auf szenario-spezifische Effekte (laut Tafellegende).

---

## App-Hinweise

```yaml
gameState.scenario:
  jenny:
    in_camp: false
    wound_track: 0
    alive: true
  raft_built: false
  lifeboat_built: false
  weather_glass_allowed: false
```
