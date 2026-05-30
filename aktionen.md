# Aktionen – Robinson Crusoe (Aktionsphase)

> Quelle: `54da8b894764c.pdf`. Auflösungsreihenfolge: Präventiv → Jagen → Bauen → Ressourcen sammeln → Erforschen → Lager aufräumen → Ausruhen.

---

## Gemeinsame Regeln

### Aktionssteine
| steine | bedeutung |
|--------|-----------|
| 1 | Risiko-Aktion → **3 braune Aktionswürfel** (Farbe je nach Aktion: Bauen=braun, Sammeln=grau, Erforschen=grün) |
| 2 | Sichere Aktion → **automatischer Erfolg** (kein Erfolgswürfel nötig) |
| >2 | Entfernung: +1 Stein pro durchquertem Inselteil zwischen Lager und Ziel |

- Ausführender = oberster Stein; negative/positive Folgen nur für ihn (außer Gruppeneffekte).
- Mindestens 1 Stein pro Charakter immer verfügbar.

### Aktionswürfel (bei 1 Stein)
Reihenfolge der Auswertung:
1. **Verwundungswürfel** – Wunde oder nichts
2. **Erfolgswürfel** – Erfolg oder Misserfolg (+2 Entschlossenheit bei Misserfolg)
3. **Abenteuerwürfel** – Abenteuerkarte oder nichts

| würfel | erfolg | misserfolg |
|--------|--------|------------|
| Verwundung | – | 1 Wunde |
| Erfolg | Aktion wird ausgeführt | Aktion entfällt; +2 Entschlossenheit |
| Abenteuer | Karte vom Stapel der Aktion | – |

- Liegt **Abenteuerplättchen** auf dem Stapel → immer Karte ziehen (Würfel ignorieren), Plättchen danach ablegen.
- Bei Bauen-Misserfolg: zugewiesene Ressourcen **nicht** verbraucht → zurück zu verfügbar.

### Distanz (Sammeln / Erforschen)
- Start immer am **Lager-Inselteil**.
- Angrenzend: 1–2 Steine.
- Jedes weitere Inselteil auf dem Weg: +1 Stein.
- Sichere Schwelle: `entfernung + 1` Steine (Beispiel: 2 Felder entfernt → 3 Steine sicher).
- Unbekannte Inselfelder dürfen **nicht** durchquert werden (Umweg = mehr Steine).

### Planung
- Nur Ressourcen/Gegenstände von **verfügbare Ressourcen** / bereits gebaute Gegenstände.
- Pro Erfindung / Unterschlupf max. **1 Bauversuch** pro Runde.

---

## 1. Präventivaktion (`preventive`)

### Zweck
Drohendes Ereignis einer liegenden Ereigniskarte abwenden.

### Voraussetzungen
- Ereigniskarte auf Bedrohungsfeld mit Präventiv-Block.
- Angegebene Anzahl **Aktionssteine** auf der Karte.
- Ggf. Ressourcen, **Mindest-Waffenstärke**, bestimmter **Gegenstand** (Symbol auf Karte).

### Ablauf
1. Steine/Ressourcen auf Karte legen.
2. Anweisungen der Karte befolgen (nur ausführender Charakter).
3. Karte + eingesetzte Ressourcen abwerfen.

### Konsequenzen
| ergebnis | effekt |
|----------|--------|
| Erfolg | Drohendes Ereignis verhindert; meist Entschlossenheitsplättchen als Entschädigung |
| – | Jede Präventivaktion nur **1×** pro Karte |

### Strandgut (Sonderfall)
- Zu Spielbeginn auf Bedrohungsfeld.
- Wahl: **1 Stein** → weniger Ressourcen **oder** **2 Steine** → mehr Ressourcen.
- Beim Verschieben: kein drohendes Ereignis, aber verpasster Vorteil.

### App-Felder
```yaml
action_id: preventive
required_pawns: <von karte>
required_resources: []
required_weapon_level: <optional>
required_item: <optional>
executing_character: <id>
```

---

## 2. Jagen (`hunt`)

### Zweck
Nahrung und Fell vom Jagdstapel; Kampf-Risiko.

### Voraussetzungen
- **Genau 2 Aktionssteine** (Pflicht).
- Mindestens **1 Tierkarte** im Jagdstapel.
- Waffenstärke **nicht** vorgeschrieben (0 erlaubt).

### Ablauf
1. 2 Steine stapeln auf Jagd-Feld (oben = Ausführender).
2. Oberste **Tierkarte** ziehen.
3. **Kampf** (siehe unten).
4. Tierkarte abwerfen; Beute → **zukünftige Ressourcen**.

### Kampf (allgemein, auch Ereignis/Wetter/Karten)
| schritt | beschreibung |
|---------|--------------|
| 1 | Tierstärke vs. Waffenstärke (+ temporäre Boni); Differenz → Wunden für Ausführenden |
| 2 | Waffenstärke-Leiste dauerhaft senken; fehlende Stufen → 1 Wunde je |
| 3 | Nahrung erhalten (zukünftige Ressourcen) |
| 4 | Fell erhalten (zukünftige Ressourcen) |
| 5 | Palisade senken; fehlend → 1 Wunde je |
| 6 | Weitere Karteneffekte; Karte abwerfen |

- Nur Stärke angegeben (z. B. Tierwürfel „Stärke 3“): Schritte 1 und 6.
- Jagen gilt als **immer „erfolgreich“** (Beute nach Kampf, auch bei Waffenstärke 0).

### Konsequenzen
| ergebnis | effekt |
|----------|--------|
| Erfolg | Beute nach Kampfregeln; pro Tier nur 1× pro Runde jagbar |
| Misserfolg | – (nicht anwendbar bei Standard-Jagd) |

### App-Felder
```yaml
action_id: hunt
required_pawns: 2
hunt_pile_count: <int>
weapon_level: <int>
```

---

## 3. Bauen (`build`)

### Zweck
Unterschlupf, Dach, Palisade, Waffen, Erfindungen, szenariospezifische Bauten.

### Voraussetzungen
- Ressourcen (Holz/Fell) und/oder Geforderte Gegenstände **vorhanden**.
- Landschaftstyp auf Erfindungskarte freigeschaltet (grauer Marker).
- Ggf. **Terrain** auf Ziel-Inselteil (Szenario).
- **Unterschlupf** für Dach/Palisade (gebaut oder natürlich am Lager).
- Effektplättchen: ggf. +1 Stein oder +Holz.

### Unterarten

#### Unterschlupf
| | |
|-|-|
| Kosten | laut Tabelle Spielbrett (Spieleranzahl): z. B. 3 Spieler = 3 Holz **oder** 2 Fell |
| Steine | 1 (Würfel) oder 2 (sicher) |
| Erfolg | Lagerplättchen auf Unterschlupf-Seite; grauer Marker auf Unterschlupf-Feld (unverlierbar) |
| Limit | 1× pro Partie |

#### Dach / Palisade
- Nur mit Unterschlupf; beliebig oft pro Runde verstärkbar.
- Kosten wie Unterschlupf-Tabelle pro Stufe.
- Marker auf Leiste +1.

#### Waffen
- 1 Holz pro Stufe (unabhängig von Spielerzahl).
- Beliebig oft pro Runde.

#### Erfindungen (Karten / Szenariotafel / Charakter)
| typ | bei erfolg |
|-----|------------|
| Brett-Erfindung | Gegenstandsseite → zukünftige Ressourcen → Ende Phase aktiv |
| Charakter-Erfindung | +2 Entschlossenheit sofort |
| Szenario-Sonderbau | Marker auf Szenariotafel |

- Jede Erfindung **1×** im Spiel (Szenario-Ausnahmen möglich).
- Fehlgeschlagener Wurf: Erfindung erst **nächste Runde** erneut versuchbar.

### Risiko vs. Sicher
| steine | ergebnis |
|--------|----------|
| 2 | Bau erfolgt |
| 1 | Würfel; Misserfolg = kein Bau, Ressourcen bleiben verfügbar |

### App-Felder
```yaml
action_id: build
build_target: shelter|roof|palisade|weapon|invention|<id>
required_pawns: 1|2
required_wood: <int>
required_fur: <int>
required_items: []
terrain_required: <optional>
```

---

## 4. Ressourcen sammeln (`gather`)

### Zweck
Holz/Nahrung von Quellen auf **erforschten** Inselteilen (nicht Lager-Teil).

### Voraussetzungen
- Ziel: Quelle auf erforschtem Inselteil.
- Quelle nicht erschöpft (Marker).
- Nicht bereits in Produktionsphase genutzt (Lager-Teil).
- Nicht durch Abkürzung bereits beliefert.
- 1× pro Quelle pro Runde.

### Steine & Ergebnis
| steine | ergebnis |
|--------|----------|
| 2 (bei Entfernung 0–1) | 1 Ressource der Quelle → zukünftige Ressourcen |
| 1 | Würfel; bei Erfolg 1 Ressource; Plättchen können +1 oder doppelte Menge geben |

### Konsequenzen
| ergebnis | effekt |
|----------|--------|
| Erfolg | Ressourcen auf zukünftige Ressourcen |
| Misserfolg | keine Ressource; ggf. Wunde + Abenteuer + 2 Entschlossenheit |

### App-Felder
```yaml
action_id: gather
target_tile: <island_tile_id>
resource_type: wood|food
required_pawns: <int>
distance_from_camp: <int>
```

---

## 5. Erforschen (`explore`)

### Zweck
Neue Inselteile aufdecken oder besondere Orte (Szenario) erforschen.

### Voraussetzungen
- Leeres Inselfeld **angrenzend** an erforschtes Teil **oder** besonderer Ort laut Szenario.
- Max. **1 Versuch pro Feld/Ort** pro Runde.
- Halbe Randfelder nicht erforschbar.

### Steine & Ergebnis
| steine | ergebnis |
|--------|----------|
| 2 (bzw. entfernung+1 sicher) | Erfolg |
| 1 weniger als sicher | grüne Würfel |

### Bei erfolgreicher Neuentdeckung (Reihenfolge)
1. Landschaftstyp → Marker auf passenden Erfindungskarten.
2. Tiersymbol → Tierkarte in Jagdstapel.
3. Totemsymbol → **Szenarioeffekt** (`scenario.totem_effect`).
4. Entdeckungsplättchen ziehen (Anzahl laut Inselteil) → zukünftige Ressourcen.
5. Natürlicher Unterschlupf vermerken.

### Geheimniskarten (nur wenn Szenario/Effekt es verlangt)
- Karten aufdecken bis Typ (Schatz/Kreatur/Falle) wie vorgegeben.
- Schatz → zukünftige Ressourcen; Kreatur/Falle → sofort.
- Spieler darf nach jedem Treffer abbrechen (bis Maximalanzahl pro Typ).

### Konsequenzen
| ergebnis | effekt |
|----------|--------|
| Erfolg | Inselteil + Effektkette |
| Misserfolg | kein Teil; ggf. Wunde/Abenteuer |

### App-Felder
```yaml
action_id: explore
target: empty_field|special_location
required_pawns: <int>
distance_from_camp: <int>
```

---

## 6. Lager aufräumen (`tidy_camp`)

### Zweck
Moral und Entschlossenheit steigern.

### Voraussetzungen
- Je **1 Stein** des Charakters auf Aktionsfeld (max. 2 pro Charakter pro Runde).

### Konsequenzen (pro Stein)
| ergebnis | effekt |
|----------|--------|
| Erfolg | +2 Entschlossenheit **und** Moral +1 (max. rechts = nur Plättchen) |
| 4 Spieler + Karte „Lager aufräumen“ | Wahl: Moral **oder** 2 Entschlossenheit |

### App-Felder
```yaml
action_id: tidy_camp
pawn_count: 1|2
morale_at_max: <bool>
four_player_card: <bool>
```

---

## 7. Ausruhen (`rest`)

### Zweck
Wunden heilen (auch außerhalb Nachtphase).

### Voraussetzungen
- 1 Stein pro Heilung auf Ausruhen-Feld.
- Max. 2× pro Charakter pro Runde.

### Konsequenzen
| ergebnis | effekt |
|----------|--------|
| Erfolg | 1 Wunde heilen pro Stein |
| Mit Bett oder Hängematte | verstärkte Heilung (nicht kombinierbar; siehe Anleitung Gegenstände) |

### App-Felder
```yaml
action_id: rest
pawn_count: 1|2
has_bed: <bool>
has_hammock: <bool>
```

---

## Ende Aktionsphase – Zusammenfassung für App

```yaml
action_phase_cleanup:
  - return_pawns_to_characters
  - move_future_resources_to_available
  - move_discovery_tokens_to_available
  - resolve_built_inventions
  - resolve_treasures
```
