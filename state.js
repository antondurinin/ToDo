//    Create state for UI
const state = {
  isWorkInterval: true,
  timerIntervalId: 0,
  todoList: [
    {
      todoText: "Test",
      priority: "High",
      id: 1,
      endDay: new Date("2024-05-01").toLocaleDateString(),
    },
    {
      todoText: "Test 1",
      priority: "Low",
      id: 2,
      endDay: new Date("2024-05-02").toLocaleDateString(),
    },
  ],
  maxId: 3,
  currentId: 0,
  currentTodo: 0,
  currentTodoColumn: 0,
  timer: {
    /** when we pause the timer, store current time for resuming */
    remainingTimeOnResume: undefined,
    currentTomato: undefined,
    today: new Date(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    currentDay: new Date().getDate(),
    // stored tomatoes month - index.
    tomatoes: [
      {
        id : 1,
        start: {
          month: 4,
          day: 7,
          year: 2024,
          hour: 12,
          minute: 5,
          second: 1,
        },
        end: {
          month: 4,
          day: 7,
          year: 2024,
          hour: 20,
          minute: 12,
          second: 2,
        },
      },
      {
        id : 1,
        start: {
          month: 5,
          day: 7,
          year: 2024,
          hour: 12,
          minute: 5,
          second: 1,
        },
        end: {
          month: 5,
          day: 7,
          year: 2024,
          hour: 20,
          minute: 12,
          second: 2,
        },
      },
      {
        id : 2,
        start: {
          month: 4,
          day: 7,
          year: 2024,
          hour: 22,
          minute: 5,
          second: 1,
        },
        end: {
          month: 4,
          day: 7,
          year: 2024,
          hour: 24,
          minute: 12,
          second: 2,
        },
      },
    ],
  }
};

// Const for today
// function updateUIWithNewState() {
//   // always just use the latest state
//   // state
//   // updateTable()
//   // updateSomethingElse()
// }
