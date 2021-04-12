import React, { useEffect, useState } from "react";
import "./Stopwatch.css";

/** TODO add docstring */
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    function renderResetBtn() {
      let disResBtn = document.getElementById("resetBtn");
      if (running || !time) {
        disResBtn.disabled = true;
        disResBtn.classList.add("disabled");
      } else {
        disResBtn.disabled = false;
        disResBtn.classList.remove("disabled");
      }
    }
    renderResetBtn();
  }, [running, time])

  function handleStart() {
    setRunning(true);
    setTimerId(
      setInterval(() => {
        setTime((t) => t + 1);
      }, 10)
    );
  }

  function handleStop() {
    setRunning(false);
    clearInterval(timerId);
  }

  function handleReset() {
    setTime(0);
  }

  function getHours() {
    let hoursCount = Math.floor(time / 100 / 60 / 60);
    let hoursString = "0".concat(hoursCount.toString(10));
    return hoursString.split("").slice(-2).join("");
  }

  function getMinutes() {
    let minutesCount = Math.floor(time / 100 / 60);
    let minutesString = "0".concat(minutesCount.toString(10));
    return minutesString.split("").slice(-2).join("");
  }

  function getSeconds() {
    let secondsCount = Math.floor((time / 100) % 60);
    let secondsString = "0".concat(secondsCount.toString(10));
    return secondsString.split("").slice(-2).join("");
  }

  function getMilliseconds() {
    return ("0" + (time % 100)).slice(-2);
  }

  let StartStopButton =
    running === false ? (
      <button id="startBtn" className="btns" onClick={handleStart}>Start</button>
    ) : (
      <button id="stopBtn" className="btns" onClick={handleStop}>Stop</button>
    );
  
  let resetButton =
    <button
      id="resetBtn" className="btns"
      onClick={handleReset}>Reset</button>

  return (
    <div className="Stopwatch">
      <p
        className="Stopwatch-p"
        style={{ fontFamily: 'Orbitron, sans-serif' }}>
        <span>{getHours()}</span>:
        <span>{getMinutes()}</span>:
        <span>{getSeconds()}</span>:
        <span>{getMilliseconds()}</span>
      </p>
      <div>
        {StartStopButton}
        {resetButton}
      </div>
    </div>
  );
}

export default Stopwatch;
