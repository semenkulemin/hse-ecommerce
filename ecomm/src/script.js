const API_URL = "http://localhost:3000/tasks";

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  renderTasks(tasks.slice(0, 10)); 
}

function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; 
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

async function addTask() {
  const newTask = {
    id: String(Math.floor(Math.random() * (10000)) + 1),
    title: "New Task",
    completed: false,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });

  const addedTask = await response.json();
  fetchTasks(); 
}

async function deleteTask(taskId) {
  await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });
  fetchTasks(); 
}

document.getElementById('add-task-btn').addEventListener('click', addTask);

fetchTasks();
