var socket= io.connect("localhost:3000", { forceNew: true }) //socket de eventos

function setDeleteCard(e){
  const card = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  card.classList.add("deletting");
  //card.setAttribute("id", "deletting");
}

//se ejecuta al cancelar la eliminacion
function deleteCancel(){
  //const card = document.getElementById("deletting");
  const card = document.getElementsByClassName('deletting')[0];
  card.classList.remove("deletting");
}

//se ejecuta al confirmar la eliminacion
async function deleteTask(){
  //const card = document.getElementById("deletting");
  const card = document.getElementsByClassName('deletting')[0];
  card.remove();
  await deleteTaskDB(card.getAttribute('id'));
}

//funcion para eliminar la tarea de la base de datos
function deleteTaskDB(id_tarea){
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body:
      `mutation{
        deleteTarea(id: "${id_tarea}"){
        id
      }
    }`,
  })
  .then(res=>{
      socket.emit('new-message', 'Delete task')
  })
  .catch(err=> console.log(err))
}
