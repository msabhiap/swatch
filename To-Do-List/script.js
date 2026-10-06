let inputEl = document.querySelector("input");
let addBtn = document.querySelector(".add");
let listEl = document.querySelector(".list");
let searchInput = document.querySelector("#searchInput");
let defaultTodos = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Read a chapter", completed: true },
];

function loadTodos() {
  let savedTodos = localStorage.getItem("myTodos");
  if (savedTodos === null) return defaultTodos;

  try {
    let parsedTodos = JSON.parse(savedTodos);
    if (Array.isArray(parsedTodos)) return parsedTodos;
    console.error("Saved todos are not a valid list.");
  } catch (error) {
    console.error("Could not load saved todos from localStorage.", error);
  }

  return defaultTodos;
}

let todos = loadTodos();

function saveData() {
  localStorage.setItem("myTodos", JSON.stringify(todos));
}

function renderData() {
  listEl.innerHTML = "";

  let searchQuery = searchInput.value.trim().toLowerCase();
  let visibleTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery)
  );

  if (visibleTodos.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.textContent = searchQuery ? "No matching tasks." : "No tasks yet.";
    listEl.appendChild(emptyMessage);
    return;
  }

  visibleTodos.forEach((todo) => {
    let li = document.createElement("li");
    li.className = "renderList";
    li.textContent = `${todo.id}. ${todo.text}`;

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.marginLeft = "10px";
    editButton.addEventListener("click", () => {
      let updatedText = prompt("Edit this task:", todo.text);
      if (updatedText === null || updatedText.trim() === "") return;

      todo.text = updatedText.trim();
      saveData();
      renderData();
    });
    li.appendChild(editButton);

    let delButton = document.createElement("button");
    delButton.textContent = "delete";
    delButton.style.marginLeft = "10px";
    delButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveData();
      renderData();
    });
    li.appendChild(delButton);

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;
    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }
    checkBox.addEventListener("change", () => {
      todo.completed = checkBox.checked;
      saveData();
      renderData();
    });
    li.appendChild(checkBox);

    listEl.appendChild(li);
  });
}

function addTodo() {
  let inputValue = inputEl.value.trim();
  if (inputValue === "") return;

  let todo = {
    id: todos.length > 0 ? Math.max(...todos.map((item) => item.id)) + 1 : 1,
    text: inputValue,
    completed: false,
  };

  todos.push(todo);
  saveData();
  inputEl.value = "";
  renderData();
}

addBtn.addEventListener("click", addTodo);
searchInput.addEventListener("input", renderData);
renderData();
