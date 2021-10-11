// Leere Arrays
let allTasks = [];
let allUsers = [{
        'id': 0,
        'img': './img/user/GottfriedOswald.jpg',
        'name': 'Gottfried',
        'email': 'Gottfried@web.de'
    },
    {
        'id': 1,
        'img': './img/user/michelleH.jpg',
        'name': 'Michelle',
        'email': 'Michelle@web.de'
    },
    {
        'id': 2,
        'img': './img/user/guest.png',
        'name': 'Kaan',
        'email': 'Kaan@web.de'
    },
    {
        'id': 3,
        'img': './img/user/guest.png',
        'name': 'Guest',
        'email': 'Guest@web.de'
    },
];


setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');


async function init() {
    includeHTML();
    showUsers();
    await loadFromBackend();
    today();
}

function today() {
    let today = new Date().toISOString().substr(0, 10);
    console.log(today);
    document.querySelector('#date').value = today;
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
}

function addTask(event) {
    event.preventDefault();
    let id = Math.round(Math.random() * 10000);
    let titel = document.getElementById('titel').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;
    let name = allUsers[0]['name'];
    let email = allUsers[0]['email'];
    let img = allUsers[0]['img'];
    let status = 'todo';


    let task = {
        'id': id,
        'titel': titel,
        'category': category,
        'description': description,
        'createdAt': date,
        'urgency': urgency,
        'status': status,
        'name': name,
        'email': email,
        'img': img
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
    await backend.setItem('allUsers', JSON.stringify(allUsers));
    console.log('saved to backend');
}

function showUsers() {
    document.getElementById('assignet-to-content').innerHTML = '';

    for (let i = 0; i < allUsers.length; i++) {
        let user = allUsers[i];

        document.getElementById('assignet-to-content').innerHTML += `
        <div class="user-container">
        <div class="user">
        <img class="imgcyrcle" src="${user['img']}" id="${user['id']}">
        <div class="user-content">
        <div class="user-name">${user['name']}</div>
        </div>
        <div class="assign-to-plus" id="${i}" onclick="assignToTask(${i})">

        <i id="assign-icon${i}">+</i></div> 
        </div>
        </div>`;
    }
}


let currentUser = [];

function assignToTask(i) {
    if (currentUser.includes(i)) {
        document.getElementById(i).classList.remove('assign-to-plus-activated');
        document.getElementById('assign-icon' + i).classList.remove('assign-to-plus-activated');
        let indexAssignUser = allUsers.indexOf(allUsers[i]);
        allUsers.splice(indexAssignUser, 1);
        let index = currentUser.indexOf(i);
        currentUser.splice(index, 1);
    } else {
        document.getElementById(i).classList.add('assign-to-plus-activated');
        document.getElementById('assign-icon' + i).classList.add('assign-to-plus-activated');
        allUsers.push(allUsers[i]);
        currentUser.push(i);
    }
    console.log('user:', currentUser);
}