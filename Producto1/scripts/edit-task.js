function setEditCard(e){
  const card = e.parentNode.parentNode.parentNode.parentNode.parentNode;
  card.setAttribute("id", "editting");
  defaultContentModal()
}

function editCancel(){
  const card = document.getElementById("editting");
  card.removeAttribute("id");
}

function editSave(){
  const card = document.getElementById("editting");
  //TODO
  card.removeAttribute("id");
}


function defaultContentModal(){
  const card = document.getElementById("editting");  //obtenemos la tarjeta con id editting
  const titulo = document.getElementById("titleEdit"); //obtenemos el imput del titulo, hay que modificar los id para que no sean los del modal copiado
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
