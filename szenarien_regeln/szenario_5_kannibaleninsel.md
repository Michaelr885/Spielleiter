# Szenario 5: Kannibaleninsel

```yaml
scenario_id: 5
scenario_key: kannibaleninsel
name: "Kannibaleninsel"
difficulty: 5
rounds: 12
source: "54da8b894764c.pdf (Anhang S. 28–29)"
```

---

## 1. Ziel und Siegbedingungen

### Ziel
Die **Stadt der Kannibalen** zerstören, indem alle **Kannibalendörfer** niedergebrannt und die **Hauptstadt** besiegt wird.

### Sieg (`win`)
1. Ausreichend Dörfer zerstören, um Stadtstärke zu senken.
2. **Stadt** per **Jagd-Aktion** angreifen (Stärke laut Formel).
3. Angreifender Charakter überlebt den Kampf.
4. Alle Charaktere überleben **bis Rundenende**.

### Niederlage (`lose`)
- Angreifender Charakter stirbt im Stadtangriff → sofort verloren.
- Charakter stirbt (Basisregel).
- Rundenlimit.

```yaml
win_conditions:
  cannibal_city_defeated: true
  survive_until_round_end: true
lose_conditions:
  attacker_dies_in_city_fight: immediate
  character_death: true
```

### Stärke Stadt
```
stadt_staerke = 21 - (zerstoerte_doerfer × 3)
```

### Stärke Kannibalendorf (Jagd ohne Tierkarte)
```
dorf_staerke = 4 + sichtbare_totemsymbole  # abgedeckte zählen nicht
```

---

## 2. Besondere Vorbereitungen

| element | abweichung |
|---------|------------|
| Startgegenstände | Immer **Rum** und **Pfeife & Tabak** (kein Zufall) |
| Inselteil 4 | **Verdeckt** auf Feld laut Szenariotafel (Kannibalenstadt) |
| Inselteil 8 | Standard-Startbereich |
| Ereignisse | Je 6 Karten pro Stapel bei 12 Runden |

---

## 3. Szenario-spezifische Sonderregeln

### Stadtaufdeckung
- **Runde 4**, vor Ereignisphase: Inselteil **4** aufdecken, Reihenfolgeplättchen **#6** → Stadt angreifbar.

### Lager & Dörfer
| regel | detail |
|-------|--------|
| Lager auf Kannibalendorf | Verboten; erzwungene Verlegung → jeder **1 Wunde** |
| Ressourcen sammeln auf Dorf-Teil | **+1 Aktionsstein** (bis Dorf niedergebrannt) |
| Dorf zerstört | Totem mit grauem Marker abdecken |

### Angriff (Aktion Jagen)
- **Keine Tierkarte** vom Stapel.
- Nur **Dorf- oder Stadtstärke** vs. Waffenstärke (temporäre Boni erlaubt).
- Wunddifferenz nur für **ausführenden** Charakter.
- Dorf überlebt Angriff → Totem abdecken, Dorf zählt nicht mehr für Stärkeberechnung anderer Dörfer.
- **Freitag** kann weder Dorf noch Stadt **alleine** angreifen (kann unterstützen).

### Buchsymbol / Kannibalenangriff
- Alle Charaktere erleiden Wunden: `max(0, 3 - zerstoerte_doerfer)`.
- Danach: Lager **sofort** auf angrenzendes Teil verlegen, sonst Unterschlupf+Palisade+Dach verloren **oder** je 2 Wunden (Spielerwahl).

### Totemsymbole = Dörfer
| aufdecken | folge |
|-----------|--------|
| Jedes Totem | Erforschender erleidet **1 Wunde** |
| 4. Totem ohne Heilmittel | **3 Wunden**, sonst 1 |
| Danach | Wenn möglich **1 Nahrung oder 1 Holz** abgeben |
| Erste 4 Totems | je 1 **Kannibalendorf** |
| 5. Totem | zählt für Dorfstärke, ist **kein** zerstörbares Dorf |
| Reihenfolgeplättchen | #1–#4 für Dörfer, **#6** für Stadt (#5 ungenutzt) |

---

## 4. Spezielle Erfindungen und Entdeckungsplättchen

### Spezielle Erfindungen

| id | name | effekt |
|----|------|--------|
| `kanu` | Kanu | Beim Erforschen: 2 obere Inselteile ziehen, 1 wählen, anderes unter Stapel |

### Entdeckungsplättchen
- Laut Szenariotafel-Legende (symbole unten links auf Tafel).

---

## App-Hinweise

```yaml
gameState.scenario:
  city_revealed: false  # true ab round >= 4
  city_strength: 21
  villages_burned: 0
  totem_covered: [<tile_id>]
  start_items: [rum, pfeife_tabak]
```
