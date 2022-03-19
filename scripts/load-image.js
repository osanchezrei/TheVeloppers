function loadImage(){
  let file = document.getElementById("btn").files[0];
  let reader = new FileReader();
  let element= document.getElementById("img");
  if (file) {
    reader.readAsDataURL(file );
    reader.onloadend = function () {
      element.src = reader.result;
      element.width=35;
      element.height=37;
    }
  }
}
