let allTasks = [];
let currentUser = [];


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
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    console.log('Loaded from backend allTasks', allTasks);
    setID();
    uptadeHTML();
    currentProfil()
        // console.log('hope it works', allTasks);
}

let currentDraggedElement;

/**
 * This function updates the HTML page if you move, add or delete task card
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


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    saveToBackend();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function deleteTask(id) {
    allTasks.splice(id, 1);
    setID();
    saveToBackend();
    uptadeHTML();
}

/**
 * this function creates a task card
 * 
 * @param {*} element - element a special element(task) in an array
 */
function generateTodoHTML(element) {
    return `
    <div class="flex">
        
            <div class="task flex space-between ${getBorderColor(element)}" draggable="true" ondragstart="startDragging(${element['id']})" onclick="showCard(${element['id']})">
                <div>
                    <div class="text-bg fontsize">${setNameToTask(element)}</div>

                    <div class="flex center space-between">
                        <span>${element['titel']}</span>
                    </div>

                    <div class="text-bg fontsize">${element['createdAt']}</div>
                </div>

                <div class="flex center task-trash">
                    <img src="img/trash-icon.png" alt="trash icon" class="trashIcon" onclick="deleteTask(${element['id']})">
                </div>

            </div>
            
    </div>
    `;
}


/**
 * this function shows an enlarged view of a task card
 * 
 * @param {*} element - element a special element(task) in an array
 */
function showCard(element) {
    document.getElementById('card-category').innerHTML = allTasks[element]['category'];
    document.getElementById('card-title').innerHTML = allTasks[element]['titel'];
    document.getElementById('card-text-description').innerHTML = allTasks[element]['description'];
    document.getElementById('card-text-deadline').innerHTML = allTasks[element]['createdAt'];
    document.getElementById('card-text-urgency').innerHTML = `urgency: ` + allTasks[element]['urgency'];
    document.getElementById('descriptionViewFrame').classList.remove('d-none');
    document.getElementById('descriptionViewFrame').classList.add('animateFadeIn');
    getImgfromAssignUser(element);
    setTimeout(function() { document.getElementById('descriptionViewFrame').classList.remove('animateFadeIn'); }, 500);
}


/**
 * this function adds the images of the users in a large view
 * 
 * @param {*} element - element a special element(task) in an array
 */
function getImgfromAssignUser(element) {

    document.getElementById('assignUserImg').innerHTML = ``;

    for (let i = 0; i < allTasks[element]['user'].length; i++) {
        let userImg = allTasks[element]['user'][i]['img'];
        document.getElementById('assignUserImg').innerHTML += `
            <div class="descriptionViewImageFrame">
                <img src="${userImg}" class="descriptionViewImage"
                alt="Image of User">
            </div>
        `;

    }
}

/**
 *  class="col-md-2"
 * img-fluid rounded-start 
 */

/**
 * this function hides the large view
 * 
 * @param {} - no parameter needed 
 */
function hideCard() {
    document.getElementById('descriptionViewFrame').classList.add('animateFadeOut');
    setTimeout(function() { document.getElementById('descriptionViewFrame').classList.add('d-none'); }, 250);

    setTimeout(function() { document.getElementById('descriptionViewFrame').classList.remove('animateFadeOut'); }, 300);
}


/**
 * this function checks whether "name" exists
 * 
 * @param {*} element element a special element(task) in an array
 * @returns name of the employee
 */
function setNameToTask(element) {
    let name;
    if (element['user']) {
        name = element['user'][0]['name'];
    } else {
        name = "unknown";
    }
    return name;
}

/**
 * this function saves the Array to backend
 * 
 * @param {} - no parameter needed
 */
async function saveToBackend() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log('saved to backend');
    uptadeHTML();
}

/**
 * get the bordercolor for the task, depends on the urgency
 * 
 * @param {*} element element a special element(task) in an array
 * @returns color for the frame seperated for the urgency
 */
function getBorderColor(element) {
    if (element['urgency'] == 'LOW') {
        return 'urgency-low';
    } else if (element['urgency'] == 'MIDDLE') {
        return 'urgency-middle';
    } else
        return 'urgency-high';
}

/**
 * this function inserts the profile picture of the current user into the navbar
 * 
 * @param {}  - no parameter needed
 */
function currentProfil() {
    let profilIcon = document.getElementById('profil-picture');
    profilIcon.src = currentUser[0].img;
}