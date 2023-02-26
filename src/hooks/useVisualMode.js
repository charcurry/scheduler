import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      history.pop()
      history.push(newMode)
      setHistory(history)
      setMode(newMode);
    } else {
      setMode(newMode);
      history.push(newMode)
      setHistory(history)
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop()
      setHistory(history)
    }
  }

  return { "mode": mode, transition, back };
};