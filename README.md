# SolarDrive

Educational university project site for a solar-assisted electric vehicle concept. Flexible panels on the roof capture sunlight for accessories, an auxiliary battery, or a small contribution to slow charging. The site is a frontend showcase. It does not claim that a roof array can propel a car.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Stack

React, Vite, JavaScript, Tailwind CSS, Lucide React, and Framer Motion. There is no backend, database, authentication, or API key.

## Calculator

Daily energy (Wh) = panel power (W) × peak sun hours × efficiency.

Divide by 1000 for kWh. Monthly energy multiplies the daily result by 30. Results are estimates. Real output depends on weather, shading, orientation, temperature, location, and system losses.

## Test table

The testing table is example data for the layout. Replace it after a real experiment. It is not a measurement from this project.

## Project structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── ProblemSection.jsx
│   ├── HowItWorks.jsx
│   ├── EnergyFlow.jsx
│   ├── Prototype.jsx
│   ├── SlideOutDemo.jsx
│   ├── EnergyUses.jsx
│   ├── SolarCalculator.jsx
│   ├── Testing.jsx
│   ├── Advantages.jsx
│   ├── FutureIdeas.jsx
│   ├── FinalCta.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```
