// Leere Arrays
let allTasks = [];
let assignUser = [];

setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');

users = [{
        'id': 0,
        'image': 'GottfriedOswald.jpg',
        'name': 'Gottfried'
    },
    {
        'id': 1,
        'image': 'michelleH.jpg',
        'name': 'Michelle'
    },
    {
        'id': 2,
        'image': 'guest.png',
        'name': 'Kaan'
    },
    {
        'id': 3,
        'image': 'guest.png',
        'name': 'Guest'
    },
];

async function init() {
    includeHTML();
    showUsers();
    await loadFromBackend();
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
}

function addTask(event) {
    event.preventDefault();

    let titel = document.getElementById('titel').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;

    let status = 'todo';
    let id = Math.round(Math.random() * 10000);

    let task = {
        'id': id,
        'titel': titel,
        'category': category,
        'description': description,
        'createdAt': date,
        'urgency': urgency,
        'status': status,
        'user': assignUser
    }

    allTasks.push(task); //push new task to Array allTasks
    saveToBackend();
    clearInputfields();

}

function clearInputfields() {
    document.getElementById('titel').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('urgency').value = '';
}

async function saveToBackend() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log('saved to backend');
}

function showUsers() {
    document.getElementById('assignet-to-content').innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        document.getElementById('assignet-to-content').innerHTML += `
        <div class="user-container">
        <div class="user">
        <img class="imgcyrcle" src="img/user/${user['image']}" id="${user['id']}">
        <div class="user-content">
        <div class="user-name">${user['name']}</div>
        </div>
        <div class="assign-to-plus" id="${i}" onclick="assignToTask(${i})">

        <i id="assign-icon${i}">+</i></div> 
        </div>
        </div>`;
    }
}

let userAssignToTask = [];

function assignToTask(i) {
    if (userAssignToTask.includes(i)) {
        document.getElementById(i).classList.remove('assign-to-plus-activated');
        document.getElementById('assign-icon' + i).classList.remove('assign-to-plus-activated');
        let indexAssignUser = assignUser.indexOf(assignUser[i]);
        assignUser.splice(indexAssignUser, 1);
        let index = userAssignToTask.indexOf(i);
        userAssignToTask.splice(index, 1);
    } else {
        document.getElementById(i).classList.add('assign-to-plus-activated');
        document.getElementById('assign-icon' + i).classList.add('assign-to-plus-activated');
        assignUser.push(users[i]);
        userAssignToTask.push(i);
    }
    console.log('user:', assignUser);
}