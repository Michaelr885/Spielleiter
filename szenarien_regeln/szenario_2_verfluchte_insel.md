# Szenario 2: Die verfluchte Insel

```yaml
scenario_id: 2
scenario_key: verfluchte_insel
name: "Die verfluchte Insel"
difficulty: 2
rounds: 12
source: "54da8b894764c.pdf (Anhang S. 26–27)"
```

---

## 1. Ziel und Siegbedingungen

### Ziel
Die Insel von einem **fluchartigen Nebel** befreien, indem auf **5 verschiedenen Inselteilen** je ein **Kreuz** errichtet wird.

### Sieg (`win`)
- **5 Kreuze** auf **5 verschiedenen** Inselteilen gebaut (Distanzregeln wie Sammeln/Erforschen).
- Alle Charaktere überleben **bis zum Ende der Runde**, in der das 5. Kreuz fertiggestellt wird.

### Niederlage (`lose`)
- Charakter stirbt.
- Rundenlimit (12) erreicht ohne 5 Kreuze.

```yaml
win_conditions:
  crosses_built: 5
  distinct_island_tiles: true
  survive_end_of_completion_round: true
lose_conditions:
  character_death: true
  round_limit: 12
```

---

## 2. Besondere Vorbereitungen

| element | standard |
|---------|----------|
| Inselstart | Inselteil Nr. 8, Lager (Standard) |
| Startgegenstände | 2 zufällige |
| Ereignisse | Je 6 Karten pro Stapel (12 Runden) |
| Marker | **Weiße Marker** (Nebel) bereitlegen |

---

## 3. Szenario-spezifische Sonderregeln

### Nebelmarker (weiße Marker)

| auslöser | effekt |
|----------|--------|
| **Buchsymbol** auf Ereigniskarte | 2 weiße Marker auf 2 beliebige **Inselteile oder leere Inselfelder** (max. 1 Marker pro Feld) |
| Marker nicht platzierbar | Keine Wunden (ignorieren) |
| Inselteil umgedreht | Marker/Plättchen entfernt; **keine neuen** Nebelmarker auf Rückseite |

### Auswirkungen von Nebel

| situation | regel |
|-----------|--------|
| Aktion auf Nebel-Feld/Inselteil | **+1 Aktionsstein** (auch Kreuz-Bau) |
| Landschaftstyp | Gilt als **unerforscht** (Erfindungsvoraussetzungen) |
| Lager auf Nebel-Inselteil | **Keine Produktion** von Quellen/Plättchen dort |
| Abkürzung + Nebel am selben Teil | Abkürzung **ohne Effekt**; Sammeln an Quellen weiter möglich |
| Umgedrehtes Inselteil | **Kein Kreuz** baubar |

### Totemsymbole (Tempel)

| entdeckung | effekt |
|------------|--------|
| 1. Totem-Inselteil | Reihenfolgeplättchen **#1**: 1× Erforschen → Geheimniskarten (max. 3× Schatz, 1× Falle); Abbruch erlaubt |
| 2. Totem | Plättchen **#2**, Effekt **sofort 1×** |
| 3. / 4. Totem | Plättchen **#3/#4**, Effekt **sofort 1×** |
| 5. / 6. Totem | wie oben, falls vorhanden |

---

## 4. Spezielle Erfindungen und Entdeckungsplättchen

### Spezielle Erfindungen

| id | name | effekt |
|----|------|--------|
| `geweihte_glocke` | Geweihte Glocke | Mehrfach baubar; je Bau **3 Nebelmarker** entfernen |
| `kreuz` | Kreuz | Mehrfach baubar; auf beliebigen Inselteilen (auch mit Nebel); zählt zum Sieg |

### Spezielle Entdeckungsplättchen

| id | name | effekt |
|----|------|--------|
| `kerzen_kultisten` | Kerzen der Kultisten | 1 neutraler brauner Stein, 1× für Bauen |
| `seltsame_phiolen` | Seltsame Phiolen | Heilmittel ohne Bauaktion (in Aktionsphase → zukünftige Ressourcen) |
| `opferdolch` | Opferdolch | Behalten; +Waffenstärke in Kämpfen, je Einsatz 1 Wunde; erster Nutzer behält bis Rundenende |

---

## App-Hinweise

```yaml
gameState.scenario:
  fog_markers: [{tile_id, type: fog}]
  crosses: [<tile_id>, ...]  # max 5
  totem_temples_resolved: [1,2,3,4]
  book_effect: place_two_fog_markers
```
