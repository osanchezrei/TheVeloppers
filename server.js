const express = require('express');  //requerimos express
const connection= require('./connection');  //requerimos el el script con la conexion
const  { schema, root }= require('./graphql/typedef');
const { graphqlHTTP }= require('express-graphql'); //grphql express
const fileUpload= require('express-fileupload');

const app = express(); //asignamos la funcion exprexx del paquete anterior a un variable para su manejo

const { SubscriptionServer, SubscriptionClient }= require('subscriptions-transport-ws');
const { execute, subscribe }= require('graphql');
const { createServer }= require('http');
const { resolversTareas }=  require('./controllers/TareasController'); //importamos los resolvers de Tareas


/*const { ApolloClient }= require('apollo-client');
const { graphiqlExpress }= require('graphql-server-express');*/
//TODO ESTO ES DE APOLLO, NO FUNCIONA
/*
//servidor apollo, tampoco funciona para las subscriptions
/*const server = new ApolloServer({
    schema,
    resolversTareas,
  playground: {

    endpoint: "http://localhost:3002/apollo",

    settings: {

      "editor.theme": "light",

    },

  },

});

(async () => {
    await server.start()
    server.applyMiddleware({ app });
    }
)();
//publicacion de apollo
const apolloServer= createServer(server);
apolloServer.listen('3002', ()=> {
    console.log('Run apollo')
});
const client = new SubscriptionClient('ws://localhost:3000/graphql', {
    reconnect: true
});

const apolloClient = new ApolloClient({
    networkInterface: client,
});
*/


//esto funciona, queda probar las subscripciones
const { ApolloServer } = require('apollo-server') ;
const server = new ApolloServer({
  schema,
  resolversTareas,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})



var http= require('http').Server(app);
var io= require('socket.io')(http);


connection.connectMongoDB(); //conectamos con mongodb


const port= '3000'; //creamos una constante para guardar el puerto del servidor http
const portSocket= '3001'; //creamos otra constante para el puertod del servidor de sockets



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

//endpoint graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
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

//websocket server
const websocketServer= createServer((request, response) =>{
    response.writeHead(404);
    response.end();
});

//inciamos el sevidor websocketServer
websocketServer.listen(portSocket, ()=>
    console.log('webSocket server run on port '+ portSocket)
);

//servidor de suscripciones
const subscriptionServer= SubscriptionServer.create(
        { execute, subscribe, schema },
        {server: websocketServer, path: '/graphql'}
);

//incializamos el servidor http
http.listen(port, () => {
    console.log('Listening on port '+ port)
});

//hacemos exportable la funcion send
module.exports= sendMessage;
