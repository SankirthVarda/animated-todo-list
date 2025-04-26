const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load todos from LocalStorage
document.addEventListener('DOMContentLoaded', loadTodos);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== '') {
    addTodo(todoText);
    saveTodo(todoText);
    input.value = '';
  }
});

function addTodo(text) {
  const li = document.createElement('li');
  li.innerHTML = `${text} <button onclick="deleteTodo(this)">Delete</button>`;
  li.addEventListener('click', function() {
    li.classList.toggle('completed');
  });
  list.appendChild(li);
}

function deleteTodo(button) {
  const li = button.parentElement;
  removeTodoFromStorage(li.firstChild.textContent.trim());
  li.remove();
}

function saveTodo(todo) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => addTodo(todo));
}

function removeTodoFromStorage(todoText) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(t => t !== todoText);
  localStorage.setItem('todos', JSON.stringify(todos));
}
