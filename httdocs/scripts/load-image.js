
function loadImage(){
  let file = document.getElementById("btn").files[0];
  let reader = new FileReader();
  let formData= new FormData();
  let element= document.getElementById("img");
  if (file) {
      //pintamos la imagen
      reader.readAsDataURL(file );
      reader.onloadend = function () {
        element.src = reader.result;
        element.width=36;
        element.height=32;
      }
      formData.append("file", file);
      fetch('http://localhost:3000/upload', {method: "POST", body: formData});
  }
}
