let allTasks = [];


/**
 * This function is used to add tasks on localstorage
 * 
 *
 */
function addTask() {
    let titel = document.getElementById('titel');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let urgency = document.getElementById('urgency');

    let task = {
        'titel': titel.value,
        'category': category.value,
        'description': description.value,
        'createdAt': date.value,
        'urgency': urgency.value
    }



    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);

    titel.value = '';
    category.value = '';
    description.value = '';
    date.value = '';
    urgency.value = '';


}


function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    console.log('loaded all Tasks', allTasks);
}