function setEditCard(e){
  const card = e.parentNode.parentNode.parentNode.parentNode.parentNode;
  card.setAttribute("id", "editting");
  defaultContentModal()
}

function editCancel(){
  const card = document.getElementById("editting");
  card.removeAttribute("id");
}



///Queda ver como poner los datos por defecto. El panel modal no existe cuando esta funcion comienza.
function defaultContentModal(){
  const card = document.getElementById("editting");  //obtenemos la tarjeta con id editting
  const titulo = document.getElementById("titleEdit"); //obtenemos el imput del titulo, hay que modificar los id para que no sean los del modal copiado
  const defaultTitle= card.firstElementChild.firstElementChild.textContent; //obtenemos el valor por defecto del titulo de la tarjeta
  titulo.setAttribute("value", defaultTitle);  //introducimos el valor por defecto
  ///hasta aqui bien, hay que poner el valor original de la descricion, la piroridad y guardar.
}
