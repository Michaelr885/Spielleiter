# Szenario 6: Familie Robinson

```yaml
scenario_id: 6
scenario_key: familie_robinson
name: "Familie Robinson"
difficulty: 6
rounds: 12
source: "54da8b894764c.pdf (Anhang S. 29)"
```

---

## 1. Ziel und Siegbedingungen

### Ziel
Als Familie auf der Insel **überleben**, alle vorgegebenen **Erfindungen** fertigstellen und die Insel **bewirtschaftbar** machen.

### Sieg (`win`) – Prüfung am Ende **beliebiger Runde**
Alle Bedingungen gleichzeitig:
- Alle **Charaktere** leben.
- Alle bis dahin **geborenen Kinder** leben.
- Alle **9 zufällig zu Beginn gezogenen** Erfindungskarten (nicht die 9 Standard-Erfindungen) sind gebaut.
- **Unterschlupf** gebaut.
- **Dachstärke ≥ 1**, **Palisadenstärke ≥ 1**, **Waffenstärke ≥ 1**.

### Niederlage (`lose`)
- Charakter stirbt.
- Eine der 9 Pflicht-Erfindungen wurde abgelegt und nicht vor Rundenende zurückgewonnen.
- **Kind** kann nicht ernährt werden (Kinder dürfen **nicht hungern**).
- Rundenlimit ohne Siegbedingungen.

```yaml
win_conditions:
  required_inventions_built: 9  # IDs aus setup_draw
  shelter: true
  roof_min: 1
  palisade_min: 1
  weapon_min: 1
  all_characters_alive: true
  all_children_alive: true
lose_conditions:
  child_starvation: immediate
  required_invention_discarded: true
```

---

## 2. Besondere Vorbereitungen

| element | abweichung |
|---------|------------|
| Erfindungen | **9** zufällige Karten aufs Brett (statt 5) – diese **9 exakt** müssen gebaut werden |
| Standard-Erfindungen | 9 Standardkarten zusätzlich (wie Basis), zählen **nicht** zur Siegquote |
| Kinder | Marker/Anzeige Runden **7, 9, 11** auf Rundenleiste |
| Sonst | Inselteil 8, 2 Startgegenstände, Ereignisse je 6/6 bei 12 Runden |

---

## 3. Szenario-spezifische Sonderregeln

### Kinder (Runden 7, 9, 11)
- Pro Geburt: zusätzlich **1 Nahrung** pro Kind in Nachtphase (siehe Rundenleiste: −1/−2/−3 Nahrung).
- Fehlende Nahrung für Kinder → **sofort verloren** (Charaktere dürfen hungern, Kinder nicht).

### Produktionsphase – Abgabe
- Nach allen Produktions-Einnahmen: **Hälfte aller erhaltenen Ressourcen** (abgerundet) wieder **abgeben**.
- Rest wie üblich auf verfügbare Ressourcen.

### Totemsymbol
- Beim Platzieren: Landschaftstyp mit allen liegenden Teilen vergleichen.
- Erstes Teil dieses Typs → Typ mit Marker **unerforscht** (wie Nebel-Logik für Erfindungen).

### Zusatznahrung auf Lager-Inselteil
- Plättchen `zusätzliche Nahrung` auf Lager-Teil: **Exklusivitätsregel aufgehoben** → mehrere möglich, mehr Produktion dort.

### Aktion Rekultivierung
- Eigenes Feld auf Szenariotafel: **2 Aktionssteine** → 1 grauer Marker von beliebigem Inselteil/Feld entfernen (beliebige Marker-Bedeutung).

---

## 4. Spezielle Erfindungen und Entdeckungsplättchen

### Spezielle Erfindungen
- Keine eigenen Szenario-Baukarten wie Kreuz/Floß; Sieg über die **9 Setup-Erfindungen**.

### Spezielle Entdeckungsplättchen

| id | name | effekt |
|----|------|--------|
| `altes_werkzeug` | Altes Werkzeug | Erfindung ohne Bauaktion bauen (in Aktionsphase → zukünftige Ressourcen) |
| `pflug` | Pflug | Wie Aktion **Rekultivierung** (1 Marker entfernen) |
| `schieszpulver` | Schießpulver | Tierwürfel in Wetterphase 1× neu würfeln (Pflicht, neues Ergebnis behalten) |

---

## App-Hinweise

```yaml
gameState.scenario:
  required_invention_ids: [9 cards from setup]
  children_born: {round_7: 1, round_9: 1, round_11: 1}
  production_tax_rate: 0.5  # floor
  rekultivierung_available: true
  terrain_first_discovery_blocks: {}
```
