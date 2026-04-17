# BYU Pathway — My Gatherings Training Simulator

An interactive training tool that helps BYU Pathway missionaries practice navigating the **My Gatherings** app before working with real students. Missionaries click through real screenshots of the app and receive instant feedback on whether they clicked the correct area.

---

## What It Does

- Presents step-by-step simulations driven by an Excel spreadsheet
- Missionaries click on the correct area of a screenshot to advance
- Instant feedback — green toast for correct clicks, red toast for incorrect ones
- Supports multiple simulations via a dropdown selector
- Light / Dark / System theme toggle
- Chat bar for asking questions (AI integration coming soon)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | FastAPI + Uvicorn |
| Data | Excel (pandas + openpyxl) |
| Language | JavaScript (frontend), Python 3.11+ (backend) |

---

## Project Structure

```
pathway-training-simulator/
├── backend/        # FastAPI server — steps API + image serving
├── frontend/       # React + Vite app — UI and simulation flow
└── README.md       # You are here
```

---

## Quick Start

You need **Node.js 18+** and **Python 3.11+** installed.

**1. Clone the repo**
```bash
git clone <repo-url>
cd pathway-training-simulator
```

**2. Start the backend**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**3. Start the frontend** (new terminal tab)
```bash
cd frontend
npm install
npm run dev
```

**4. Open your browser**
```
http://localhost:5173
```

---

## Adding a New Simulation

1. Add a new sheet to `backend/My_Gatherings_Simulation.xlsx`
2. Add screenshot files to `backend/Screenshot/`
3. Register the new simulation in `backend/main.py`
4. Add the simulation option to the sidebar dropdown in `frontend/src/components/Sidebar.jsx`

---

See [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md) for detailed setup instructions for each layer.
