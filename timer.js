function startTimer(duration = 1500) {
  if (!currentTodo) {
    alert("Chose todo from table");
    return;
  }
  clearInterval(timerInterval);
  let timer = duration,
    minutes,
    seconds;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.classList.add("timer-active"); // Add class when timer starts

  timerInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timerMinutes").textContent = minutes;
    document.getElementById("timerSeconds").textContent = seconds;
    document.getElementById("timer").classList.add("timer-active");
    if (--timer < 0) {
      clearInterval(timerInterval);
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
  clearInterval(timerInterval);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when paused
}

function stopTimer() {
  //updateTomatoCount();
  clearInterval(timerInterval);
  document.getElementById("timer").classList.remove("timer-active"); // Remove class when stopped
  showTodo.textContent = "";

  //if (currentTodoCell) {
  //  currentTodoCell.textContent = document.getElementById('timerMinutes').textContent + ":" + document.getElementById('timerSeconds').textContent;
  //}
  isWorkInterval = !isWorkInterval; // Toggle to next interval
  console.log("🚀 ~ stopTimer ~ isWorkInterval:", isWorkInterval);
  startTimer(isWorkInterval ? 1500 : 300);
}
