function setDeleteCard(e){
  const card = e.parentNode.parentNode.parentNode.parentNode.parentNode;
  card.setAttribute("id", "deletting");
}

function deleteCancel(){
  const card = document.getElementById("deletting");
  card.removeAttribute("id");
}

function deleteTask(){
  const card = document.getElementById("deletting");
  card.remove();
}
