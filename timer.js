function startTimer(durationSeconds = 25 * 60) {
  if (!state.currentTodo) {
    alert("Chose todo from table");
    return;
  }
  clearInterval(state.timerIntervalId);

  // try to use the remaining time, else use the default start time
  let timerDurationS = state.timer.remainingTimeOnResume ?? durationSeconds;

  let minutes = 0;
  let seconds = 0;

  // let minutes = 0

  // activate the timer CSS
  const timerDisplay = document.getElementById("timer");
  timerDisplay.classList.add("timer-active"); // Add class when timer starts

  //   start the timer...
  state.timerIntervalId = setInterval(function updateTimerCountdown() {
    minutes = parseInt(timerDurationS / 60, 10); // 25
    seconds = parseInt(timerDurationS % 60, 10); // 0

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // TODO store the minutes/seconds in state

    // updating the UI with the state
    document.getElementById("timerMinutes").textContent = minutes;
    document.getElementById("timerSeconds").textContent = seconds;
    document.getElementById("timer").classList.add("timer-active");

    // decrement the timer by 1s
    timerDurationS -= 1;
    // save the current remaining time to state
    state.timer.remainingTimeOnResume = timerDurationS;

    // handle when the timer runs out
    if (timerDurationS < 0) {
      clearInterval(state.timerIntervalId);
      if (state.isWorkInterval) {
        startTimer(300); // Start rest interval
        state.isWorkInterval = false;
      } else {
        updateTomatoCount();
        startTimer(1500); // Start work interval
        state.isWorkInterval = true;
      }
    }
  }, 1 * 1000);
}

function pauseTimer() {
  clearInterval(state.timerIntervalId);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when paused
}

function stopTimer() {
  //updateTomatoCount();
  clearInterval(state.timerIntervalId);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when stopped
  showTodo.textContent = "";

  //if (currentTodoCell) {
  //  currentTodoCell.textContent = document.getElementById('timerMinutes').textContent + ":" + document.getElementById('timerSeconds').textContent;
  //}
  state.isWorkInterval = !state.isWorkInterval; // Toggle to next interval

  startTimer(state.isWorkInterval ? 1500 : 300);
}
