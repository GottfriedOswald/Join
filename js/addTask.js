// Arrays
let allTasks = [];
let assignUser = [];
let allUsers = [{
        'id': 0,
        'img': './img/user/GottfriedOswald.jpg',
        'name': 'Gottfried',
        'email': 'Gottfried@web.de',
        'password': 'Gottfried'
    },
    {
        'id': 1,
        'img': './img/user/michelleH.jpg',
        'name': 'Michelle',
        'email': 'Michelle@web.de',
        'password': 'Michelle'

    },
    {
        'id': 2,
        'img': './img/user/guest.png',
        'name': 'Kaan',
        'email': 'Kaan@web.de',
        'password': 'Kaan'
    },
    {
        'id': 3,
        'img': './img/user/guest.png',
        'name': 'Guest',
        'email': 'Guest@web.de',
        'password': ''

    },
];
let currentUser = [];
let userAssignToTask = [];

setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');

async function init() {
    includeHTML();
    await loadFromBackend();
    showUsers();
    selectedUser();
    today();
    currentProfil();
}

function today() {
    let today = new Date().toISOString().substr(0, 10);
    console.log(today);
    document.querySelector('#date').value = today;
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
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
        'img': img,
        'user': assignUser
    }

    allTasks.push(task); //push new task to Array allTasks
    saveToBackend();
    clearInputfields();
    today();
    showUsers();
    openPopUp();

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
         <div class="assign-to-plus" id="${i}" onclick="assignToTask(${i})">

         <i id="assign-icon${i}" class="fas fa-plus"></i></div>  `;

    }
}

// Function for the User Box
function selectedUser() {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
    });

}

//Funtion for add Users to Task
function assignToTask(i) {
    if (userAssignToTask.includes(i)) {
        document.getElementById(i).classList.remove('selectedPlus');
        document.getElementById('assign-icon' + i).classList.remove('minus');
        let indexAssignUser = assignUser.indexOf(assignUser[i]);
        assignUser.splice(indexAssignUser, 1);
        let index = userAssignToTask.indexOf(i);
        userAssignToTask.splice(index, 1);
    } else {
        document.getElementById(i).classList.add('selectedPlus');
        document.getElementById('assign-icon' + i).classList.add('minus');
        assignUser.push(allUsers[i]);
        userAssignToTask.push(i);
    }
    console.log('user:', assignUser);
}


//Function for open and close Pop Up when Task is done
function closePopUp() {
    document.getElementById('pop-up').classList.add('d-none');
}

function openPopUp() {
    document.getElementById('pop-up').classList.remove('d-none');
}


function currentProfil() {
    let profilIcon = document.getElementById('profil-picture');
    profilIcon.src = currentUser[0].img;
}