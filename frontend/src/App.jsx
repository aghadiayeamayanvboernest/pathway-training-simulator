import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SimulationStep from "./components/SimulationStep";
import EndScreen from "./components/EndScreen";
import SettingsMenu from "./components/SettingsMenu";
import ChatPanel from "./components/ChatPanel";
import byuLogo from "../images/pathway-horizontal-logo.png";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState("simulation");
  const [simStep, setSimStep] = useState(0);
  const [prevSuccess, setPrevSuccess] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        : theme;
    document.documentElement.setAttribute("data-theme", resolved);
  }, [theme]);

  function startSim() {
    setStarted(true);
    setPhase("simulation");
    setSimStep(0);
    setPrevSuccess(null);
    setCompleted(false);
  }

  function handleStepCorrect(successMsg, totalSteps) {
    const next = simStep + 1;
    if (next >= totalSteps) {
      setPhase("end");
      setPrevSuccess(successMsg);
    } else {
      setSimStep(next);
      setPrevSuccess(successMsg);
    }
  }

  function handleReset() {
    setStarted(false);
    setPhase("simulation");
    setSimStep(0);
    setPrevSuccess(null);
    setCompleted(false);
    setChatOpen(false);
  }

  const showChat = started && phase === "simulation";

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar-inner">
          <a href="/" className="top-bar-logo-link">
            <img src={byuLogo} alt="BYU Pathway Worldwide" className="top-bar-logo" />
          </a>
          <div className="top-bar-title-wrap">
            <h1 className="top-bar-title">My Gatherings Training Simulator</h1>
          </div>
          <SettingsMenu theme={theme} onThemeChange={setTheme} />
        </div>
      </header>

      <div className="body-row">
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
          started={started}
          phase={phase}
          simStep={simStep}
          onStart={startSim}
        />

        <main className="main-content">
          {!started && (
            <div className="welcome">
              <div className="welcome-card">
                <h1>My Gatherings Training Simulator</h1>
                <p>
                  Practice navigating the My Gatherings system before working with real students.
                </p>
                <div className="welcome-steps">
                  <div className="welcome-step">
                    <span className="welcome-step-num">1</span>
                    <span>Use the <strong>sidebar on the left</strong> to choose a simulation from the dropdown.</span>
                  </div>
                  <div className="welcome-step">
                    <span className="welcome-step-num">2</span>
                    <span>Click the <strong>▶ Start Simulation</strong> button in the sidebar to begin.</span>
                  </div>
                  <div className="welcome-step">
                    <span className="welcome-step-num">3</span>
                    <span>Follow the on-screen instructions and click the correct area in the screenshot.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {started && phase === "simulation" && (
            <SimulationStep
              simStep={simStep}
              prevSuccess={prevSuccess}
              onCorrect={handleStepCorrect}
            />
          )}

          {started && phase === "end" && (
            <EndScreen
              prevSuccess={prevSuccess}
              completed={completed}
              onComplete={() => setCompleted(true)}
              onReset={handleReset}
              onStartOver={startSim}
            />
          )}
        </main>

        {showChat && (
          <ChatPanel open={chatOpen} onToggle={() => setChatOpen((o) => !o)} />
        )}
      </div>
    </div>
  );
}
