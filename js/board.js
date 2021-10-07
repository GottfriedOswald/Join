// JSON Todo ist noch hardgecodet
// let todos = [{
//     'id':'0',
//     'title':'termin machen',
//     'category':'todo'
// },
// {
//     'id':'1',
//     'title':'Auto waschen',
//     'category':'todo'
// },
// {
//     'id':'2',
//     'title':'Kanban Board erstellen',
//     'category':'in-progress'
// },
// {
//     'id':'3',
//     'title':'promovieren',
//     'category':'in-examination'
// },
// {
//     'id':'4',
//     'title':'Rechnung zahlen',
//     'category':'done'
// }];

let allTasks = [];
// let todos = [];

function setID(){
    for (let i = 0; i < allTasks.length; i++) {
        allTasks[i]['id'] = i;
    }
}

async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('Loaded from backend allTasks', allTasks);
    setID();
    uptadeHTML();
    // console.log('hope it works', allTasks);
}

  let currentDraggedElement;

  /**
   * This function updates the HTML page
   * 
   * @param {} - no parameter needed
   */
function uptadeHTML(){

    let todo = allTasks.filter(t => t['status'] == 'todo');
    document.getElementById('task1').innerHTML = ``;
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index]   ;
        document.getElementById('task1').innerHTML += generateTodoHTML(element);
    }

    let inProgress = allTasks.filter(t => t['status'] == 'in-progress');
    document.getElementById('task2').innerHTML = ``;
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index]   ;
        document.getElementById('task2').innerHTML += generateTodoHTML(element);
    }

    let inExamination = allTasks.filter(t => t['status'] == 'in-examination');
    document.getElementById('task3').innerHTML = ``;
    for (let index = 0; index < inExamination.length; index++) {
        const element = inExamination[index]   ;
        document.getElementById('task3').innerHTML += generateTodoHTML(element);
    }

    let done = allTasks.filter(t => t['status'] == 'done');
    document.getElementById('task4').innerHTML = ``;
    for (let index = 0; index < done.length; index++) {
        const element = done[index]   ;
        document.getElementById('task4').innerHTML += generateTodoHTML(element);
    }
}

/**
 * 
 * 
 * @param {number} id - This ist the ID from the Task
 */
function startDragging(id){
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
  }

  function moveTo(status){
    allTasks[currentDraggedElement]['status'] = status;
    uptadeHTML();
  }

  function highlight(id){
      document.getElementById(id).classList.add('drag-area-highlight');
  }

  function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function generateTodoHTML(element){
    return `<div class="task" draggable="true" ondragstart="startDragging(${element['id']})">${element['titel']}</div>`;
}