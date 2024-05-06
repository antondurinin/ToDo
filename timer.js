function durationSecondsForNewInterval(){ 
  return state.isWorkInterval
    ? (durationSeconds = 25 * 60)
    : (durationSeconds = 5 * 60);
}

function startTimer(RefreshTimerDuration = false) {
  const ifShouldAbort = !state.currentTodo && state.isWorkInterval;

  if (ifShouldAbort) {
    alert("Chose todo from table");
    return;
  }

  timerDurationS =  durationSecondsForNewInterval();
  clearInterval(state.timerIntervalId);

  if (!RefreshTimerDuration) {
    timerDurationS = state.timer.remainingTimeOnResume ?? timerDurationS;
  }

  // activate the timer CSS
  const timerDisplay = document.getElementById("timer");
  timerDisplay.classList.add("timer-active"); // Add class when timer starts

  //   start the timer...
  // state.timerIntervalId = setInterval(() => updateTimerCountdown(timerDurationS, minutes, seconds), 1*1000);
  
  state.timerIntervalId = setInterval(function updateTimerCountdown() {
    ({ minutes, seconds } = updatiUiTimer(timerDurationS));
    document.getElementById("timer").classList.add("timer-active");
    // save the current remaining time to state
    state.timer.remainingTimeOnResume = timerDurationS;
    timerDurationS -= 1; // decrement the timer by 1s

    currentTomatoStartEnd();

    // handle when the timer runs out
    if (timerDurationS < 0) {
      clearInterval(state.timerIntervalId);
      state.isWorkInterval = !state.isWorkInterval;
      updateCurrentTomato();
      startTimer();
    }
  }, 1 * 1000);
}

function updatiUiTimer(timerDurationS) {

  let minutes = parseInt(timerDurationS / 60, 10); // 25
  let seconds = parseInt(timerDurationS % 60, 10); // 0

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // updating the UI with the state

  document.getElementById("timerMinutes").textContent = minutes;
  document.getElementById("timerSeconds").textContent = seconds;
  return { minutes, seconds };
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

  ({ minutes, seconds } = updatiUiTimer(durationSecondsForNewInterval()));
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
  if (!state.isWorkInterval) {
    return;
  }

  const now = new Date();
  const timeObject = {
    month: now.getMonth(),
    day: now.getDate(),
    year: now.getFullYear(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
  };

  if (!state.currentTomato) {
    state.currentTomato = { id: state.currentId, start: timeObject };
  }
  state.currentTomato.end = timeObject;
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
