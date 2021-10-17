let currentUser = [];


async function initHelpPage() {
    includeHTML();
    await loadFromBackend();
    currentProfil();

}


function currentProfil() {
    let profilIcon = document.getElementById('profil-picture');
    profilIcon.src = currentUser[0].img;
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    console.log('Loaded from backend allTasks', allTasks);

}