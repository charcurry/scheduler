import { useState } from "react";

// deals with logic to do with transitioning from state to state on a given appointment
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transitions from one state to the next and adds to the history, or if enabled replaces the last element in the history array
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

  // transitions back one state in the history array
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop()
      setHistory(history)
    }
  }

  return { "mode": mode, transition, back };
}