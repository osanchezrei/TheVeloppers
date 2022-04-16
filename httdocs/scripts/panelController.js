const panelArray = []

document.addEventListener("DOMContentLoaded", function (event) {

    //añade un panel usando mutation.createPanel(), si no salta error lo carga en la página
    document.getElementById('createPanel').onclick = function createPanel() {
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/graphql' },
            body:
                `mutation{
                createPanel(
                    titulo: "${title}", 
                    descripcion: "${description}"
                ){id}
            }`
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.createPanel.id)
                var newPanel = new Object(Panel)
                newPanel.addPanel(title, description, res.data.createPanel.id)
                document.getElementById("newPanelForm").reset()
            })
            .catch(err => console.log(err))
    }


    const Panel = {
        addPanel(title, description, id) {
            //Creamos un objeto panel
            const element = document.getElementById('columns')
            const col = document.createElement("div")
            const card = document.createElement("div")
            const img = document.createElement("img")
            const cardBody = document.createElement("div")
            const cardTitle = document.createElement("h5")
            const cardDescription = document.createElement("p")
            const cardFooter = document.createElement("div")
            const deleteButton = document.createElement("button")
            const deleteButtonContent = document.createElement("i")
            const goButton = document.createElement("a")
            const newButton = document.getElementById("new")
            //Añadimos las clases
            col.classList.add("col-3", "pt-5")
            card.classList.add("card", "w-auto", "h-100")
            img.className = "card-img-top"
            img.src = 'img/placeholder-image.png'//image.value
            cardBody.classList.add("card-body", "h-auto")
            cardTitle.innerHTML = title
            cardDescription.innerHTML = description
            cardFooter.classList.add("card-footer", "d-flex", "justify-content-between")
            deleteButton.classList.add("btn", "btn-danger", "deletePanel")
            deleteButtonContent.classList.add("bi", "bi-trash")
            goButton.classList.add("btn", "btn-primary")
            goButton.href = "/" + id
            goButton.innerHTML = "Go to panel"
            //Añadimos función removeElement al deleteButton para que permita eliminar
            deleteButton.setAttribute("id", id)
            deleteButton.setAttribute("onclick", "deletePanel(this.id)")
            deleteButton.setAttribute("data-bs-toggle", "modal")
            deleteButton.setAttribute("data-bs-target", "#removeModal")
            //Añadimos cada nodo a su padre.
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(cardDescription)
            deleteButton.appendChild(deleteButtonContent)
            cardFooter.appendChild(deleteButton)
            cardFooter.appendChild(goButton)
            card.appendChild(img)
            card.appendChild(cardBody)
            card.appendChild(cardFooter)
            col.appendChild(card)
            element.insertBefore(col, element.firstElementChild)// Añade el panel entre el botón de NEW y el último panel existente
        }
    }

    //Carga de todos los paneles al cargar la página
    fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: ` query{
                getAllPanels{
                  titulo
                  descripcion
                  id
                }
              }`}),
    })
        .then(res => res.json())
        .then(res => {
            for (let i = 0; i < res.data.getAllPanels.length; i++) {
                let newPanel = new Object(Panel)
                let titulo = res.data.getAllPanels[i].titulo
                let descripcion = res.data.getAllPanels[i].descripcion
                let id = res.data.getAllPanels[i].id;
                newPanel.addPanel(titulo, descripcion, id)
                panelArray.push(newPanel)
            }
        })
        .catch(err => console.log(err))
})

//Delete panels
function deletePanel(element){
    console.log(element.id)
    fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body:
            `mutation{
                deletePanel(id: "${element.id}"){id}
            }`
    })
        .then(res => res.json())
        .then(res => {
            location.reload()
            console.log("ID of the deleted panel: " + res.data.id)
        })
        .catch(err => console.log(err))
}