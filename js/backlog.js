setURL('http://gruppe-107.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    console.log('From backend', allTasks);
    loadValues();
}

function loadValues() {

    let taskRow = document.getElementById('taskRow');
    taskRow.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        taskRow.innerHTML += `
        <tr class="${allTasks[i]['urgency']}">
            <td class="td-assigned">
                <img src="${currentUser[i]['img']}">
                <div id="name-assigned" class="name-assigned">
                    <span>${currentUser[i]['name']}</span>
                    <span>${currentUser[i]['email']}</span>
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

