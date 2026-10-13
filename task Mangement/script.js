const form       = document.querySelector("#taskForm");
const titleEl    = document.querySelector("#title");
const priorityEl = document.querySelector("#priority");
const dueDateEl  = document.querySelector("#dueDate");
const taskList   = document.querySelector("#taskList");
const statsEl    = document.querySelector("#stats");
const filterBtns = document.querySelectorAll(".filter-btn");

const taskManager = {
  state: {
    tasks: [],
    filter: "all",
  },

  init: function () {
    form.addEventListener("submit", this.handleSubmit.bind(this));
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.setFilter(btn.dataset.filter));
    });
    this.renderUi();
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.addTask();
  },

  addTask: function () {
    const task = {
      id: Date.now(),
      title: titleEl.value.trim(),
      priority: priorityEl.value,
      dueDate: dueDateEl.value,
      completed: false,
    };
    if (!task.title) return;
    this.state.tasks.push(task);
    form.reset();
    this.renderUi();
  },

  removeTask: function (id) {
    this.state.tasks = this.state.tasks.filter((t) => t.id !== id);
    this.renderUi();
  },

  toggleTask: function (id) {
    this.state.tasks = this.state.tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.renderUi();
  },

  setFilter: function (filter) {
    this.state.filter = filter;
    this.renderUi();
  },

  getVisibleTasks: function () {
    const { tasks, filter } = this.state;
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "done")   return tasks.filter((t) => t.completed);
    return tasks;
  },

  renderUi: function () {
    taskList.innerHTML = "";
    const visible = this.getVisibleTasks();

    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-center text-gray-400 py-8";
      empty.textContent = "No tasks to show";
      taskList.appendChild(empty);
    } else {
      visible.forEach((task) => {
        taskList.appendChild(this.createTaskCard(task));
      });
    }

    this.renderStats();
    this.renderFilterState();
  },

  priorityClass: function (p) {
    return {
      low:    "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      high:   "bg-red-100 text-red-700",
    }[p] || "bg-gray-100 text-gray-700";
  },

  createTaskCard: function (task) {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow flex items-center gap-3";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => this.toggleTask(task.id));

    // Title
    const title = document.createElement("span");
    title.textContent = task.title;
    title.className = task.completed
      ? "flex-1 line-through text-gray-400"
      : "flex-1 text-gray-800";

    // Priority badge
    const badge = document.createElement("span");
    badge.textContent = task.priority;
    badge.className =
      "text-xs px-2 py-1 rounded-full " + this.priorityClass(task.priority);

    // Due date
    const due = document.createElement("span");
    due.textContent = task.dueDate || "No date";
    due.className = "text-xs text-gray-500";

    // Delete
    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "text-red-500 hover:text-red-700 font-bold";
    del.addEventListener("click", () => this.removeTask(task.id));

    card.append(checkbox, title, badge, due, del);
    return card;
  },

  renderStats: function () {
    const total = this.state.tasks.length;
    const done = this.state.tasks.filter((t) => t.completed).length;
    statsEl.textContent = `${done} of ${total} completed`;
  },

  renderFilterState: function () {
    filterBtns.forEach((btn) => {
      const active = btn.dataset.filter === this.state.filter;
      btn.className =
        "filter-btn px-3 py-1 rounded-lg " +
        (active ? "bg-blue-600 text-white" : "bg-white text-gray-700");
    });
  },
};

taskManager.init();