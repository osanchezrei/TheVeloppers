function setEditCard(e){
  const card = e.parentNode.parentNode.parentNode.parentNode.parentNode;
  card.classList.add("editting");
  defaultContentModal()
}

function editCancel(){
  const card = document.getElementsByClassName("editting")[0];
  card.classList.remove("editting");
}

async function editSave(){
  const card = document.getElementsByClassName("editting")[0];
  card.firstElementChild.firstElementChild.textContent= document.getElementById("titleEdit").value; //modificamos el titulo
  card.firstElementChild.firstElementChild.nextSibling.textContent= document.getElementById("descriptionEdit").value; //modificamos la descripcion
  const prioridad= document.getElementById("priorityEdit").value;
  const priotityElement= card.firstElementChild.firstElementChild.nextSibling.nextSibling.firstElementChild.firstElementChild.firstElementChild;
  if(prioridad==="1"){
    deleteBackground(priotityElement);
    priotityElement.textContent= "Low"
    priotityElement.classList.add("bg-success");
  }
  else if(prioridad==="2"){
    deleteBackground(priotityElement);
    priotityElement.textContent= "Medium"
    priotityElement.classList.add("bg-warning");
  }
  else{
    deleteBackground(priotityElement);
    priotityElement.textContent= "Hight"
    priotityElement.classList.add("bg-danger");
  }
  //card.firstElementChild.firstElementChild.nextSibling.nextSibling.firstElementChild.firstElementChild.firstElementChild.textContent= document.getElementById("priorityEdit").value;
  card.classList.remove("editting");
  await updateTareaDB(card.getAttribute('id'), card.firstElementChild.firstElementChild.textContent, card.firstElementChild.firstElementChild.nextSibling.textContent, prioridad)
}


function deleteBackground(element){
  element.classList.remove("bg-success");
  element.classList.remove("bg-warning");
  element.classList.remove("bg-danger");
}


function defaultContentModal(){
  const card = document.getElementsByClassName("editting")[0];  //obtenemos la tarjeta con id editting
  const titulo = document.getElementById("titleEdit"); //obtenemos el imput del titulo
  const defaultTitle= card.firstElementChild.firstElementChild.textContent; //obtenemos el valor por defecto del titulo de la tarjeta
  titulo.setAttribute("value", defaultTitle);  //introducimos el valor por defecto
  const descripcion = document.getElementById("descriptionEdit");
  const defaultDescription= card.firstElementChild.firstElementChild.nextSibling.textContent;
  descripcion.textContent= defaultDescription;
  const priority = document.getElementById("priorityEdit");
  const defaultPriorityElement= card.firstElementChild.firstElementChild.nextSibling.nextSibling.firstElementChild.firstElementChild.firstElementChild;
  if(defaultPriorityElement.textContent === "Low"){
    priority.childNodes[1].setAttribute("selected", "selected");
  }
  else if(defaultPriorityElement.textContent === "Medium"){
    priority.childNodes[3].setAttribute("selected", "selected");
  }
  else{
    priority.childNodes[5].setAttribute("selected", "selected");
  }
}

//funcion para guardar tarea editada en la base de datos
function updateTareaDB(id_tarea, titulo, descripcion, priority ){
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body:
      `mutation{
        updateTarea(id: "${id_tarea}"
        titulo: "${titulo}"
        descripcion: "${descripcion}"
        prioridad: "${priority}"){
        id
        }
    }`,
  })
  .catch(err=> console.log(err))
}
