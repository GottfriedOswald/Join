// JSON Todo ist noch hardgecodet
let todos = [{
    'id':'0',
    'title':'termin machen',
    'category':'todo'
},
{
    'id':'1',
    'title':'Auto waschen',
    'category':'todo'
},
{
    'id':'2',
    'title':'Kanban Board erstellen',
    'category':'in-progress'
},
{
    'id':'3',
    'title':'promovieren',
    'category':'in-examination'
},
{
    'id':'4',
    'title':'Rechnung zahlen',
    'category':'done'
}];

  let currentDraggedElement;

  /**
   * This function updates the HTML page
   * 
   * @param {} - no parameter needed
   */
function uptadeHTML(){

    let todo = todos.filter(t => t['category'] == 'todo');
    document.getElementById('task1').innerHTML = ``;
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index]   ;
        document.getElementById('task1').innerHTML += generateTodoHTML(element);
    }

    let inProgress = todos.filter(t => t['category'] == 'in-progress');
    document.getElementById('task2').innerHTML = ``;
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index]   ;
        document.getElementById('task2').innerHTML += generateTodoHTML(element);
    }

    let inExamination = todos.filter(t => t['category'] == 'in-examination');
    document.getElementById('task3').innerHTML = ``;
    for (let index = 0; index < inExamination.length; index++) {
        const element = inExamination[index]   ;
        document.getElementById('task3').innerHTML += generateTodoHTML(element);
    }

    let done = todos.filter(t => t['category'] == 'done');
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

  function moveTo(category){
    todos[currentDraggedElement]['category'] = category;
    uptadeHTML();
  }

  function highlight(id){
      document.getElementById(id).classList.add('drag-area-highlight');
  }

  function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function generateTodoHTML(element){
    return `<div class="task" draggable="true" ondragstart="startDragging(${element['id']})">${element['title']}</div>`;
}