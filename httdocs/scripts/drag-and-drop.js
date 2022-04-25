var socket= io.connect("localhost:3000", { forceNew: true }) //socket de eventos

//deshabilitamos el comportamiento normal del navegado para que no interfiera en el evento
//
//es la funcion que se ejecuta cuando termina el evento
function eventDrop(e) {
  e.stopPropagation(); //detenemos las posibles redirecciones de los enlaces
  e.preventDefault(); //deshabilitamos el comportamiento por defecto del navegador
  let data = e.dataTransfer.getData('text');
  if(e.target.classList.contains('col-lg-3')){
    e.target.appendChild(document.getElementsByClassName(data)[0]);
    if(e.target.getAttribute('id')== 'col1'){
        updateEstadoDB(e.target.getAttribute('id'), 'TODO');
    }
    else if(e.target.getAttribute('id')== 'col2'){
        updateEstadoDB(e.target.getAttribute('id'), 'INPROGRESS');
    }
    else{
        updateEstadoDB(e.target.getAttribute('id'), 'DONE');
    }
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
  this.classList.add('arrastrado');
  e.dataTransfer.setData('text', this.classList);
}

//dejamos la opacidad como estaba antes del inicio del evento
function eventDragEnd(e) {
  this.style.opacity = '1';;
  this.classList.remove('arrastrado');
}

//asignar las anteriores funciones a los elementos que son draggables, lo creamos en un funcion que se llamara al cargar la pagina
// y cada vez que se cree un elemento nuevo
function setDraggables(){
  let items = document.querySelectorAll('[draggable=true]');
  items.forEach(function(item) {
    item.addEventListener('dragstart', eventDragStart);
    item.addEventListener('dragend', eventDragEnd);
  });
}

function updateEstadoDB(id_tarea, estado){
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body:
      `mutation{
        updateTarea(id: "${id_tarea}"
        estado: "${estado}"
        ){
        id
        }
    }`,
  })
  .then(res =>{
      socket.emit('new-message', 'Update Task')
  })
  .catch(err=> console.log(err))
}


let items2 = document.querySelectorAll('.col-lg-3');
items2.forEach(function(item){
  item.addEventListener('dragover', eventDragOver);
  item.addEventListener('drop', eventDrop);
});

document.addEventListener('DOMNodeInserted', setDraggables);
