let tasks=[];

// DOM elements
const taskInput = document.querySelector('.name');
const addButton = document.querySelector('.add');
const taskList = document.querySelector('.main-sec');



// Load tasks from local storage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// Save tasks to local storage  
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName) {
    const newTask = { name: taskName,
       completed: false ,
       date: document.querySelector('.date').value,
       time: document.querySelector('.time').value};
    tasks.push(newTask);
    saveTasks();
    renderTasks();  
    taskInput.value = '';
  }
}

// Remove a task
function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Toggle task completion 
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();  
}

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');  
    li.innerHTML = `
      <div class="inputlist">
        <input type="text" class="name lol" id="${task.completed ? 'completed' : ''}" value="${task.name}" readonly>
        <input type="date" class="date lol" value="${task.date}" readonly>
        <input type="time" class="time lol" value="${task.time}" readonly>
      </div>

      <div class="buttonlist">
        <button class="delete lol" onclick="removeTask(${index})">Delete</button> 
        <button class="complete lol" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
      </div>
    `;
    taskList.appendChild(li);
  });

// Event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
}

loadTasks();
renderTasks();





