const API_URL = "http://localhost:3000/tasks";

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  }
  
  function renderTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; 
    tasks.forEach(task => {
      const taskItem = document.createElement("li");
      taskItem.className = "task";
  
      taskItem.innerHTML = `
        <label>
          <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskStatus(${task.id}, this.checked)" />
          <span class="${task.completed ? "completed" : ""}">${task.title}</span>
        </label>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
  
      taskList.appendChild(taskItem);
    });
  }

  async function addTask(title) {
    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
  
    const newTask = {
        id: '' + Math.floor(Math.random() * (10000)) + 1,
        title: title, 
        completed: false 
    };
  
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  
    const addedTask = await response.json();
    console.log("Task added:", addedTask);
    fetchTasks();
  }
  
  async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    fetchTasks();
  }

async function toggleTaskStatus(taskId, isCompleted) {
  await fetch(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: isCompleted }),
  });
  fetchTasks();
}
  
  document.getElementById("add-task-btn").addEventListener("click", () => {
    const taskInput = document.getElementById("task-title");
    const title = taskInput.value;
    addTask(title);
    taskInput.value = "";
  });
  
  fetchTasks();

document.getElementById("task-title").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const taskInput = document.getElementById("task-title");
      const title = taskInput.value;
      addTask(title);
      taskInput.value = "";
    }
  });