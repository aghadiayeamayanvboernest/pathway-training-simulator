import byuLogo from "../../images/pathway.png";
import "./Sidebar.css";

const TOTAL_STEPS = 2;

export default function Sidebar({ open, onToggle, started, phase, simStep, onStart }) {
  const progress = phase === "end" ? 1 : (simStep + 1) / TOTAL_STEPS;
  const progressLabel = phase === "end" ? "Simulation complete" : `Step ${simStep + 1} of ${TOTAL_STEPS}`;

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <button className="sidebar-toggle" onClick={onToggle} title={open ? "Collapse sidebar" : "Expand sidebar"}>
        ☰
      </button>

      <div className="sidebar-inner">
        <div className="sidebar-logo">
          <img src={byuLogo} alt="BYU Pathway Worldwide" />
        </div>
        <hr />

        <span className="sidebar-label">Choose a simulation:</span>
        <select className="sidebar-select">
          <option>View Student List</option>
        </select>

        <button className="sidebar-start-btn" onClick={onStart}>
          ▶ Start Simulation
        </button>

        {started && (
          <div className="sidebar-footer">
            <div className="progress-label">{progressLabel}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
