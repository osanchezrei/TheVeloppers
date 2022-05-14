var socket= io.connect("localhost:3000", { forceNew: true })

socket.on("messages", (data) =>{
    console.log(data);
});