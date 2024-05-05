function startTimer(durationSeconds = 25 * 60) {

  if (state.currentTodo && state.isWorkInterval) {
    clearInterval(state.timerIntervalId);

  // try to use the remaining time, else use the default start time
  let timerDurationS = state.timer.remainingTimeOnResume ?? durationSeconds;
  let minutes = 0;
  let seconds = 0;
  
  // activate the timer CSS
  const timerDisplay = document.getElementById("timer");
  timerDisplay.classList.add("timer-active"); // Add class when timer starts
  
  //   start the timer...
  state.timerIntervalId = setInterval(function updateTimerCountdown() {
    minutes = parseInt(timerDurationS / 60, 10); // 25
    seconds = parseInt(timerDurationS % 60, 10); // 0

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // updating the UI with the state
    document.getElementById("timerMinutes").textContent = minutes;
    document.getElementById("timerSeconds").textContent = seconds;
    document.getElementById("timer").classList.add("timer-active");
    // save the current remaining time to state
    state.timer.remainingTimeOnResume = timerDurationS;
    console.log(state.timer.remainingTimeOnResume);
    timerDurationS -= 1;
    // decrement the timer by 1s
    currentTomatoStartEnd();
    // handle when the timer runs out
    if (timerDurationS < 0) {
      clearInterval(state.timerIntervalId);
      if (state.isWorkInterval) {
        startTimer(300); // Start rest interval
        state.isWorkInterval = false;
        updateCurrentTomato();
      } else {
        startTimer(1500); // Start work interval
        state.isWorkInterval = true;
      }
    }
  }, 1 * 1000);
  } else if (!state.isWorkInterval) {

    let minutes = 0;
    let seconds = 0;
    
    // activate the timer CSS
    const timerDisplay = document.getElementById("timer");
    timerDisplay.classList.add("timer-active"); // Add class when timer starts
    
    //   start the timer...
    state.timerIntervalId = setInterval(function updateTimerCountdown() {
      minutes = parseInt(timerDurationS / 60, 10); // 25
      seconds = parseInt(timerDurationS % 60, 10); // 0
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      // updating the UI with the state
      document.getElementById("timerMinutes").textContent = minutes;
      document.getElementById("timerSeconds").textContent = seconds;
      document.getElementById("timer").classList.add("timer-active");
      // save the current remaining time to state
      state.timer.remainingTimeOnResume = timerDurationS;
    
      timerDurationS -= 1;
      // handle when the timer runs out
      if (timerDurationS < 0) {
        clearInterval(state.timerIntervalId);
        if (state.isWorkInterval) {
          startTimer(300); // Start rest interval
          state.isWorkInterval = false;       
        } else {
          startTimer(1500); // Start work interval
          state.isWorkInterval = true;
        }
      }
    }, 1 * 1000);
  } else {
    alert("Chose todo from table");
    return;
  }
  
} 

function pauseTimer() {
  clearInterval(state.timerIntervalId);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when paused
  updateCurrentTomato();
}

function stopTimer() {
  clearInterval(state.timerIntervalId);
  state.isWorkInterval = !state.isWorkInterval; // Toggle to next interval
  state.timer.remainingTimeOnResume = undefined; // Reset remaining time
  state.currentId = undefined;
  state.currentTodo = undefined;

  if (state.isWorkInterval) {
    timerDurationS = 25 * 60;
  } else {
    timerDurationS = 5 * 60;
  }

  minutes = parseInt(timerDurationS / 60, 10); // 25
  seconds = parseInt(timerDurationS % 60, 10); // 0

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // updating the UI with the state
  document.getElementById("timerMinutes").textContent = minutes;
  document.getElementById("timerSeconds").textContent = seconds;
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when stopped

  updateCurrentTomato();
  updateCurrentTodo();
}
// save the current tomato to the state and reset the current tomato
function updateCurrentTomato() {
  if (state.currentTomato) {
    state.timer.tomatoes.push(state.currentTomato);
    state.currentTomato = undefined;
    updateTable(); 
  }
}

function currentTomatoStartEnd() { 
  now = new Date();
  currentMonth = now.getMonth();
  currentDay = now.getDate();
  currentYear = now.getFullYear();
  currentHour = now.getHours();
  currentMinute = now.getMinutes();
  currentSecond = now.getSeconds();

  if (state.isWorkInterval) {
    if (!state.currentTomato) {
      state.currentTomato = {
        id: state.currentId,
        start: {
          month: currentMonth,
          day: currentDay,
          year: currentYear,
          hour: currentHour,
          minute: currentMinute,
          second: currentSecond,
        },
        end: {
          month: currentMonth,
          day: currentDay,
          year: currentYear,
          hour: currentHour,
          minute: currentMinute,
          second: currentSecond,
        }
      };
    } else {
      state.currentTomato.end = {
        month: currentMonth,
        day: currentDay,
        year: currentYear,
        hour: currentHour,
        minute: currentMinute,
        second: currentSecond,
      };
    }
  }
}

function msToHMS(ms) {
  // Convert to seconds
  let seconds = ms / 1000;
  // Extract hours
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  // Extract minutes
  let minutes = Math.floor(seconds / 60);

  // Keep only seconds not extracted to minutes
  seconds %= 60;

  return `${hours}:${minutes}:${seconds}`;
}