# Rundenphasen – Robinson Crusoe (Basisregeln)

> Quelle: `54da8b894764c.pdf` (Spielanleitung). Gilt für alle Szenarien, sofern die Szenariotafel nichts Abweichendes vorschreibt.

Eine Spielrunde besteht aus **6 Phasen** in fester Reihenfolge. Symbole auf dem Spielbrett entsprechen diesen Phasen.

---

## Übersicht

| phase_id | name | übersprungen_in_runde_1 |
|----------|------|-------------------------|
| `event` | Ereignisphase | ja |
| `morale` | Moralphase | nein |
| `production` | Produktionsphase | nein |
| `action` | Aktionsphase | nein |
| `weather` | Wetterphase | nein |
| `night` | Nachtphase | nein |

---

## 1. Ereignisphase (`event`)

### Ablauf
- **Runde 1:** Phase wird übersprungen.
- **Ab Runde 2:** Startspieler zieht oberste Karte vom Ereignisstapel (Ereignis-, Abenteuer- oder Geheimniskarte).

### Sofortiges Ereignis (Ausführung)
1. Titel und Erzähltext vorlesen.
2. **Bei Ereigniskarte mit Symbol:**
   - `Abenteuersymbol` (braun/grau/grün): Abenteuerplättchen auf passenden Abenteuerstapel legen (falls dort noch keines liegt).
   - `Buchsymbol`: Effekt laut **Szenariotafel** ausführen.
3. Effekttext der Karte ausführen.

### Nach dem Sofortigen Ereignis
| Kartentyp | Folge |
|-----------|--------|
| Abenteuer-/Geheimniskarte | Karte abwerfen → **neue** Karte vom Ereignisstapel ziehen und ausführen (Kette möglich). |
| Ereigniskarte | Karte auf **rechtes Bedrohungsfeld** legen; vorhandene Karten nach links schieben; wird eine Karte vom Brett geschoben → **Drohendes Ereignis** der geschobenen Karte sofort ausführen. |

### App: Abfragen / Berechnungen
- [ ] Startspieler bestätigen
- [ ] Kartentyp erfassen (Ereignis / Abenteuer / Geheimnis)
- [ ] Buchsymbol? → Szenario-Effekt (`scenario.book_effect`)
- [ ] Abenteuersymbol? → Stapel-Farbe
- [ ] Effekttext: Ressourcen-/Marker-/Stärke-Änderungen
- [ ] **Unerfüllter Bedarf:** Pro nicht erfüllbarem Punkt → betroffene Charaktere erleiden je 1 Wunde (Ereignisphase-Kampf: nur Startspieler)
- [ ] Kampf gefordert? → Kampfregeln wie Aktion Jagen; nur Startspieler betroffen
- [ ] Erhaltene Ressourcen/Schätze → Feld **verfügbare Ressourcen** (sofort nutzbar)

### Besonderheiten
- Moral kann nicht unter Minimum sinken; fehlende Senkung verursacht **keine** Ersatz-Wunden.
- Positive Effekte aus Ereignissen sofort anwenden.

---

## 2. Moralphase (`morale`)

### Ablauf
Startspieler wertet Position des Markers auf der **Moralleiste** aus:

| Marker-Position | Effekt für Startspieler |
|-----------------|-------------------------|
| Mitte | Kein Effekt |
| Links der Mitte (schlechte Stimmung) | 1–3 Entschlossenheitsplättchen **abgeben** (je nach Feld) |
| Rechts der Mitte (gute Stimmung) | 1–2 Entschlossenheitsplättchen **erhalten** |
| Ganz rechts | Wahl: 2 Plättchen **oder** 1 Wunde heilen |

### App: Abfragen / Berechnungen
- [ ] Aktuelle Moral-Position (0 = Tiefpunkt, Mitte, +1, +2, …)
- [ ] Entschlossenheitsplättchen des Startspielers zählen
- [ ] Fehlende Plättchen beim Abgeben → je 1 Wunde pro fehlendes Plättchen (kein Verzicht auf Abgabe zugunsten von Wunden)
- [ ] Bei manchen Szenarien/Charakteren: Moral zuerst +1, dann Effekt (Szenario/Charakter-Sonderregeln prüfen)

---

## 3. Produktionsphase (`production`)

### Ablauf
Pro Quelle auf dem **Inselteil mit Lagerplättchen**:
- Nahrungsquelle → 1 Nahrung (ggf. modifiziert durch Plättchen/Ereignisse)
- Holzquelle → 1 Holz (ggf. modifiziert)

Alle erhaltenen Ressourcen → Feld **verfügbare Ressourcen**.

### App: Abfragen / Berechnungen
- [ ] Inselteil-ID mit Lager
- [ ] Quellen auf diesem Teil (Nahrung / Holz / erschöpft / Bonus-Plättchen)
- [ ] Szenario-Sonderregeln (z. B. King Kong: Lager auf Totem-Inselteil → jeder Charakter 1 Wunde)
- [ ] Produzierte Mengen berechnen und Ressourcenpool aktualisieren

### Hinweis
- Ressourcen auf dem Lager-Inselteil können **nicht** per Aktion „Ressourcen sammeln“ nochmals geholt werden (nur Produktionsphase).

---

## 4. Aktionsphase (`action`)

Zweiteiliger Kern der Runde:

### 4a Planung
- Gruppe weist **alle** Aktionssteine zu (1–2 pro Charakter, ggf. modifiziert).
- Voraussetzungen müssen bei Zuweisung erfüllt sein (nur **verfügbare** Ressourcen/Gegenstände, keine „zukünftigen“).
- Ressourcen für geplante Aktionen idealerweise neben Steinen legen (Reservierung).
- Ausführender Charakter = oberster Stein im Stapel; Unterstützer darunter.
- Neutrale Steine, Freitag, Hund: keine Zuweisung nötig.

### 4b Auflösung (feste Reihenfolge)
| reihenfolge | aktion_id |
|-------------|-----------|
| 1 | `preventive` |
| 2 | `hunt` |
| 3 | `build` |
| 4 | `gather` |
| 5 | `explore` |
| 6 | `tidy_camp` |
| 7 | `rest` |

- Aktionen ohne zugewiesene Steine: überspringen.
- Innerhalb eines Typs: freie Reihenfolge durch Spieler.

### 4c Aufräumen (Ende Aktionsphase)
1. Aktionssteine zurück an Charaktere
2. Neutrale Zusatzsteine entfernen/zurücklegen
3. **Zukünftige** → **verfügbare** Ressourcen verschieben
4. Entdeckungsplättchen verschieben (2-Nahrung-Plättchen sofort eintauschen)
5. Gebaute Erfindungen: Effekte anwenden → Gegenstandsseite → Spielbrett
6. Schätze ausführen / bereitstellen

Details zu einzelnen Aktionen: siehe `aktionen.md`.

### App: Abfragen / Berechnungen
- [ ] Pro Aktion: Steine, Ausführender, Zielort, reservierte Ressourcen
- [ ] Risiko-Aktionen (1 Stein): 3 Aktionswürfel werfen (Reihenfolge: Verwundung → Erfolg → Abenteuer)
- [ ] Sichere Aktionen (2 Steine, Ausnahmen bei Jagen): automatischer Erfolg
- [ ] Unerfüllter Bedarf in Aktionsphase: nur **ausführender** Charakter erleidet Wunden

---

## 5. Wetterphase (`weather`)

### Vorbereitung
- Würfel laut **Szenariotafel** (Rundenleiste) – Anzahl/Art variiert.
- Wetterplättchen auf Wetterfeld zusätzlich werten (auch wenn nicht gewürfelt wird).
- Tierwürfel nur 1× pro Runde, auch bei mehrfachen Auslösern.

### 5.1 Das Wetter (Regen-/Winterwürfel)
1. **Schneewolken** zählen (Würfel + Marker) → je 1 Holz abgeben, sonst jeder im Lager 1 Wunde (Dach irrelevant).
2. **Gesamtwolken** (Regen + Schnee) vs. **Dachstärke** → für jede ungeschützte Wolke je 1 Nahrung **und** 1 Holz, sonst je 1 Wunde pro fehlender Ressource.

### 5.2 Die Wildnis (Tierwürfel)
| Würfelergebnis | Effekt | Bei Nichterfüllung |
|----------------|--------|---------------------|
| Nahrung abgeben | 1 Nahrung | jeder Charakter 1 Wunde |
| Palisade −1 | Palisadenstärke senken | bei 0: jeder 1 Wunde |
| Kampf Stärke 3 | Kampf vs. Waffenstärke | Differenz = Wunden (alle) |

### 5.3 Der Sturm
- Sturmplättchen **zuletzt**: Palisade −1 oder jeder 1 Wunde.
- Danach alle Wetterplättchen ablegen.

### App: Abfragen / Berechnungen
- [ ] Szenario: welche Würfel diese Runde?
- [ ] Schneewolken / Regenwolken / Dachstärke / Palisadenstärke / Waffenstärke
- [ ] Ressourcenabgaben und Wunden (alle Charaktere im Lager, sofern nicht anders vermerkt)
- [ ] Charaktere außerhalb des Lagers (Nacht außerhalb): **kein** Wettereffekt

---

## 6. Nachtphase (`night`)

### Optionale Heilung (zu Beginn)
- Heilung durch Gegenstände, Schätze, Entdeckungsplättchen (außer Ausruhen/sofort-Heilung).
- Spezielle Verletzungen nicht heilbar auf diesem Weg.

### Schritte (strikt nacheinander)
| schritt | beschreibung | app_check |
|---------|--------------|-----------|
| 1 | **Essen:** je Charakter 1 Nahrung (auch unverderblich); wer nicht isst → 2 Wunden | `food_per_character` |
| 2 | **Lager verlegen?** optional auf angrenzendes Inselteil | `camp_move`, Dach/Palisade-Halbierung, natürlicher Unterschlupf |
| 3 | **Schlafen im Freien:** ohne Unterschlupf (gebaut oder natürlich am Lagerort) → je 1 Wunde | `shelter_status` |
| 4 | **Verderbliche Nahrung:** nicht lagerfähig → abgeben | `perishable_food` |
| 5 | **Charakter-Fähigkeiten:** graue Marker von besonderen Fähigkeiten entfernen | `ability_used_reset` |
| 6 | **Rundenende:** Rundenmarker +1, Startspieler im Uhrzeigersinn | `round++`, `first_player_rotate` |

### Lager verlegen – Konsequenzen (Kurz)
- Gebauter Unterschlupf bleibt; Dach- und Palisadenstärke **halbieren** (aufrunden).
- Nur natürlicher Unterschlupf verlassen → Dach **und** Palisade auf 0 (außer vorher gebauter Unterschlupf).
- `+`-Marker auf altem Teil: bei Produktion auf neuem Teil mit `+` je 1 Wunde pro betroffene Runde.

### Nacht außerhalb des Lagers
- Material der Aktion auf Charaktertafel (privat bis Rundenende).
- Keine Wettereffekte; ggf. 1 Wunde (freies Feld) + Essen von Tafel oder +2 Wunden.

### App: globale Sieg/Niederlage-Prüfung
- Charakter stirbt (Verwundungsmarker am Ende) → sofortiges Verlieren (Basisregel).
- Szenarioziel / Rundelimit → siehe Szenario-Datei.

---

## Regel: Unerfüllter Bedarf (alle Phasen)

Wenn geforderte Abgaben/Stärkesenkungen nicht möglich sind:
- **Ereignisphase** (nicht Kampf): alle Charaktere je 1 Wunde pro fehlendem Punkt.
- **Ereignisphase** Kampf: nur Startspieler.
- **Aktionsphase:** nur ausführender Charakter.
- **Sonstige Phasen:** alle Charaktere.
- Vorhandenes muss abgegeben werden; freiwillige Wunden statt Abgabe **nicht** erlaubt (außer „Wenn möglich“-Effekte).
