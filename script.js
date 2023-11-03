const formatNumber = (num) => {
    return (
      num < 10 && num >= 0
        ? '0' + num 
      : '' + num
    )
}

function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState({
    minutes: formatNumber(sessionLength),
    seconds: formatNumber(0)
  });
  const [intervalId, setIntervalId] = React.useState(null);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const [audio, setAudio] = React.useState(null);
  const [pause, setPause] = React.useState(false);
  const [session, setSession] = React.useState(true);

  
  React.useEffect(() => {
    setAudio(document.getElementById("beep"));
  }, []);

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    clearInterval(intervalId);
    setIntervalId(null);
    setTimerLabel("Session");
    setTimeLeft({
      minutes: formatNumber(sessionLength),
      seconds: formatNumber(0)
    });
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  
  const handleIncrease = (id) => {
    if (intervalId === null) {
      if (id == 'break-increment' && breakLength < 60) {
        setBreakLength(breakLength + 1)
        
        timerLabel == "Break"
        ? setTimeLeft({
          minutes: formatNumber(breakLength + 1),
          seconds: formatNumber(0)
        })
        : null
      } else if (id == 'session-increment' && sessionLength < 60) {
        setSessionLength(sessionLength + 1)
        
        setTimeLeft({
          minutes: formatNumber(sessionLength + 1),
          seconds: formatNumber(0)
        })
      }
    }
  }
  
  const handleDecrease = (id) => {
    if (intervalId === null) {
      if (id == 'break-decrement' && breakLength > 1) {
        setBreakLength(breakLength - 1)
        
        timerLabel == "Break"
        ? setTimeLeft({
          minutes: formatNumber(breakLength - 1),
          seconds: formatNumber(0)
        })
        : null
      } else if (id == 'session-decrement' && sessionLength > 1) {
        setSessionLength(sessionLength - 1)
        
        setTimeLeft({
          minutes: formatNumber(sessionLength - 1),
          seconds: formatNumber(0)
        })
      }
    }
  }

  const handleStart = () => {
  if (intervalId === null) {
    const myInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft.seconds === '00') {
          if (prevTimeLeft.minutes === '00') {
            audio ? audio.play() : null
            if(timerLabel === "Session") {
              setTimerLabel(prev => (
                prev == 'Session' ? 'Break' : 'Session'
              ))
              return {
                minutes: formatNumber(breakLength),
                seconds: formatNumber(0)
              };
            } else if(timerLabel === "Break") {
              setTimerLabel(prev => (
                prev == 'Break' ? 'Session' : 'Break'
              ));
              return {
                minutes: formatNumber(sessionLength),
                seconds: formatNumber(0)
              } 
            }
          } else {
            return {
              minutes: formatNumber(prevTimeLeft.minutes - 1),
              seconds: formatNumber(59)
            };
          }
        } else {
          return {
            minutes: prevTimeLeft.minutes,
            seconds: formatNumber(prevTimeLeft.seconds - 1)
          };
        }
      });
    }, 1000);
    
      if (intervalId === null && pause == false ) {
        setTimeLeft({
          minutes: formatNumber(sessionLength),
          seconds: formatNumber(0)
        })
      }
    setIntervalId(myInterval);
  } else {
    clearInterval(intervalId);
    setIntervalId(null);
    setPause(true)
  }
};
  
  return (
    <div className="container">
      <h2>25 + 5 Clock</h2>

      <div className="session_break_length">
        <div id="break-label" className="length">
          <p>Break Length</p>
          <div className="btns">
            <button
              id="break-decrement"
              onClick={() => handleDecrease("break-decrement")}
            >
              <i class="fa-solid fa-arrow-down"></i>
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              id="break-increment"
              onClick={() => handleIncrease("break-increment")}
            >
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
        <div id="session-label" className="length">
          <p>Session Length</p>
          <div className="btns">
            <button
              id="session-decrement"
              onClick={() => handleDecrease("session-decrement")}
            >
              <i class="fa-solid fa-arrow-down"></i>
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              id="session-increment"
              onClick={() => handleIncrease("session-increment")}
            >
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="display">
        <p id="timer-label">{timerLabel}</p>
        <span id="time-left" style={
            +timeLeft.minutes <= 1 ? {color: 'red'} : null 
          }>{timeLeft.minutes + ':' + timeLeft.seconds}</span>
      </div>
      <div className='play-reset'>
        <button id="start_stop" onClick={handleStart}>
          <i className="fa-solid fa-play"></i>
          <i className="fa-solid fa-pause"></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fa-solid fa-rotate"></i>
        </button>
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      <em
        style={{
          fontSize:'24px',
            color:'orange',
              marginTop: '30px'
        }}  
        >Designed by Obiora Sopuluchukwu Emmanuel</em>
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById("root"));
