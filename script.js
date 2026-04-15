// 1. Получаем ссылки на HTML-элементы
const taskInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const pickDateButton = document.getElementById('pick-date-button');
const addButton = document.getElementById('add-button');
const clearAllButton = document.getElementById('clear-all-button');
const taskList  = document.getElementById('task-list');

// 2. Функция создания одного элемента задачи <li>
function createTaskElement(taskText, taskDate) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const span = document.createElement('span');
    span.textContent = taskText;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    dateSpan.textContent = taskDate ? ` (${formatDate(taskDate)})` : '';

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
    li.appendChild(dateSpan);
    li.appendChild(deleteButton);

    return li;
}

// 4. Функция добавления задачи
function formatDate(isoDate) {
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;

    if (taskText === "") {
        const error = document.getElementById('error');
        error.classList.add('show');
        setTimeout(function() {
            error.classList.remove('show');
        }, 2000);
        return;
    }

    const newTask = createTaskElement(taskText, taskDate);
    taskList.appendChild(newTask);
    taskInput.value = "";
    taskDateInput.value = "";
    pickDateButton.textContent = 'Дата';
}


// 5. Навешиваем обработчики на уже существующие кнопки "x" в HTML
document.querySelectorAll('.delete-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
        btn.closest('li').remove();
    });
});

// 6. Клик по кнопке "+"
addButton.addEventListener('click', addTask);

// 7. Кнопка выбора даты
pickDateButton.addEventListener('click', function () {
    if (typeof taskDateInput.showPicker === 'function') {
        taskDateInput.showPicker();
    } else {
        taskDateInput.click();
    }
});

taskDateInput.addEventListener('change', function () {
    if (this.value) {
        pickDateButton.textContent = formatDate(this.value);
    } else {
        pickDateButton.textContent = 'Дата';
    }
});

// 8. Клик по кнопке "Очистить все"
clearAllButton.addEventListener('click', function() {
    // Отмечаем все задачи как выполненные
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(cb => cb.checked = true);
    
    // Задержка для показа вычеркивания, затем удаление
    setTimeout(() => {
        taskList.innerHTML = '';
    }, 1000);
});

// 9. Добавление задачи по нажатию Enter
taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});