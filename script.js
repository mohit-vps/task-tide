const STORAGE_KEY = "task-tide-items";

/** @type {{id: string, text: string, done: boolean}[]} */
let tasks = loadTasks();
let currentFilter = "all";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskTemplate = document.querySelector("#task-item-template");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const doneCount = document.querySelector("#done-count");
const clearDoneButton = document.querySelector("#clear-done");
const filterButtons = document.querySelectorAll(".filter");

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
  });

  taskInput.value = "";
  persistTasks();
  render();
});

clearDoneButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  persistTasks();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    render();
  });
});

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.done);
  }

  if (currentFilter === "done") {
    return tasks.filter((task) => task.done);
  }

  return tasks;
}

function render() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = "";

  visibleTasks.forEach((task) => {
    const item = taskTemplate.content.firstElementChild.cloneNode(true);
    const toggle = item.querySelector(".task-toggle");
    const text = item.querySelector(".task-text");
    const editButton = item.querySelector(".edit-button");
    const deleteButton = item.querySelector(".delete-button");

    item.dataset.id = task.id;
    item.classList.toggle("is-done", task.done);
    toggle.checked = task.done;
    text.textContent = task.text;

    toggle.addEventListener("change", () => {
      updateTask(task.id, { done: toggle.checked });
    });

    editButton.addEventListener("click", () => {
      const nextText = window.prompt("Edit task", task.text);
      if (nextText === null) return;

      const trimmedText = nextText.trim();
      if (!trimmedText) {
        deleteTask(task.id);
        return;
      }

      updateTask(task.id, { text: trimmedText });
    });

    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    taskList.appendChild(item);
  });

  emptyState.hidden = visibleTasks.length > 0;
  taskCount.textContent = String(tasks.filter((task) => !task.done).length);
  doneCount.textContent = String(tasks.filter((task) => task.done).length);
  clearDoneButton.disabled = !tasks.some((task) => task.done);
  clearDoneButton.style.opacity = clearDoneButton.disabled ? "0.45" : "1";
}

function updateTask(id, patch) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, ...patch } : task));
  persistTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  persistTasks();
  render();
}

render();
