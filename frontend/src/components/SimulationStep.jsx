import { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import "./SimulationStep.css";

const API = "http://localhost:8000";

export default function SimulationStep({ simStep, prevSuccess, onCorrect }) {
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/simulations/view-student-list/steps`)
      .then((r) => r.json())
      .then(setSteps);
  }, []);

  if (!steps.length) return <p className="loading">Loading…</p>;

  const step = steps[simStep];

  function handleClick(e) {
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const { x1, y1, x2, y2 } = step.hotspot;

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      setError(null);
      setSuccessToast(step.correct);
      setTimeout(() => {
        setSuccessToast(null);
        onCorrect(step.correct, steps.length);
      }, 1500);
    } else {
      setError(step.incorrect);
    }
  }

  return (
    <div className="sim-step">
      <p className="step-label">Step {simStep + 1} of {steps.length}</p>

      {error && <div className="error-toast">❌ {error}</div>}
      {successToast && <div className="success-toast">✅ {successToast}</div>}

      <div className="instruction">
        <span className="instruction-icon">📋</span>
        <span dangerouslySetInnerHTML={{ __html: step.intro_text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
      </div>

      <div className="image-wrapper">
        <img
          ref={imgRef}
          src={`${API}/images/${step.slide_filename}`}
          alt={`Step ${simStep + 1}`}
          onClick={handleClick}
          draggable={false}
        />
      </div>

      <ChatBar />
    </div>
  );
}
