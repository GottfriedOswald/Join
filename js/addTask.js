// Leere Arrays
let allTasks = [];
let assignUser = [];

setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');

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

// Funktion für die User Box

function selectedUser() {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
    });

}




setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');


async function init() {
    includeHTML();
    await loadFromBackend();
    showUsers();
    selectedUser();
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
    let name = currentUser[0]['name'];
    let email = currentUser[0]['email'];
    let img = currentUser[0]['img'];
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
    window.location.href = "../board.html";
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

    document.getElementById('option').innerHTML = '';
    for (let i = 0; i < allUsers.length; i++) {
        let user = allUsers[i];

        document.getElementById('option').innerHTML += `
        <div class="option-user">
         <img class="imgcyrcle" src="${user['img']}" id="user-img">
         <input type="radio" class="radio" id="gottfried" name="user" />
         <label for="user">${user['name']}</label>
         <div class="check" id="">
         <div onclick="addUsertoTask(${i})"><img id="check${i}" class="img-icon" src="./img/check.png"></div>
         <div onclick="deleteUserFromTask(${i})"><img id="minus${i}" class="img-icon" src="./img/minus.png"></div>
        </div>  `;

    }
}


let currentUser = [];


function addUsertoTask(i) {
    document.getElementById('check' + i).classList.add('active');
    document.getElementById('minus' + i).classList.remove('delete');
    currentUser.push(allUsers[i]);
    currentUser.push(i);

    alert('User hinzugefügt');
    console.log('user:', currentUser);
}

function deleteUserFromTask(i) {
    if (currentUser.includes(i)) {
        document.getElementById('minus' + i).classList.add('delete');
        document.getElementById('check' + i).classList.remove('active');
        let indexAssignUser = allUsers.indexOf(allUsers[i]);
        allUsers.splice(indexAssignUser, 1);
        let index = currentUser.indexOf(i);
        currentUser.splice(index, 1);

        alert('User gelöscht');
        deleteUserFromBackend();
        console.log('user:', currentUser);
    }
}

function deleteUserFromBackend(position) {
    currentUser.splice(position, 1);
    backend.setItem('currentUser', currentUser);
}