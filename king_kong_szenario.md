# Szenario: King Kong auf der Totenkopfinsel

> Quellen: `Robinson_Crusoe_dt_Ausgabe_-_Zusatzmaterial_01.pdf` (Szenariotafel), ergänzt durch Basisregeln `54da8b894764c.pdf` und offizielle Szenario-7-Regeln (Pegasus/Dized).

```yaml
scenario_id: king_kong
scenario_number: 7
name: "King Kong auf der Totenkopfinsel"
rounds: 10
recommended_players: 1-4
```

---

## Sieg und Niederlage

### Sieg (`win`)
Alle Bedingungen gleichzeitig:
- **3 Fallen** (blaue Marker) auf verschiedenen Inselteilen mit Totem-Symbol gebaut
- **Spezielle Jagd** gegen King Kong erfolgreich abgeschlossen (siehe unten)
- **Regisseur** lebt
- **Schauspielerin** nicht in King Kongs Fängen (kein schwarzer Marker auf ihrem Crew-Feld)
- Alle Charaktere am Leben („Licht, Kamera, Action!“)

### Niederlage (`lose`)
| bedingung | sofort |
|-----------|--------|
| Regisseur stirbt | ja |
| Runde 10 endet ohne Fang von King Kong | ja |
| Standard: Charakter stirbt | ja (Basisregel) |

---

## Spielaufbau (Abweichungen)

| element | regel |
|---------|--------|
| Lager | Start mit **Unterschlupf-Seite** des Lagerplättchens (Shelter bereits aktiv) |
| Charakter Soldat | Darf bei **1–2 Spielern** verwendet werden |
| Szenariotafel | Keine klassische Rundenleiste mit Wetter pro Feld wie Basis-Szenarien 1–6; **10 Runden** mit szenariospezifischer Wetter-/Ereignislogik auf der Tafel |
| Totem-Marker | Bei jedem aufgedeckten Totem (Versteck King Kongs): **nummerierter Marker** in aufsteigender Reihenfolge (1, 2, 3, …) |
| Ereignisstapel | Standard-Aufbau; Sonderregel **Drehbuch** (siehe Entdeckungsplättchen) |

### Optionale Schwierigkeit
> „Um das Szenario schwieriger zu machen … folgende Regel verwenden“

Immer wenn ein Charakter in der **Nachtphase nichts isst**, stirbt **zusätzlich** ein Mitglied der Filmcrew (niedrigste Nummer unter den noch Lebenden) – zusätzlich zu den normalen 2 Wunden des Charakters.

---

## Filmcrew

Die Crew ist **keine spielbare Figur**, sondern ein **gemeinsamer Status** auf der Szenariotafel. Jedes Mitglied hat eine **Nummer** (Todes-/Entführungsreihenfolge).

| nr | rolle | status_feld | besonderheit |
|----|-------|-------------|--------------|
| 1 | Licht | tot möglich | Entdeckungsvorteil: siehe `film_crew_lost_item` |
| 2 | Kamera | tot möglich | |
| 3 | Jan | tot möglich | |
| 4 | Drehbuch | tot möglich | Einmalig: oberste Ereigniskarte in Ereignisphase ansehen |
| 5 | Make-up | tot möglich | |
| 6 | Schauspielerin | **entführt** statt tot | Sieg unmöglich solange entführt; Rettung siehe unten |
| 7 | Stuntman | tot möglich | |
| 8 | Schauspieler | tot möglich | |
| 9 | Regisseur | tot möglich | **Tod = sofortige Niederlage** |

### Statuswerte (App)
```yaml
crew_member_status:
  alive: true
  dead: false          # schwarzer Marker auf Tot-Feld
  captured: false      # nur Schauspielerin (King Kong)
```

### Crew stirbt – allgemeine Regel
Wenn ein Crew-Mitglied „stirbt“:
1. Schwarzen Marker auf das **Tot-Feld** unter dem Foto legen.
2. Moral −1 (falls anwendbar).
3. **Schauspielerin:** kein Tod → stattdessen **Entführung** (Marker trotzdem auf Entführungsfeld / King-Kong-Versteck).

**Reihenfolge:** Immer das noch **lebende** Mitglied mit der **niedrigsten Nummer**.

### Auslöser für Crew-Tod

| auslöser | effekt |
|----------|--------|
| **Buchsymbol** auf Ereigniskarte | Niedrigstes lebendes Crew-Mitglied „stirbt“ + Moral −1 |
| **Wetterphase:** Palisade würde unter 0 fallen (pro Wurf des roten Würfels je nummeriertem Marker) | Statt Palisaden-Regel: (1) jeder Charakter 1 Wunde, (2) Moral −1, (3) niedrigstes lebendes Crew-Mitglied stirbt |
| **Optionale Schwierigkeit** | Charakter isst nicht in Nachtphase → zusätzlich 1 Crew-Tod |

### Crew-Vorteil: Verlorener Gegenstand der Filmcrew
Entdeckungsplättchen **Filmcrew-Gegenstand** (`film_crew_lost_item`):
- Sofort Vorteil des **niedrigst nummerierten noch lebenden** Crew-Mitglieds laut Szenariotafel.

---

## Sonderregeln nach Phase

### Produktionsphase
```yaml
if camp_tile.has_totem:
  each_character: +1 wound
```

### Ereignisphase
- **Drehbuch (Crew #4):** Einmal pro Spiel – vor Auswertung der gezogenen Karte die **oberste Ereigniskarte** des Stapels ansehen (kein weiterer Effekt).
- **Buchsymbol:** Crew-Tod (siehe oben), Schauspielerin → Entführung.

### Wetterphase
- Pro **nummeriertem Token** auf dem Brett: **roten Würfel** (hungrige Tiere) **1×** werfen.
- Jeder Wurf, der Palisade unter 0 senken würde → **Ersatzfolge** (3 Schritte, siehe oben), nicht normale Palisaden-Regel.

### Nachtphase
| bedingung | effekt |
|-----------|--------|
| Lager auf Inselteil **mit Totem** | Jeder Spieler **zusätzlich** 1 Wunde (zusätzlich zu Basis-Nachtregeln) |
| Charakter isst nicht + optionale Regel | +1 Crew-Tod |

### Charakter außerhalb des Lagers
- Wettereffekte betreffen ihn nicht (Basisregel).
- Wenn das noch lebende Crew-Mitglied mit niedrigster Nummer auf demselben Inselteil „von King Kong getötet“ würde → **Signalpistole** kann einmalig verwendet werden, um dies zu verhindern (Funktion laut Szenariotafel).

---

## Spezielle Erfindungen

### Falle (`trap`)
```yaml
invention_id: trap
repeatable: true
limit_per_tile: 1
```

| | |
|-|-|
| **Bauen** | Aktion Bauen; Erfindung „Falle“ |
| **Platzierung** | Blauer Marker auf Inselteil **mit Totem**; Lager oder bis **2 Felder** entfernt (Distanzregel: +1 Aktionsstein pro Inselteil zwischen Lager und Ziel, wie bei Sammeln/Erforschen) |
| **Ziel** | Insgesamt **3 Fallen** auf **verschiedenen** Inselteilen |
| **Marker** | `trap_count` 0–3; Sieg bei 3 vor Kong-Jagd |

### Betäubungsmittel (`tranquilizer`)
```yaml
invention_id: tranquilizer
effect:
  king_kong_hunt_weapon_penalty: -1   # statt -5
```

---

## Spezielle Aktionen

### Spezielle Jagd – King Kong fangen (`hunt_king_kong`)

**Voraussetzungen:**
- `trap_count == 3`
- **Genau 2 Aktionssteine** (wie normale Jagd)
- Ausführender Charakter führt Kampf aus

**Modifikatoren:**
| | waffen_malus |
|-|----------------|
| Ohne Betäubungsmittel | −5 auf effektive Waffenstärke (nur für diesen Kampf) |
| Mit Betäubungsmittel gebaut | −1 |

**Ablauf:** Standard-Kampf (wie `aktionen.md` → Jagen), gegen King Kong laut Szenariotafel (Stärke/Effekte auf Tafel; Kampfbox „IM KAMPF GEGEN KING KONG“).

**Konsequenzen:**
| ergebnis | effekt |
|----------|--------|
| Erfolg | Szenario gewonnen (wenn alle Siegbedingungen erfüllt) |
| Misserfolg | Kong nicht gefangen; Partie läuft weiter bis Runde 10 |

```yaml
action_id: hunt_king_kong
required_pawns: 2
requires_traps: 3
weapon_modifier: -5 | -1
```

### Schauspielerin retten (`rescue_actress`)

**Voraussetzungen:**
- Schauspielerin **entführt** (Marker auf Entführungsfeld)
- **Spezielle Erforschung** auf Inselteil mit **Totem #4** (falls weniger als 4 Totems entdeckt: erst erforschen bis Totem 4 vorhanden)

**Ablauf:**
1. Spezielle Explore-Aktion auf Totem-4-Feld (Distanz-/Stein-Regeln wie Erforschen).
2. **1 Geheimniskarte** ziehen.
3. Nur Ergebnis **Kreatur** ausführen; Schatz/Falle/andere Typen ignorieren.
4. Schwarzen Marker von Schauspielerin entfernen.

**Konsequenzen:**
| ergebnis | effekt |
|----------|--------|
| Erfolg | Schauspielerin befreit; Sieg wieder möglich |
| Misserfolg | Entführung bleibt; ggf. Kampf-/Wundfolgen der Kreatur |

```yaml
action_id: rescue_actress
required_pawns: <distance_based>
mystery_draws: 1
resolve_only: creature
```

---

## Spezielle Entdeckungsplättchen (Szenario)

| id | name (DE) | effekt | nutzung |
|----|-----------|--------|---------|
| `vodka` | Flasche Wodka | Moral +1 | sofort |
| `giant_footprint` | Riesiger Affenfuß | 1× grüner Erforschungs-Aktionsstein (nur diese Runde) | sofort |
| `firecracker` | Böller | 1 Ergebnis des roten Würfels ignorieren | bei Wetter |
| `film_crew_lost_item` | Verlorener Filmcrew-Gegenstand | Vorteil des niedrigst nummerierten lebenden Crew-Mitglieds | sofort |
| `signal_flare` | Signalpistole | Verhindert einmalig Crew-Tod durch King Kong auf dem Inselteil (Nacht außerhalb Lager) | einmalig |

---

## Totem-Symbole (Verstecke King Kongs)

| ereignis | effekt |
|----------|--------|
| Inselteil mit Totem aufgedeckt | Nummerierten Marker legen (1., 2., 3. … Versteck) |
| Falle bauen | Nur auf/nahe Totem-Felder |
| Lager auf Totem-Feld | Produktion: jeder 1 Wunde; Nacht: jeder zusätzlich 1 Wunde |
| Totem #4 | Ort für Rettung der Schauspielerin |

---

## App-State (empfohlenes `gameState`-Schema)

```yaml
scenario: king_kong
round: 1-10
traps_placed: 0-3
trap_tiles: [<tile_id>, ...]
kong_captured: false
crew:
  - { id: 1, role: licht, alive: true, captured: false }
  - { id: 2, role: kamera, alive: true, captured: false }
  # ... bis 9 regisseur
actress_captured: false
director_alive: true
optional_hunger_crew_death: false
totems_discovered: 0
tranquilizer_built: false
special_tokens:
  script_peek_used: false
  signal_flare_used: false
```

---

## Abhängigkeiten zu Basis-Dateien

| thema | datei |
|-------|--------|
| Phasenablauf | `phasen.md` |
| Standard-Aktionen, Kampf, Würfel | `aktionen.md` |
| Unerfüllter Bedarf, Moral, Nahrung | `phasen.md` |

Bei Konflikt gilt **diese Datei** für King-Kong-Sonderfälle; sonst Basisregeln.
