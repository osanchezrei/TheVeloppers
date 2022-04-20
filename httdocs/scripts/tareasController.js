//const mongoose = require('mongoose');
/*const { addTask } = require('./create-task');  //importamos la funcion addTask del modulo create Task para poder reutilizarla


let panelId;
export function getUrlGet(){
  const url= document.location.search;
  panelId= url.substring(1);
}*/



//const panelId= window.location.substring(1);  //recuperamos el id del panel el cual hemos pasado como get en la url


/*function addTaskDB(titulo, descripcion, priority, estado, id) {
  let element;
  //crear elementos
  //if (column === TOD" || estado == TOD") {
    element = document.getElementById("col1");
  }
  else if (column === "INPROGRESS" || estado == "INPROGRESS") {
    element = document.getElementById("col2");
  }
  else {
    element = document.getElementById("col3");
  }
  const row = document.createElement("div");
  const card = document.createElement("div");
  const cardBody = document.createElement("div");
  const title = document.createElement("h5");
  const description = document.createElement("p");
  const container = document.createElement("div");
  const containerRow = document.createElement("div");
  const col1 = document.createElement("div");
  const span = document.createElement("span");
  const col2 = document.createElement("div");
  const editButton = document.createElement("button");
  const imgEditButton = document.createElement("img");
  const col3 = document.createElement("div");
  const deleteButton = document.createElement("button");
  const imgDeleteButton = document.createElement("img");
  //añadir clases, atributos, funcionalidades y contenido
  row.classList.add("row");
  row.id = id;   //le damos la id
  row.setAttribute("draggable", "true");
  card.classList.add("card", "cursor-move");
  cardBody.classList.add("card-body");
  title.classList.add("card-title");
  title.textContent = titulo;
  description.classList.add("card-text");
  description.textContent = descripcion;
  container.classList.add("container", "m-0", "p-0");
  containerRow.classList.add("row");
  col1.classList.add("col-10");
  if (priority === "1") {
    span.classList.add("badge", "bg-success");
    span.textContent = "Low";
  }
  else if (priority === "2") {
    span.classList.add("badge", "bg-warning");
    span.textContent = "Medium";
  }
  else {
    span.classList.add("badge", "bg-danger");
    span.textContent = "Hight";
  }
  col2.classList.add("col-1");
  editButton.classList.add("btn");
  editButton.setAttribute("type", "button");
  editButton.setAttribute("data-bs-toggle", "modal");
  editButton.setAttribute("data-bs-target", "#editTaskModal");
  editButton.setAttribute("onclick", "setEditCard(this)");
  imgEditButton.classList.add("mt-3");
  imgEditButton.src = "img/icons-nota-resize.png";
  col3.classList.add("col-1");
  deleteButton.classList.add("btn");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("data-bs-toggle", "modal");
  deleteButton.setAttribute("data-bs-target", "#removeTaskModal");
  deleteButton.setAttribute("onclick", "setDeleteCard(this)");
  imgDeleteButton.classList.add("mt-3");
  imgDeleteButton.src = "img/basura.png";
  //add parents
  row.appendChild(card);
  card.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(container);
  container.appendChild(containerRow);
  containerRow.appendChild(col1);
  containerRow.appendChild(col2);
  containerRow.appendChild(col3);
  col1.appendChild(span);
  col2.appendChild(editButton);
  editButton.appendChild(imgEditButton);
  col3.appendChild(deleteButton);
  deleteButton.appendChild(imgDeleteButton);
  element.appendChild(row);
  setDraggables();  //lamamos a esta funcion para que el elemento que se acaba de crear sea arrastrable
}


//cargar las tareas al cargar la pagina
function loadTask(id){
  fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          query: ` query{
              getTareasByPanel(id::"${id}"){
                titulo
                descripcion
                prioridad
                estado
                id
              }
            }`}),
  })
      .then(res => res.json())
      .then(res => {
          for (let i = 0; i < res.data.getTareasByPanel.length; i++) {
              let newTarea = new Object(Tarea);
              let titulo = res.data.getTareasByPanel[i].titulo;
              let descripcion = res.data.getTareasByPanel[i].descripcion;
              let prioridad = res.data.getTareasByPanel[i].prioridad;
              let estado = res.data.getTareasByPanel[i].estado;
              let id = res.data.getTareasByPanel[i].id;
              newTarea.addTaskDB(titulo, descripcion, prioridad, estado, id);
              taskArray.push(newTask);
              console.log(res);
          }
      })
      .catch(err => console.log(err))
})
}
*/

/*async function importar() {
  const mongoose= await require('mongoose');
  //console.log(controller.saveTareaDB);
}

importar()*/
//añadir tarea a la base de datos
export function saveTareaDB(title, desciption, estado, prioridad, idPanel){
  console.log(titulo, descripcion, estado, typeof(priority), panelId);
fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body:
        `mutation{
        createTarea(
            titulo: "${title}",
            descripcion: "${description}"
            estado: "${estado}"
            prioridad: "${prioridad}"
            idPanel: "${idPanel}"
        ){id}
    }`
})
  .then(res => res.json())
  .then(res => {
    console.log(res);
    console.log(res.id);  //no consigo recuperar la id
  })
  .catch(err => console.log(err))
}


//module.exports = { hola, saveTareaDB } ;


//module.exports= saveTareaDB;
