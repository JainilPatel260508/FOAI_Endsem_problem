# AstroHub: ISS + News + AI Dashboard

A production-ready, real-time dashboard for tracking the International Space Station, monitoring global space news, and interacting with an AI assistant grounded in real-time telemetry.

## Features

- **ISS Live Tracking**: Real-time position updates (every 15s) with Leaflet map trajectory.
- **Orbital Analytics**: Speed calculation using Haversine formula and live history charts.
- **Personnel Monitoring**: List of all astronauts currently in space.
- **Global Space News**: Filterable news feed with caching and category distribution charts.
- **AstroAI Assistant**: A floating chatbot (Mistral-7B) restricted to dashboard data.
- **Modern UI/UX**: Dark mode, glassmorphism, responsive design, and smooth animations (Framer Motion).

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet.js / React-Leaflet
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP**: Axios

## Prerequisites

- Node.js (v18+)
- NewsAPI Key (Get at [newsapi.org](https://newsapi.org/))
- HuggingFace Token (For Mistral AI)

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_AI_TOKEN=your_huggingface_token
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Folder Structure

```text
src/
├── api/          # API utilities
├── components/   # Reusable UI components
├── pages/        # Main route pages
├── hooks/        # Custom React hooks
├── store/        # Zustand state management
├── utils/        # Calculation & formatting helpers
├── layouts/      # Sidebar and Navbar
├── chatbot/      # AI assistant implementation
├── styles/       # Tailwind & Global CSS
├── services/     # API service layers
└── constants/    # App-wide constants
```

## AI Grounding Rule
The chatbot uses a strict system prompt to only answer using:
- Live ISS Coordinates
- Calculated Orbital Speed
- Astronaut Names & Count
- Latest News Headlines
# FOAI_Endsem_problem
# FOAI_Endsem_problem
# FOAI_Endsem_problem
