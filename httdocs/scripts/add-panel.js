
var panelArray = new Array();

const Panel = {
    panelCounter : '0',
    addPanel(title, description){
        //Creamos un objeto panel
        const element = document.getElementById('columns');
        const col = document.createElement("div");
        const card = document.createElement("div");
        const img = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardDescription = document.createElement("p");
        const cardFooter = document.createElement("div");
        const deleteButton = document.createElement("button");
        const deleteButtonContent = document.createElement("i");
        const goButton = document.createElement("a");
        const newButton = document.getElementById("new");
        //Añadimos las clases
        col.classList.add("col-3", "pt-5");
        card.classList.add("card", "w-auto", "h-100");
        img.className = "card-img-top";
        img.src = "img/placeholder-image.png"
        cardBody.classList.add("card-body", "h-auto");
        cardTitle.innerHTML = title;
        cardDescription.innerHTML = description;
        cardFooter.classList.add("card-footer", "d-flex", "justify-content-between");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButtonContent.classList.add("bi", "bi-trash");
        goButton.classList.add("btn", "btn-primary")
        goButton.href = "/panel_" + this.panelCounter;
        goButton.innerHTML = "Go to panel";
        //Añadimos función removeElement al deleteButton para que permita eliminar
        deleteButton.setAttribute("onclick", "removeElement(this)");
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", "#removeModal");
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
        element.insertBefore(col, element.firstElementChild); // Añade el panel entre el botón de NEW y el último panel existente
        this.panelCounter++;
    }
};

//Agrega un panel nuevo (falta pasar por parametro valores titulo, descripción, imagen, panelID)
//Se lanza desde Modal
function createPanelModal(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    var newPanel = new Object(Panel);
    newPanel.addPanel(title, description);
    document.getElementById("newPanelForm").reset();
}
//Función de eliminación de elemento
function removeElement(element){
    document.getElementById("deleteButton").onclick = () =>{
        const card = element.parentNode.parentNode.parentNode;
        card.remove();
    }
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
