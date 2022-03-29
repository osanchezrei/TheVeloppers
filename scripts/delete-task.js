function removeElement(element){
    document.getElementById("deleteButton").onclick = () =>{
        const card = element.parentNode.parentNode.parentNode.parentNode;
        card.remove();
    }
}
