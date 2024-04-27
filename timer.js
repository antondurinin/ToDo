function startTimer(durationSeconds = 25 * 60) {
  if (!currentTodo) {
    alert("Chose todo from table");
    return;
  }
  clearInterval(timerIntervalId);
  let timerDurationS = durationSeconds,
    minutes,
    seconds;
  // let minutes = 0
  console.log("⭐ ~ startTimer ~ minutes:", minutes);
  console.log("⭐ ~ startTimer ~ seconds:", seconds);

  // activate the timer CSS
  const timerDisplay = document.getElementById("timer");
  timerDisplay.classList.add("timer-active"); // Add class when timer starts

  //   start the timer...
  timerIntervalId = setInterval(function updateTimerCountdown() {
    //
    minutes = parseInt(timerDurationS / 60, 10); // 25
    seconds = parseInt(timerDurationS % 60, 10); // 0

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // TODO store the minutes/seconds in state

    // updating the UI with the state
    document.getElementById("timerMinutes").textContent = minutes;
    document.getElementById("timerSeconds").textContent = seconds;
    document.getElementById("timer").classList.add("timer-active");

    if (--timerDurationS < 0) {
      clearInterval(timerIntervalId);
      if (isWorkInterval) {
        startTimer(300); // Start rest interval
        isWorkInterval = false;
      } else {
        updateTomatoCount();
        startTimer(1500); // Start work interval
        isWorkInterval = true;
      }
    }
  }, 1000);
}

function pauseTimer() {
  //   TODO store the current timer progress somewhere so we can resume later
  clearInterval(timerIntervalId);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when paused
}

function stopTimer() {
  //updateTomatoCount();
  clearInterval(timerIntervalId);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when stopped
  showTodo.textContent = "";

  //if (currentTodoCell) {
  //  currentTodoCell.textContent = document.getElementById('timerMinutes').textContent + ":" + document.getElementById('timerSeconds').textContent;
  //}
  isWorkInterval = !isWorkInterval; // Toggle to next interval
  console.log("🚀 ~ stopTimer ~ isWorkInterval:", isWorkInterval);
  startTimer(isWorkInterval ? 1500 : 300);
}
