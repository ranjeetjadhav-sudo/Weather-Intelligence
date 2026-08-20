# Weather Intelligence App

A modern, responsive, single-page web application designed to provide real-time weather forecasting, temperature visualizations, and intelligent planning recommendations. This application was built using Google AI Studio App Build and deployed seamlessly via Cloudflare Pages.

## Core Features
- **Real-Time City Search:** Finds and loads coordinates for cities globally.
- **Current Weather Conditions:** Displays temperature, wind speed, weather conditions, and relative iconography.
- **7-Day Forecast:** Structured daily forecast cards highlighting expected temperature ranges.
- **Temperature Trend Chart:** An interactive and responsive visual chart charting temperature progression over 7 days.
- **Weather-Based Planning Insights:** Client-side logical recommendations tailored to daily weather conditions (e.g., advising on indoor vs. outdoor activities).
- **Graceful Error Handling:** Helpful system prompts for missing cities or failed network queries.

## API Integration (No Keys Required)
The app integrates directly with public, keyless APIs from Open-Meteo:
1. **Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search` (Converts city names to latitude and longitude).
2. **Forecast API:** `https://api.open-meteo.com/v1/forecast` (Retrieves current weather details and 7-day forecast data).

---

## Deployment & Setup Guide

### 1. Connecting Google AI Studio to GitHub
To sync your prototype to GitHub directly from Google AI Studio:
1. In your AI Studio project, click the **Export / Connect to GitHub** button.
2. Complete the OAuth verification process to authorize Google AI Studio to access your GitHub account.
3. Configure the repository details (name your repository and set visibility).
4. Click **Create** to automatically package and push the source code to your GitHub account.

### 2. Deploying to Cloudflare Pages
Once your repository is updated on GitHub, deploy it to Cloudflare Pages:
1. Log into your Cloudflare account and navigate to **Pages** under the Workers & Pages dashboard.
2. Select **Connect to Git** and choose the connected GitHub repository containing this project.
3. In the Build Configuration screen, apply the standard settings:
   - **Framework Preset:** None (or select Vite if prompted)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**. Cloudflare will automatically build and publish your project, generating a unique `pages.dev` live URL.
