

# Designförbättringar: Hero-bild och Process-ikoner

## Sammanfattning
Förbättra Hero-sektionen med en bakgrundsbild istället för enfärgad orange, samt lägga till passande ikoner för varje steg i "Vår Process"-sektionen.

---

## Del 1: Hero-sektion med bakgrundsbild

### Nuvarande läge
Hero-sektionen har en solid orange gradient-bakgrund (`bg-gradient-to-br from-primary via-primary to-primary/90`) med ett subtilt SVG-mönster.

### Förslag
Ersätta den solida färgen med en industriell/metallurgisk bakgrundsbild som passar företagets profil. Bilden får en mörk overlay för att behålla läsbarheten på den vita texten.

### Teknisk implementation
- Lägga till en bakgrundsbild (t.ex. industriell/metallurgisk bild)
- Använda en gradient-overlay ovanpå bilden för att behålla textkontrasten
- Behålla den orangea accent-färgen genom overlayen
- Eventuellt lägga till en subtil parallax-effekt vid scroll

---

## Del 2: Ikoner i Process-sektionen

### Nuvarande läge
Varje processteg visar endast ett nummer (01, 02, 03, 04), titel och beskrivning.

### Förslag
Lägga till relevanta Lucide-ikoner ovanför titlarna i varje steg:

| Steg | Titel | Ikon |
|------|-------|------|
| 01 | Konsultation | `MessageSquare` eller `Users` |
| 02 | Leverantörsmatchning | `Search` eller `Link` |
| 03 | Kvalitetskontroll | `CheckCircle` eller `Shield` |
| 04 | Leverans | `Truck` eller `Package` |

### Teknisk implementation
- Importera lämpliga ikoner från `lucide-react`
- Lägga till ikonen i varje kort, placerad mellan numret och titeln (eller ersätta numret med ikonen)
- Styla ikonerna med accent-färgen för att matcha designen
- Ikonstorleken anpassas för att vara visuellt balanserad

---

## Filer som kommer att ändras

1. **`src/components/sections/Hero.tsx`**
   - Ta bort solid gradient-bakgrund
   - Lägga till bakgrundsbild med `background-image` CSS
   - Lägga till mörk gradient-overlay för läsbarhet

2. **`src/components/sections/Process.tsx`**
   - Importera ikoner från lucide-react
   - Uppdatera `steps`-arrayen med ikon-referenser
   - Rendera ikoner i varje processkort

3. **Eventuellt skapa/ladda upp en hero-bakgrundsbild**
   - Industriell/metallurgisk bild som passar varumärket

---

## Visuellt resultat

**Hero-sektion:**
- Professionell bakgrundsbild (t.ex. metallurgi, industri, tillverkning)
- Mörk orange/brun overlay för att behålla varumärkesfärgen
- Texten förblir vit och tydligt läsbar

**Process-sektion:**
- Varje kort får en tydlig ikon som snabbt kommunicerar vad steget handlar om
- Ikonerna är i accent-färgen (orange) för visuell enhetlighet
- Numren kan behållas eller tas bort beroende på preferens

