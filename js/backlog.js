let currentUser = [];
setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    console.log('From backend', allTasks);
    loadValues();
    currentProfil();
}

function loadValues() {

    let taskRow = document.getElementById('taskRow');
    taskRow.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        taskRow.innerHTML += `
        <tr class="${allTasks[i]['urgency']}">
            <td class="td-assigned">
                <img src="${allTasks[i]['img']}">
                <div id="name-assigned" class="name-assigned">
                    <span>${allTasks[i]['name']}</span>
                    <span>${allTasks[i]['email']}</span>
                </div>
            </td>
            <td class="td-category">
                <span>${allTasks[i]['category']}<span>
            </td>
            <td class="td-details">
                <span>${allTasks[i]['description']}</span>
            </td>
        </tr>
    `;
    }
}

function currentProfil() {
    let profilIcon = document.getElementById('profil-picture');
    profilIcon.src = currentUser[0].img;
 }