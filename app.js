// TODO stick todo items in localStorage

    // TODO add columns to the todo item
    // - priority
    // - time estimate
    // - reward

    // TODO add CSS to make it look decent & like a table (use AI for this)

    // TODO add the project to github

    // 
let isWorkInterval = true;
let timerInterval;
let todoList = [];
let currentTodo;
let currentTodoCell;

function startTimer(duration = 1500) {
  clearInterval(timerInterval);
  let timer = duration, minutes, seconds;
  const timerDisplay = document.getElementById('timer');
  timerDisplay.classList.add('timer-active'); // Add class when timer starts

  timerInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('timerMinutes').textContent = minutes;
    document.getElementById('timerSeconds').textContent = seconds;
    document.getElementById('timer').classList.add('timer-active');
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
  document.getElementById('timer').classList.remove('timer-active'); // Remove class when paused
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer').classList.remove('timer-active'); // Remove class when stopped
  if (currentTodoCell) {
    currentTodoCell.textContent = document.getElementById('timerMinutes').textContent + ":" + document.getElementById('timerSeconds').textContent;
  }
  isWorkInterval = !isWorkInterval; // Toggle to next interval
  startTimer(isWorkInterval ? 1500 : 300);
}

function updateTomatoCount() {
  if (currentTodoCell) {
    let currentCount = parseInt(currentTodoCell.textContent) || 0;
    currentTodoCell.textContent = currentCount + 1;
  }
}

function createTable(month) {
    const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();
    const tableContainer = document.getElementById('todoTable');
    tableContainer.innerHTML = ''; // Clear existing table
    const table = document.createElement('table');
    const headerRow = table.insertRow();

    // Create headers for each day of the month
    for (let i = -2; i <= daysInMonth; i++) {
      const headerCell = document.createElement('th');
      headerCell.textContent = i === -2 ? 'Todo' : (i === -1 ? 'Priority' : (i === 0 ? 'End Day' : `${i}`));
      headerRow.appendChild(headerCell);
    }

    tableContainer.appendChild(table);
  }

function addTodo() {
  const todoText = document.querySelector('input[name="todo"]').value;
  const priority = document.getElementById('priority').value;
  if (todoText === '') return; // Prevent adding empty todos

  const table = document.querySelector('#todoTable table');
  const row = table.insertRow(-1); // Insert a new row at the end of the table
  const month = parseInt(document.getElementById('monthSelector').value);
  const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();

  for (let i = 0; i <= daysInMonth + 2; i++) {
    const cell = row.insertCell(i);
    cell.setAttribute('contenteditable', 'true');
    if (i === 0) {
      cell.textContent = todoText; // Set the first cell text to the todo item
      cell.style.fontWeight = 'bold'; // Optional: style the todo text
    } else if (i === 1) {
      cell.textContent = priority; // Set the second cell text to the priority
      cell.style.color = priority === 'High' ? 'red' : (priority === 'Medium' ? 'orange' : 'green');
    } else {
      cell.textContent = ''; // Other cells are empty initially
      
    }
    
  }
  
  document.querySelector('input[name="todo"]').value = ''; // Clear the input field
  const startButton = document.createElement('button');
  startButton.innerHTML = '<i class="fas fa-apple-alt"></i>';
  startButton.onclick = function() {
    startTimer(1500); // Assuming currentDayIndex is the index of the current day column
  };
  row.cells[0].prepend(startButton);
}

function updateTable() {
    const selectedMonth = parseInt(document.getElementById('monthSelector').value);
    createTable(selectedMonth);
  }

  // Initialize table with current month
  window.onload = function() {
    const currentMonth = new Date().getMonth();
    document.getElementById('monthSelector').value = currentMonth;
    createTable(currentMonth);
  };