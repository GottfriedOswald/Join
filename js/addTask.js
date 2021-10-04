// Leeres Array
let allTasks = [];
setURL('http://gruppe-107.developerakademie.com/smallest_backend_ever');


async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
}

function addTask() {
    let titel = document.getElementById('titel').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;

    let task = {
        'titel': titel,
        'category': category,
        'description': description,
        'createdAt': date,
        'urgency': urgency
    }

    allTasks.push(task);
    backend.setItem('allTasks', JSON.stringify(allTasks));

}
