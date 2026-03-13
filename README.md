# Solsving - Väder & Minigolf Finder

Solsving är en enkel webbapplikation som tillåter en sökning på valfri stad och tillbaka får man följande:
-  7-dagars väderprognos
-  Minigolfbanor inom 10km
-  Direktlänk till Googlemaps för vägledning
-  En responsiv design byggd med vite

Projektet är utvecklat som en del av kursen Frontend-baserad webbutveckling (DT211G)

## Funktioner 
- Sök efter valfri plats
- Hämtar koordinater från Google Geocoding API
- Visar en tydlig 7-dagars prognos med ikoner, min och max temperatur med veckodag
- Hämtar minigolfbanor inom 10km radiu
- Fallback-namn då banor ej har något registrerat namn.
- Fade in animation och loader för bättre användbarhet
- Responsiv layout för mobil och desktop

## Tekniker och API:er
- **Vite** som utvecklingsmiljö
- **SCSS** modulär styling
- **Open-Mateo API** för väderdata
- **Geoapify Places API** för information om minigolfbanor
- **Google Geocoding API** för att hämta koordinater
- **Font Awesome** för ikoner (väder & brand i footer)

## Installation
Klona projektet:
```
git clone https://github.com/Punttt/vite-solsving.git
cd vite-solsving
```

Installer, starta & bygga:
```
npm install
npm run dev
npm run build
```
## Live-Demo (Publicering)
**Webbsida:** https://solsving.netlify.app/ </br>
**JSdocs:** https://punttt.github.io/vite-solsving/

## Utvecklare
**Pontus Johansson** </br>
Portfolio: https://puntfolio.netlify.app/
