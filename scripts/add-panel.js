//Agrega un panel nuevo (falta pasar por parametro valores titulo, descripción, imagen)
//
document.getElementById("new").onclick = function addPanel(){
    //Creamos los elementos de cada card
    const element = document.getElementById('columns');
    const col = document.createElement("div");
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const cardDescription = document.createElement("p");
    const cardFooter = document.createElement("div");
    const deleteButton = document.createElement("button")
    const deleteButtonContent = document.createElement("i");
    const goButton = document.createElement("a");
    const newButton = document.getElementById("new");
    //Añadimos las clases 
    col.classList.add("col-3", "pt-5");
    card.classList.add("card", "w-auto", "h-100");
    img.className = "card-img-top";
    img.src = "img/placeholder-image.png"
    cardBody.classList.add("card-body", "h-auto");
    cardTitle.innerHTML = "Title";
    cardDescription.innerHTML = "Description";
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-between");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButtonContent.classList.add("bi", "bi-trash");
    goButton.classList.add("btn", "btn-primary")
    goButton.href = "#";
    goButton.innerHTML = "Go to panel";
    //Añadimos cada nodo a su padre.
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    deleteButton.appendChild(deleteButtonContent);
    cardFooter.appendChild(deleteButton);
    cardFooter.appendChild(goButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);
    element.insertBefore(col, element.firstElementChild);
}

        // <div class="col-3">
        //   <div class="card w-auto h-100">
        //     <img src="img/placeholder-image.png" class="card-img-top" alt="thumbnail">
        //     <div class="card-body h-auto">
        //       <h5 class="card-title">Work</h5>
        //       <p class="card-text">Panel dedicated to work stuff</p>
        //     </div>
        //     <div class="card-footer d-flex justify-content-between">
        //       <button class="btn btn-danger">
        //           <i class="bi bi-trash"></i>
        //       </button>
        //       <a href="#" class="btn btn-primary stretched-link">Go to panel</a>
        //     </div>
        //   </div>
        // </div>