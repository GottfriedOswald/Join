// Leeres Array
let allTasks = [];
setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');

users = [{
        'id': 0,
        'image': 'GottfriedOswald.jpg',
        'name': 'Gottfried O.'
    },
    {
        'id': 1,
        'image': 'michelleH.jpg',
        'name': 'Michelle H.'
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
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
    showUsers();
}

function addTask() {
    let titel = document.getElementById('titel').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;

    // let status ='todo';
    // let id = Math.round(Math.random() * 10000);

    let task = {
        'id': id,
        'titel': titel,
        'category': category,
        'description': description,
        'createdAt': date,
        'urgency': urgency
    }

    allTasks.push(task);
    backend.setItem('allTasks', JSON.stringify(allTasks));

}

function showUsers() {
    document.getElementById('assignet-to-content').innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        document.getElementById('assignet-to-content').innerHTML += `
        <div>
        <div class="user">
        <img class="imgcyrcle" src="img/user/${user['image']}" id="${user['id']}">
        <span>${user['name']}</span>
        <img class="icon-plus" src="./assets/img/icons8-plus.png"> 
        </div>
        </div>`;
    }
}