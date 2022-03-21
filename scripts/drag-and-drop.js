//deshabilitamos el comportamiento normal del navegado para que no interfiera en el evento
//
//es la funcion que se ejecuta cuando termina el evento
function eventDrop(e) {
  e.stopPropagation(); //detenemos las posibles redirecciones de los enlaces
  e.preventDefault(); //deshabilitamos el comportamiento por defecto del navegador
  let data = e.dataTransfer.getData('text'); //guardamos el contenido de los datos transferidos en una varialble
  e.target.appendChild(document.getElementById(data)); //creamos un elemento hijo del receptor que es igual al que se esta arrastrando, lo identificamos por su id
}

//esta funcion se ejecuta cuando el cursor arrastrando un elemento pasa sobre un elemento que puede recibirlo
function eventDragOver(e) {
    e.preventDefault();  //ejecutamos esta funcion para deshabilitar el comportamiento por defecto del navegador.
}

//bajamos la opacidad del elemento mientras se mueve y guardamos los datos que contiene
//para luego poder solatarlos en otra parte
//es la funcion que se ejecuta cuando comienza el evento
function eventDragStart(e) {
  this.style.opacity = '0.4'; //se baja la opacidad
  e.dataTransfer.effetAllowed= 'move';  //indicamos que tipo de evento de transferencia de datos va a ser
  this.id = 'arrastrado'; //para referenciar el elemento, le ponemos una id que lo identifique
  e.dataTransfer.setData('text', this.id);  //capturamos el contenido del elemento arrastrado
}

//esta funcion se ejecuta al finalizar el evento
function eventDragEnd(e) {
  this.style.opacity = '1'; //dejamos la opacidad como estaba antes del inicio del evento
  this.id = ''; //eliminamos la id
}

//asignar las anteriores funciones a los elementos que son draggables
let items = document.querySelectorAll('[draggable=true]');
items.forEach(function(item) {
  item.addEventListener('dragstart', eventDragStart);
  item.addEventListener('dragend', eventDragEnd);
  item.addEventListener('drop', eventDrop);
});

//asignamos las funciones necesarias a los elementos receptores
let items2 = document.querySelectorAll('.col-lg-3');
items2.forEach(function(item){
  item.addEventListener('dragover', eventDragOver);
  item.addEventListener('drop', eventDrop);
});
