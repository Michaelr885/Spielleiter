# Szenario 1: Schiffbrüchig

```yaml
scenario_id: 1
scenario_key: schiffbruechig
name: "Schiffbrüchig"
difficulty: 1
rounds: 12
source: "54da8b894764c.pdf (Anhang S. 26)"
```

---

## 1. Ziel und Siegbedingungen

### Ziel
Ein **Leuchtfeuer** errichten: den **Holzstapel** auf der Szenariotafel vollständig füllen und bis zur Schiffs-Ankunft überleben.

### Sieg (`win`)
- **Holzstapel vollständig:** Auf **jedem Feld** des Stapels liegt 1 Holz (5 Spalten à 4 Felder = 20 Holz).
- **Schiff in Sicht:** In **Runde 10, 11 oder 12** (nach gefülltem Stapel) → **sofortiger Sieg**.

### Niederlage (`lose`)
- Ein Charakter stirbt (Basisregel).
- Runde 12 endet ohne erfülltes Ziel.

### Holzstapel-Regeln (Kernmechanik)
| regel | detail |
|-------|--------|
| Zeitpunkt | Holz nur **direkt vor der Aktionsphase** platzieren (keine Aktion nötig) |
| Spalten | Pro Runde nur **1 Spalte**, immer die **linkste noch freie** Spalte |
| Vollständige Spalte | Erst **nächste Runde** nächste Spalte |
| Mindestdauer | Mindestens **5 Runden** bis Stapel voll |
| Irreversibel | Holz vom Stapel **nicht** entfernbar |

```yaml
win_conditions:
  wood_pile_full: true
  ship_arrival_round: [10, 11, 12]
lose_conditions:
  character_death: true
  round_limit_without_goal: 12
```

---

## 2. Besondere Vorbereitungen

| element | abweichung vom Standard |
|---------|------------------------|
| Inselstart | Inselteil **Nr. 8** mit Lager (Standard) |
| Startgegenstände | 2 zufällige (Standard) |
| Ereigniskarten | Je **6** aus Buch- und Abenteuer-Stapel (12 Runden ÷ 2), gemischt |
| Szenariotafel | **Holzstapel** links auf der Tafel vorbereiten |
| Wetter (Rundenleiste) | Runden 1–3: keine Würfel; 4–6: Regenwürfel; 7–12: alle 3 Würfel |

### Ignorierte Symbole
- **`Buchsymbol`** auf Ereigniskarten: **keine Wirkung**
- **`Totemsymbol`** auf Inselteilen: **keine Wirkung**

---

## 3. Szenario-spezifische Sonderregeln

- Keine Nebel-/Vulkan-/Kannibalen-Mechaniken.
- Fokus auf **Ressourcenplanung** für Holzstapel und Überleben bis Runde 10+.
- Spezial-Erfindungen **Beil** und **Mast** unterstützen den Holzstapel (siehe unten).

---

## 4. Spezielle Erfindungen und Entdeckungsplättchen

### Spezielle Erfindungen (nur Szenariotafel)

| id | name | effekt |
|----|------|--------|
| `beil` | Beil | Legt `+`-Plättchen auf Lager-Inselteil (zieht mit Lager um) |
| `mast` | Mast | Holz aus Bau sofort auf Holzstapel; Überschuss verfällt |

### Spezielle Entdeckungsplättchen

| id | name | effekt |
|----|------|--------|
| `oel` | Öl | Holz sofort auf Holzstapel; Überschuss verfällt |
| `rosenkranz` | Rosenkranz | 3 Entschlossenheitsplättchen frei verteilen |

> Die übrigen Entdeckungssymbole auf der Szenariotafel verweisen auf plättchen-spezifische Effekte; in diesem Szenario sind **Buch- und Totem-Effekte** deaktiviert.

---

## App-Hinweise

```yaml
gameState.scenario:
  wood_pile: [[0,0,0,0], ...]  # 5 Spalten × 4 Felder
  book_symbol_active: false
  totem_active: false
  ship_can_rescue: round >= 10 and wood_pile_full
```
