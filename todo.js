function createTable(todoList) {
  const daysInMonth = new Date(
    state.timer.currentYear,
    state.timer.currentMonth + 1,
    0
  ).getDate();
  const tableContainer = document.getElementById("todoTable");
  tableContainer.innerHTML = ""; // Clear existing table
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  let headerCellContent = "";
  // Create headers for each day of the month
  for (let i = -3; i <= daysInMonth; i++) {
    const headerCell = document.createElement("th");
    if (i === state.timer.currentDay) {
      headerCell.classList.add("today"); // Add a class for today
      currentTodoColumn = i;
    }
    if (i === -3) {
      headerCellContent = "Todo";
    } else if (i === -2) {
      headerCellContent = "id";
    } else if (i === -1) {
      headerCellContent = "Priority";
    } else if (i === 0) {
      headerCellContent = "End Day";
    } else {
      headerCellContent = i;
    }
    headerCell.textContent = headerCellContent;
    headerRow.appendChild(headerCell);
  }
  tableContainer.appendChild(table);
  if (todoList) {
    todoList.forEach((todo) => {
      addTodo(todo, true);
    });
  }
}

function addTodo(todo, update) {
  let todoText = document.querySelector('input[name="todo"]').value;
  let priority = document.getElementById("priority").value;
  let id = state.maxId;
  let endDay = new Date().toLocaleDateString();

  if (todo) {
    todoText = todo.todoText;
    id = todo.id;
    priority = todo.priority;
    endDay = todo.endDay;
  }

  if (todoText === "") return; // Prevent adding empty todos

  const table = document.querySelector("#todoTable table");
  const row = table.insertRow(-1); // Insert a new row at the end of the table
  const daysInMonth = new Date(
    new Date().getFullYear(),
    state.timer.currentMonth + 1,
    0
  ).getDate();

  for (let i = 0; i <= daysInMonth + 3; i++) {
    const cell = row.insertCell(i);
    cell.setAttribute("contenteditable", "true");
    if (i === 0) {
      cell.textContent = todoText; // Set the first cell text to the todo item
      cell.style.fontWeight = "bold"; // Optional: style the todo text
    } else if (i === 1) {
      cell.textContent = id; // Set the second cell text to the priority
    } else if (i === 2) {
      cell.textContent = priority; // Set the second cell text to the priority
      cell.style.color =
        priority === "High"
          ? "red"
          : priority === "Medium"
          ? "orange"
          : "green";
    } else if (i === 3) {
      cell.textContent = endDay; // Set the second cell text to the priority
    } else {
      cell.textContent = getUpdatedTomatoTimeByDay(id, i - 3); // Other cells are empty initially
    }
  }

  if (!update) {
    state.todoList.push({
      todoText: todoText,
      id: state.maxId,
      priority: priority,
      endDay: endDay,
    });
    state.maxId += 1;
  }

  document.querySelector('input[name="todo"]').value = ""; // Clear the input field
  const startButton = document.createElement("button");
  startButton.innerHTML = '<i class="fas fa-apple-alt"></i>';
  startButton.onclick = function () {
    state.currentTodo = todoText;
    state.currentId = parseInt(row.cells[1].textContent);
    RefreshTimerDuration = !state.isWorkInterval;
    state.isWorkInterval = true;

    updateCurrentTodo();
    updateCurrentTomato();
    startTimer(RefreshTimerDuration); // Assuming currentDayIndex is the index of the current day column
  };

  row.cells[0].prepend(startButton);
}

function updateTable() {
  createTable(state.todoList);
}

// Initialize table with current month
window.onload = function () {
  createTable(state.todoList);
};

//Filter stored tomatoes by day
const getCurrentTomatoByDay = (id, day) => {
  return state.timer.tomatoes.filter((todo) => isThisCurrentDay(todo, id, day));
};

//Check if the current day is the same as the day of the todo
function isThisCurrentDay(todo, id, day) {
  return (
    todo.id === id &&
    todo.start.year === state.timer.currentYear &&
    todo.start.month === state.timer.currentMonth &&
    todo.start.day === day
  );
}

//Update the time of the tomato by day in table
function getUpdatedTomatoTimeByDay(id, day) {
  const tomatoesThisDay = getCurrentTomatoByDay(id, day);
  let tomatoTime = 0;

  tomatoesThisDay.forEach(tomato => {
    const start = new Date(tomato.start.year, tomato.start.month, tomato.start.day, tomato.start.hour, tomato.start.minute, tomato.start.second);
    const end = new Date(tomato.end.year, tomato.end.month, tomato.end.day, tomato.end.hour, tomato.end.minute, tomato.end.second);
    tomatoTime += end - start;
  });

  return tomatoTime > 0 ? msToHMS(tomatoTime) : "";
}

function updateCurrentTodo(textContent = "") {
  const showTodo = document.getElementById("CurrentTodo");
  if (state.currentTodo) {
    showTodo.textContent = `${state.currentTodo}, id: ${state.currentId}`;
  } else {
    showTodo.textContent = textContent;
  }
}
