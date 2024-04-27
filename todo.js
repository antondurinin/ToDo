function updateTomatoCount() {
  currentTomatoesTime += 1;
  currentTomatoes += currentTomatoes / 1500;
  document.getElementById("tomatoes").textContent = currentTomatoes;
  //let currentCount = parseInt(currentTodoCell.textContent) || 0;
  //currentTodoCell.textContent = currentCount + 1;
}

function createTable() {
  const daysInMonth = new Date(today.getFullYear(), month + 1, 0).getDate();
  const tableContainer = document.getElementById("todoTable");
  tableContainer.innerHTML = ""; // Clear existing table
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  let headerCellContent = "";
  // Create headers for each day of the month
  for (let i = -3; i <= daysInMonth; i++) {
    const headerCell = document.createElement("th");
    if (i === today.getDate() && month === today.getMonth()) {
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
}

function addTodo() {
  const todoText = document.querySelector('input[name="todo"]').value;
  const priority = document.getElementById("priority").value;
  if (todoText === "") return; // Prevent adding empty todos

  const table = document.querySelector("#todoTable table");
  const row = table.insertRow(-1); // Insert a new row at the end of the table
  //const month = parseInt(document.getElementById("monthSelector").value);
  const daysInMonth = new Date(
    new Date().getFullYear(),
    month + 1,
    0
  ).getDate();

  const showTodo = document.getElementById("CurrentTodo");
  let todoInformation = {
    id: maxId,
    todo: todoText,
  };

  //currentTodo = todoText;
  //showTodo.textContent = `Current todo: ${todoText}, id: ${maxId}`;

  for (let i = 0; i <= daysInMonth + 3; i++) {
    const cell = row.insertCell(i);
    cell.setAttribute("contenteditable", "true");
    if (i === 0) {
      cell.textContent = todoText; // Set the first cell text to the todo item
      cell.style.fontWeight = "bold"; // Optional: style the todo text
    } else if (i === 1) {
      cell.textContent = maxId; // Set the second cell text to the priority
    } else if (i === 2) {
      cell.textContent = priority; // Set the second cell text to the priority
      cell.style.color =
        priority === "High"
          ? "red"
          : priority === "Medium"
          ? "orange"
          : "green";
    } else {
      cell.textContent = ""; // Other cells are empty initially
      todoInformation[`${i}`] = "";
    }
  }
  todoList.push({
    id: maxId,
    todo: todoText,
  });

  document.querySelector('input[name="todo"]').value = ""; // Clear the input field
  const startButton = document.createElement("button");
  startButton.innerHTML = '<i class="fas fa-apple-alt"></i>';
  startButton.onclick = function () {
    currentTodo = todoText;
    showTodo.textContent = `Current todo: ${todoText}, id: ${row.cells[1].textContent}`;
    startTimer(1500); // Assuming currentDayIndex is the index of the current day column
  };

  maxId += 1;
  row.cells[0].prepend(startButton);
}

function updateTable() {
  //const selectedMonth = parseInt(document.getElementById('monthSelector').value);
  createTable();
}

// Initialize table with current month
window.onload = function () {
  //const currentMonth = new Date().getMonth();
  //document.getElementById('monthSelector').value = currentMonth;
  createTable();
};
