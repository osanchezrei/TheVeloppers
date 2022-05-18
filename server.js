const express = require('express');  //requerimos express
const connection= require('./connection');  //requerimos el el script con la conexion
const  { schema, root }= require('./graphql/typedef');
const { graphqlHTTP }= require('express-graphql'); //grphql express
const fileUpload= require('express-fileupload');
const app = express(); //asignamos la funcion exprexx del paquete anterior a un variable para su manejo


const { useServer }=require('graphql-ws/lib/use/ws');
const { WebSocket }=require('ws');
const { execute, subscribe }= require('graphql');
const { createServer }= require('http');
const { graphiqlExpress }= require('graphql-server-express');
const { resolversTareas }=  require('./controllers/TareasController'); //importamos los resolvers de Tareas


var http= require('http').Server(app);
var io= require('socket.io')(http);


connection.connectMongoDB(); //conectamos con mongodb


const port= '3000'; //creamos una constante para guardar el puerto del servidor http
const ws_port= '5000'; //creamos otra constante para el puertod del servidor de sockets



app.use(express.static(__dirname + '/httdocs/')); //utilizando el metodo use de la funcion, indicamos cual sera la ruta de los ficheros
app.use(fileUpload());  //utilizamos la funcion file upload para subir ficheros



//endpoint para subir ficheros
app.post('/upload', (req,res)=>{
    console.log('in function upload');
    let file= req.files.file
    let srvUrl= './uploadFiles/'+file.name
    file.mv(srvUrl, err =>{
        if(err){
            sendMessage('Error al subir el fichero')
            console.log(err)
            return res.status(500).send({message: err})
        }
        sendMessage('Fichero subido')
        return res.status(200).send({message: 'Fichero subido'})
    })
});

//websocket server
const wsServer = new WebSocket.Server({
  
  http, // Your HTTP server
  path: '/graphql',
  port: 5000,
});

useServer(
  {
    schema,
    execute,
    subscribe,
    resolversTareas
  },
  wsServer
);

//endpoint graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  //graphiql: true,
  //subscriptionsEndpoint: `ws://localhost:3000/graphql`
}));

//endpoint graphiql
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:5000/graphql`,
}));

//servidor socket.io
io.on('connection', (socket) => {
    //controla el evento de nuevos mensajes
    socket.on('new-message', (data) => {
        console.log(data);
        io.sockets.emit('messages', data);
    });
});

//funcion para enviar mensajes a sockets
function sendMessage(data){
    io.sockets.emit('messages', data);
}


//incializamos el servidor http
http.listen(port, () => {
    console.log('Listening on port '+ port)
});

//hacemos exportable la funcion send
module.exports= sendMessage;
