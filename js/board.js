
let allTasks = [];

/**
   * this function sets the ids in ascending order
   * 
   * @param {} - no parameter needed
   */
function setID() {
    for (let i = 0; i < allTasks.length; i++) {
        allTasks[i]['id'] = i;
    }
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
    setID();
    uptadeHTML();
    // console.log('hope it works', allTasks);
}

let currentDraggedElement;

/**
 * This function updates the HTML page
 * 
 * @param {} - no parameter needed
 */
function uptadeHTML() {

    let todo = allTasks.filter(t => t['status'] == 'todo');
    document.getElementById('task1').innerHTML = ``;
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('task1').innerHTML += generateTodoHTML(element);
    }

    let inProgress = allTasks.filter(t => t['status'] == 'in-progress');
    document.getElementById('task2').innerHTML = ``;
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('task2').innerHTML += generateTodoHTML(element);
    }

    let inExamination = allTasks.filter(t => t['status'] == 'in-examination');
    document.getElementById('task3').innerHTML = ``;
    for (let index = 0; index < inExamination.length; index++) {
        const element = inExamination[index];
        document.getElementById('task3').innerHTML += generateTodoHTML(element);
    }

    let done = allTasks.filter(t => t['status'] == 'done');
    document.getElementById('task4').innerHTML = ``;
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('task4').innerHTML += generateTodoHTML(element);
    }
}

/**
 * 
 * 
 * @param {number} id - This ist the ID from the Task
 */
function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    // uptadeHTML();
    saveToBackend();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function deleteTask(id) {
    console.log('vor löschen',allTasks);
    allTasks.splice(id, 1);
    console.log('nach löschen',allTasks);
    setID();
    console.log('nach id setzen',allTasks);
    saveToBackend();
    console.log('nach backend speichern',allTasks);
    uptadeHTML();
    console.log('nach html update',allTasks);
}


function generateTodoHTML(element) {
    return `<div class="task" draggable="true" ondragstart="startDragging(${element['id']})">
    <span>${element['titel']}</span>
    <img src="img/trash-icon.png" alt="trash icon" class="trashIcon" onclick="deleteTask(${element['id']})">
    </div>`;
}

/**
   * This function saves the Array to backend
   * 
   * @param {} - no parameter needed
   */
async function saveToBackend() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log('saved to backend');
    uptadeHTML();
}