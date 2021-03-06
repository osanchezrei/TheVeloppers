//import { setDraggables } from './drag-and-drop'
//const setDraggables = require('./drag-and-drop.js');
let column; //variable para saber la columna
let panelId; //variable global para la el panelId que llega desde la url
let row;  //variable para poder poner el id al nuevo elemento de forma asincrona, sera la raiz del nuevo elemento
//var socket= io.connect("localhost:3000", { forceNew: true }) //socket de eventos

function getUrlGet(){   //obtenemos el panelId que llega como GET en la url
  const url= document.location.search;
  panelId= url.substring(1) + "";
  getAllTareasByPanel(panelId);
  loadTextAndTitle(panelId);
}

window.onload= getUrlGet; //nada mas cargar la ventana lanzamos la funcion para obtner la id del panel, ESTO SOLO PUEDE USARSE UNA VEZ

function discoverColumn(n) {
  if (n === "TODO") {
    column = "TODO";
  }
  else if (n === "INPROGRESS") {
    column = "INPROGRESS";
  }
  else {
    column = "DONE";
  }
}


function createTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  addTask(title, description, priority, null, null, true);
}

async function addTask(titulo, descripcion, priority, estado, id, flag) {   //el flag es true si es una nueva tarea
  let element;
  //crear elementos
  if (column === "TODO" || estado === "TODO") {
    element = document.getElementById("col1");
    estado = "TODO";
  }
  else if (column === "INPROGRESS" || estado === "INPROGRESS") {
    element = document.getElementById("col2");
    estado = "INPROGRESS";
  }
  else {
    element = document.getElementById("col3");
    estado = "DONE";
  }
  row = document.createElement("div");
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
  //a??adir clases, atributos, funcionalidades y contenido
  row.classList.add("row");
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
  //setDraggables();  //lamamos a esta funcion para que el elemento que se acaba de crear sea arrastrable
  if(flag){
    saveTareaDB(titulo, descripcion, estado, priority, panelId);
  }
  else{
    row.setAttribute('id', id);
  }
  //setDraggables(); no funciona, ??por que antes si lo hacia?
}

//a??adir tarea a la base de datos, OK
function saveTareaDB(title, descripcion, estado, prioridad, idPanel){
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body:
        `mutation{
        createTarea(
            titulo: "${title}",
            descripcion: "${descripcion}"
            estado: "${estado}"
            prioridad: "${prioridad}"
            idPanel: "${idPanel}"
        ){id}
    }`
  })
  .then(res => res.json())
  .then(res => {
    row.setAttribute('id', res.data.createTarea.id)
    socket.emit('new-message', 'Create task')
  })
  .catch(err => console.log(err))
}


//a??adir la funcionalidad al boton
const saveNewTask = document.getElementById("saveNewTask");
saveNewTask.addEventListener("click", createTask);

//recupera todas las del panel, OK
function getAllTareasByPanel(idPanel){
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query ($idPanel: String!){
          getTareasByPanel(idPanel: $idPanel){
            titulo
            descripcion
            estado
            prioridad
            id
          }
        }`,
        variables:{
          idPanel: idPanel
        }

       }),
  })
  .then(res => res.json())
  .then(res => {
    for (let i = 0; i < res.data.getTareasByPanel.length; i++) {
      addTask(
        res.data.getTareasByPanel[i].titulo,
        res.data.getTareasByPanel[i].descripcion,
        res.data.getTareasByPanel[i].prioridad,
        res.data.getTareasByPanel[i].estado,
        res.data.getTareasByPanel[i].id,
        false);
    }
  })
  .catch(err => console.log(err))
}



//cargar el titulo y el texto del panel en el titulo y la descripcion de la tarea, OK
function loadTextAndTitle(id_panel){
  const titleMain= document.getElementById('mainTitle');
  const textMain= document.getElementById('mainText');
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query:`query ($_id: String!){
          getPanelByid(_id: $_id){
            titulo
            descripcion
          }
        }`,
        variables:{
          _id: id_panel
        }
    }),
  })
  .then(res=> res.json())
  .then(res=>{
    console.log(res)
    //console.log(typeof(res.data.getPanelByid.titulo))
    titleMain.innerHTML= res.data.getPanelByid.titulo,
    textMain.textContent= res.data.getPanelByid.descripcion
  }
  )
  .catch(err => console.log(err))
}
