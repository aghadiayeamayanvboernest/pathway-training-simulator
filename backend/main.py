from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173", "http://localhost:4173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent
EXCEL_FILE = BASE_DIR / "My_Gatherings_Simulation.xlsx"
SCREENSHOT_DIR = BASE_DIR / "Screenshot"

app.mount("/images", StaticFiles(directory=str(SCREENSHOT_DIR)), name="images")

COLS = ["intro_text", "slide_filename", "click_target", "correct_response", "incorrect_response"]

HOTSPOT_FRACTIONS = {
    0: (0.610, 0.044, 0.708, 0.117),
    1: (0.607, 0.109, 0.726, 0.185),
}


def load_steps() -> list[dict]:
    df = pd.read_excel(
        EXCEL_FILE,
        sheet_name="Simulation - View Student List",
        header=0,
        skiprows=[1, 2],
        nrows=2,
    )
    df.columns = COLS
    steps = []
    for i, (_, row) in enumerate(df.iterrows()):
        filename = str(row["slide_filename"]).strip()
        hs = HOTSPOT_FRACTIONS[i]
        steps.append({
            "id": i,
            "intro_text": str(row["intro_text"]).strip(),
            "slide_filename": filename,
            "correct": str(row["correct_response"]).strip(),
            "incorrect": str(row["incorrect_response"]).strip(),
            "hotspot": {"x1": hs[0], "y1": hs[1], "x2": hs[2], "y2": hs[3]},
        })
    return steps


SIM_STEPS = load_steps()


@app.get("/api/simulations")
def get_simulations():
    return [{"id": "view-student-list", "name": "View Student List"}]


@app.get("/api/simulations/{sim_id}/steps")
def get_steps(sim_id: str):
    return SIM_STEPS
