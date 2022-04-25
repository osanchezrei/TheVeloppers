const express = require('express');  //requerimos express
const connection= require('./connection');  //requerimos el el script con la conexion
const  { schema, root }= require('./graphql/typedef');
const { graphqlHTTP }= require('express-graphql'); //grphql express
/*const { Server }= require('socket.io');  //importamos socket.io
const { createServer }= require('http');*/
const app = express(); //asignamos la funcion exprexx del paquete anterior a un variable para su manejo
var http= require('http').Server(app);
var io= require('socket.io')(http);


connection.connectMongoDB(); //conectamos con mongodb


const port= '3000'; //creamos una constante para guardar el puerto

app.use(express.static(__dirname + '/httdocs/')); //utilizando el metodo use de la funcion, indicamos cual sera la ruta de los ficheros


//endpoint de graphql
//console.log(schema);
//console.log(root);
//endpoint graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

//servidor socket.io
//const httpServer= createServer(app);
//const io= new Server(httpServer);

io.on('connection', (socket) => {
    //controla el evento de nuevos mensajes
    socket.on('new-message', (data) => {
        console.log(data);
        io.sockets.emit('messages', data);
    });
});

function sendMessage(data){
    io.sockets.emit('messages', data);
}

http.listen(port, () => {
    console.log('Listening on port 3000')
});

module.exports= sendMessage;
