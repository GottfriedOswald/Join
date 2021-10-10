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
                   <div id="profil-img"> <img class="profil-img" src=""></div>
                    <div class="profil-name-email">
                        <div id="profil-name${i}" class="profil-name"></div>
                        <a id="profil-email${i}" href="#">test@guest.de</a>
                    </div>
                </div>
            </td>
            <td>${allTasks[i]['category']}</td>
            <td>${allTasks[i]['description']}</td>
        </tr>

        `;

        let taskUsers = allTasks[i]['user'];

        for (let j = 0; j < taskUsers.length; j++) {
            document.getElementById(`profil-name${i}`).innerHTML = `
                ${taskUsers[j]['name']}`;
            document.getElementById(`profil-email${i}`).innerHTML = `
                ${taskUsers[j]['email']}
            `;
            document.getElementById('profil-img').src = `
            ${taskUsers[j]['image']}
        `;
        }
    }

}