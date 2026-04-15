// ====== ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM ======
const taskInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const pickDateButton = document.getElementById('pick-date-button');
const addButton = document.getElementById('add-button');
const clearAllButton = document.getElementById('clear-all-button');
const taskList = document.getElementById('task-list');


// ====== ФОРМАТИРОВАНИЕ ДАТЫ ======
// преобразует YYYY-MM-DD → DD.MM.YYYY
function formatDate(isoDate) {
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
}


// ====== СОЗДАНИЕ ЭЛЕМЕНТА ЗАДАЧИ ======
// создаёт <li> с задачей, чекбоксом, датой и кнопкой удаления
function createTaskElement(taskText, taskDate) {
    const li = document.createElement('li');

    // чекбокс выполнения задачи
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    // текст задачи
    const span = document.createElement('span');
    span.textContent = taskText;

    // дата задачи (если есть)
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    dateSpan.textContent = taskDate ? ` (${formatDate(taskDate)})` : '';

    // кнопка удаления задачи
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '✖';

    // обработчик удаления одной задачи
    deleteButton.addEventListener('click', () => {
        li.remove();
    });

    // собираем структуру задачи
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(deleteButton);

    return li;
}


// ====== ДОБАВЛЕНИЕ ЗАДАЧИ ======
// создаёт задачу и добавляет её в список
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;

    // защита от пустого ввода
    if (!taskText) {
        const error = document.getElementById('error');
        error.classList.add('show');

        setTimeout(() => error.classList.remove('show'), 2000);
        return;
    }

    // создаём и добавляем задачу
    const newTask = createTaskElement(taskText, taskDate);
    taskList.appendChild(newTask);

    // очистка полей после добавления
    taskInput.value = "";
    taskDateInput.value = "";
}


// ====== КНОПКА ДОБАВЛЕНИЯ ======
addButton.addEventListener('click', addTask);


// ====== ДОБАВЛЕНИЕ ПО ENTER ======
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});


// ====== ОТКРЫТИЕ КАЛЕНДАРЯ ======
pickDateButton.addEventListener('click', () => {
    if (typeof taskDateInput.showPicker === 'function') {
        taskDateInput.showPicker();
    } else {
        taskDateInput.click();
    }
});


// ====== АВТОДОБАВЛЕНИЕ ПО ВЫБОРУ ДАТЫ ======
taskDateInput.addEventListener('change', function () {
    if (taskInput.value.trim() !== "") {
        addTask();
    }
});


// ====== ОЧИСТКА ВСЕХ ЗАДАЧ ======
clearAllButton.addEventListener('click', function () {
    // отмечаем все задачи как выполненные (визуальный эффект)
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(cb => cb.checked = true);

    // удаляем все задачи с небольшой задержкой
    setTimeout(() => {
        taskList.innerHTML = '';
    }, 1000);
});