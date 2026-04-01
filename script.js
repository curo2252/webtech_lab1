// 1. Получаем ссылки на HTML-элементы
const taskInput = document.getElementById('task-name');
const addButton = document.getElementById('add-button');
const taskList  = document.getElementById('task-list');

// 2. Функция создания одного элемента задачи <li>
function createTaskElement(taskText) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '✖';

    // 3. Удаление задачи при клике на кнопку "x"
    deleteButton.addEventListener('click', function () {
        li.remove();
        console.log(`Задача удалена: ${taskText}`);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

// 4. Функция добавления задачи
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        const error = document.getElementById('error');
        error.classList.add('show');
        setTimeout(function() {
            error.classList.remove('show');
        }, 2000);
        return;
    }

    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);
    taskInput.value = "";
}


// 5. Навешиваем обработчики на уже существующие кнопки "x" в HTML
document.querySelectorAll('.delete-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
        btn.closest('li').remove();
    });
});

// 6. Клик по кнопке "+"
addButton.addEventListener('click', addTask);

// 7. Добавление задачи по нажатию Enter
taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});