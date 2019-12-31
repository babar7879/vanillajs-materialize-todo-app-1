const form = document.getElementById("todo-form");
const todoItems = document.getElementById("todo_items");

/**
 * getTodos
 * @desc Gets todos items form localSotrage and pops the list
 */
getTodos = () => {
  Object.keys(localStorage).map(todoKey => {
    if (todoKey.startsWith("todo_item")) {
      const todoItem = localStorage.getItem(todoKey);

      // List item
      const li = document.createElement("li");
      li.classList.add("collection-item");
      const todoText = document.createTextNode(todoItem);

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.setAttribute(
        "class",
        "secondary-content waves-effect waves-light btn red darken-1 btn-small delete-todo"
      );
      removeBtn.setAttribute("value", todoKey);
      const removeBtnText = document.createTextNode("X");

      // Append
      removeBtn.appendChild(removeBtnText);
      li.appendChild(removeBtn);
      li.appendChild(todoText);

      todoItems.appendChild(li);
    }
  });
};

// Invoke getTodos
getTodos();

// On form submit
document.getElementById("todo-form").addEventListener("submit", e => {
  e.preventDefault();
  addTodo(document.getElementById("todo_name").value);
});

/**
 * addTodo
 * @param {String} todoName
 * @desc Adds the todo item
 */
const addTodo = todoName => {
  const todoKey = `todo_item_${localStorage.length + 1}`;
  // Save to localStorage first
  localStorage.setItem(todoKey, todoName);

  // New list item
  const li = document.createElement("li");
  li.classList.add("collection-item");
  const todoText = document.createTextNode(todoName);

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.className =
    "secondary-content waves-effect waves-light btn red darken-1 btn-small delete-todo";
  removeBtn.setAttribute("value", todoKey);
  const removeBtnText = document.createTextNode("X");

  // Append
  removeBtn.appendChild(removeBtnText);
  li.appendChild(removeBtn);
  li.appendChild(todoText);
  todoItems.appendChild(li);

  // Clear input
  document.getElementById("todo_name").value = "";
};

/**
 * removeTodo
 * @param {Object} e
 * @desc Removes the todo item
 */
const removeTodo = e => {
  if (e.target.classList.contains("delete-todo")) {
    // Remove from localStorage first
    localStorage.removeItem(e.target.value);

    // Remove from the DOM
    li = e.target.parentElement;
    todoItems.removeChild(li);
  }
};

var editTodoKey = "";

/**
 * edit
 * @param {Object} e
 * @desc Edit the todo
 */
function edit(e) {
  if (e.target.className === "collection-item") {
    // Remove prev active classes
    activeItems = document.getElementsByTagName("li");

    for (i = 0; i < activeItems.length; i++) {
      activeItems[i].classList.remove("active");
    }

    // Add active class
    e.target.classList.add("active");
    const todoText = e.target.textContent.slice(1);

    // Populate input with the selected todo item
    document.getElementById("todo_name").focus();
    document.getElementById("todo_name").value = todoText;

    editTodoKey = e.target.firstElementChild.value;
  }
}

/**
 * updateTodo
 * @param { Object } e
 * @desc Updates the todo item
 */

const updateTodo = e => {
  const todoName = document.getElementById("todo_name").value;
  // Update in the localStorage first
  localStorage.setItem(editTodoKey, todoName);

  const activeTodo = document.querySelector("li.active");
  // Update in the DOM
  activeTodo.childNodes[1].textContent = todoName;
};

/**
 * search_todo
 * @param { Object } e
 * @desc Searches todo item(s)
 */
const searchTodos = e => {
  const search_keywords = e.target.value;
  const todos = todoItems.getElementsByClassName("collection-item");

  Array.from(todos).forEach(todo => {
    const todoItem = todo.textContent.toLowerCase().slice(1);

    if (todoItem.toLowerCase().indexOf(search_keywords) != -1) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
};

// On remove button click
todoItems.addEventListener("click", removeTodo);

// On todo item click
todoItems.addEventListener("click", edit);

// On update button click
document.getElementById("update-todo").addEventListener("click", updateTodo);

// On search-todo input keypress
document.getElementById("search-todo").addEventListener("keyup", searchTodos);
