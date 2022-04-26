const panelArray = []


document.addEventListener("DOMContentLoaded", function (event) {
    var socket= io.connect("localhost:3000", { forceNew: true })

    //Constructor de un objeto panel
    function Panel(titulo, descripcion, id) {
        this.id = id
        this.titulo = titulo
        this.descripcion = descripcion
    }

    //Función para añadir un panel al DOM
    function addPanel(newPanel) {
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
        cardTitle.innerHTML = newPanel.titulo
        cardDescription.innerHTML = newPanel.descripcion
        cardFooter.classList.add("card-footer", "d-flex", "justify-content-between")
        deleteButton.classList.add("btn", "btn-danger", "deletePanel")
        deleteButtonContent.classList.add("bi", "bi-trash")
        goButton.classList.add("btn", "btn-primary")
        goButton.href = "/" + 'panel-selection.html' + '?' + newPanel.id  //redirecciona a  las tareas
        goButton.innerHTML = "Go to panel"

        //Añadimos función removeElement al deleteButton para que permita eliminar
        deleteButton.setAttribute("id", newPanel.id)
        deleteButton.setAttribute("onclick", "deletePanel(this.id)")

        //deleteButton.setAttribute("data-bs-toggle", "modal")
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

    //Carga de todos los paneles al cargar la página con Query getAllPanels()
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
                let titulo = res.data.getAllPanels[i].titulo
                let descripcion = res.data.getAllPanels[i].descripcion
                let id = res.data.getAllPanels[i].id;
                var newPanel = new Panel(titulo, descripcion, id)
                addPanel(newPanel)
                panelArray.push(newPanel)
            }
        })
        .catch(err => console.log(err))

    //Añadir un panel usando mutation.createPanel(), si no salta error lo carga en la página, se añade un event listener al botón de nuevo panel
    document.getElementById('createPanel').onclick = () => {
        const titulo = document.getElementById("title").value
        const descripcion = document.getElementById("description").value
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/graphql' },
            body:
                `mutation{
                createPanel(
                    titulo: "${titulo}",
                    descripcion: "${descripcion}"
                ){id}
            }`
        })
            .then(res => res.json())
            .then(res => {
                let newPanel = new Panel(titulo, descripcion, res.data.createPanel.id)
                document.getElementById("newPanelForm").reset()
                addPanel(newPanel)
                panelArray.push(newPanel)
                console.log(res.data.createPanel.id)
                if(newPanel){
                    socket.emit('new-message', 'panel created');
                }
            })
            .catch(err => console.log(err))
    }
})

//Delete panels
function deletePanel(element) {
    let removeModal = new bootstrap.Modal(document.getElementById('removeModal'), {});
    removeModal.show();
    document.getElementById("deleteButton").addEventListener("click", (e) => {
        panelArray.forEach(panel => {
            if (panel.id === element) {
                fetch('http://localhost:3000/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/graphql' },
                    body:
                        `mutation{
                    deletePanel(id: "${element}"){
                        id
                    }
                }`
                })
                    .then(res => {
                        res.json()
                    })
                    .then(() => {
                        
                        location.reload()
                    })
                    .catch(err => console.log(err))
            }
        })
    })
}
