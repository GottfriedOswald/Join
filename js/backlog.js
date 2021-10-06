function init() {
    includeHTML();
    loadFromBackend();
    showAllTasks();

}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
}

function showAllTasks() {
    for (let i = 0; i < allTasks.length; i++) {
        document.getElementById('table').innerHTML += `
    <tbody>
    <tr class="table-row">
        <td class="table-profil">
            <div class="profil-content">
                <img id="profile-img" class="profil-img" src="">
                <div class="profil-name-email">
                    <div id="profil-name" class="profil-name">${allTasks['titel']}</div>
                    <a id="profil-email" href="#">test@guest.de</a>
                </div>
            </div>
        </td>
        <td>Managment</td>
        <td>info</td>
    </tr>
</tbody>
    `;
    }
}