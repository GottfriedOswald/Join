allTasks = [];


function init() {
    includeHTML();
    loadFromBackend();
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
    showAllTasks();
}

function showAllTasks() {
    let taskRow = document.getElementById('task-row');

    for (let i = 0; i < allTasks.length; i++) {
        taskRow.innerHTML += `

    <tr class="table-row" id="${allTasks[i]['id']}" >
        <td class="table-profil">
            <div class="profil-content">
                <img id="profile-img" class="profil-img" src="">
                <div class="profil-name-email">
                    <div id="profil-name" class="profil-name">${allTasks[i]['user']}</div>
                    <a id="profil-email" href="#">test@guest.de</a>
                </div>
            </div>
        </td>
        <td>${allTasks[i]['category']}</td>
        <td>${allTasks[i]['description']}</td>
    </tr>

    `;
    }
}