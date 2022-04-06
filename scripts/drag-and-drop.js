//deshabilitamos el comportamiento normal del navegado para que no interfiera en el evento
//
//es la funcion que se ejecuta cuando termina el evento
function eventDrop(e) {
  e.stopPropagation(); //detenemos las posibles redirecciones de los enlaces
  e.preventDefault(); //deshabilitamos el comportamiento por defecto del navegador
  let data = e.dataTransfer.getData('text');
  if(e.target.classList.contains("col-lg-3")){
    e.target.appendChild(document.getElementById(data));
  }
}

function eventDragOver(e) {
    e.preventDefault();
}

//bajamos la opacidad del elemento mientras se mueve y guardamos los datos que contiene
//para luego poder solatarlos en otra parte
//es la funcion que se ejecuta cuando comienza el evento
function eventDragStart(e) {
  this.style.opacity = '0.4'; //se baja la opacidad
  e.dataTransfer.effetAllowed= 'move';
  this.id = 'arrastrado';
  //e.setAttribute("id", "arrastrado");
  e.dataTransfer.setData('text', this.id);  //capturamos el contenido del elemento arrastrado
}

//dejamos la opacidad como estaba antes del inicio del evento
function eventDragEnd(e) {
  this.style.opacity = '1';
  this.removeAttribute("id");
}

//asignar las anteriores funciones a los elementos que son draggables, lo creamos en un funcion que se llamara al cargar la pagina
// y cada vez que se cree un elemento nuevo
function setDraggables(){
  let items = document.querySelectorAll('[draggable=true]');
  items.forEach(function(item) {
    item.addEventListener('dragstart', eventDragStart);
    item.addEventListener('dragend', eventDragEnd);
    //item.addEventListener('drop', eventDrop);
  });
}

window.onload= setDraggables();


let items2 = document.querySelectorAll('.col-lg-3');
items2.forEach(function(item){
  item.addEventListener('dragover', eventDragOver);
  item.addEventListener('drop', eventDrop);
});
