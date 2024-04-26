const state = {
  timer: {},
};
//   TODO organize state into slices
let isWorkInterval = true;
let timerInterval;
let todoList = [];
let maxId = 0;
let currentTodo;
let currentTodoCell;
let currentTodoColumn;
let currentTomatoes = 0;
let currentTomatoesTime = 0;

//  ?

const today = new Date();
const month = today.getMonth();
