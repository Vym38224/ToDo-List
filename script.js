// Define an array to store the tasks
let tasks = [];

// Function to add a new task
function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
}
// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
function editTask(index) {
    const tasksList = document.getElementById('tasks');
    const li = tasksList.children[index];

    const taskText = li.querySelector('.task-text');
    const buttonsContainer = li.querySelector('.buttons-container');
    const editButton = buttonsContainer.querySelector('.edit-button');

    // Hide the edit button
    editButton.style.display = 'none';

    // Create an input field with the current task text
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText.textContent;
    input.className = 'edit-input';

    // Create a save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';
    saveButton.onclick = () => saveTask(index, input.value);

    // Insert the save button before the delete button
    buttonsContainer.insertBefore(saveButton, buttonsContainer.firstChild);

    // Replace the task text with the input field
    li.replaceChild(input, taskText);
}


function renderTasks() {
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = ''; // Clear the current list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item'; // Add class to the list item

        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.className = 'task-text'; // Add class to the task text

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container'; // Add class to the buttons container

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button'; // Add class to the delete button
        deleteButton.onclick = () => deleteTask(index);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button'; // Add class to the edit button
        editButton.onclick = () => editTask(index);

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttonsContainer);
        tasksList.appendChild(li);
    });
}


function saveTask(index, newValue) {
    tasks[index] = newValue;
    saveTasks(); 
    renderTasks(); 
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

window.onload = () => {
    loadTasks();
    renderTasks();
};

document.getElementById('addTaskButton').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;
    if (task) {
        addTask(task);
        taskInput.value = ''; 
    }
};