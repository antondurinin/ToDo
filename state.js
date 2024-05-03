//    Create state for UI
const state = {
  isWorkInterval: true,
  timerIntervalId: 0,
  todoList: [],
  maxId: 0,
  currentId: 0,
  currentTodo: 0,
  currentTodoColumn: 0,
  currentTomatoesTime: 0,
};

// Const for today
const today = new Date();
const month = today.getMonth();

function updateUIWithNewState() {
  // always just use the latest state
  // state
  // updateTable()
  // updateSomethingElse()
}
