const express = require('express');  //requerimos express
const connection= require('./connection');  //requerimos el el script con la conexion
const  { schema, root }= require('./graphql/typedef');
const { graphqlHTTP }= require('express-graphql'); //grphql express
const fileUpload= require('express-fileupload')
const app = express(); //asignamos la funcion exprexx del paquete anterior a un variable para su manejo

const { ApolloServer, PubSub } = require('apollo-server-express'); //importar apollo server y PubSub
const { ApolloServerPluginDrainHttpServer }= require("apollo-server-core");
const { resolversTareas }=  require('./controllers/TareasController'); //importamos los resolvers de Tareas
const { SubscriptionServer }= require('subscriptions-transport-ws')
const { execute, subscribe }= require('graphql');



const { pubsub }= require('./graphql/pubsub');


var http= require('http').Server(app);
var io= require('socket.io')(http);


connection.connectMongoDB(); //conectamos con mongodb


const port= '3000'; //creamos una constante para guardar el puerto

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

function sendMessage(data){
    io.sockets.emit('messages', data);
}

//servidor de suscripciones
const subscriptionServer= SubscriptionServer.create(
        { execute, subscribe, schema },
        {server: http, path: '/graphql'}
);

const server = new ApolloServer({ //creamos el servidor apollo
    schema,
    resolversTareas,
    csrfPrevention: true,
    plugins: [
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                         subscriptionServer.close();
                    },
                };
            },
        },
    ]
 });


 //esta funcion  envuelta en parentesis se ejectuara sin necesidad de llamarla
 (async function(){
     await server.start();
     server.applyMiddleware({ app, path: '/graphql' });  //creamos un middleware para apollo server
     console.log('created server')
     //server.installSubscriptionHandlers(http);  //utilizamos los Handlers de apollo para escuchar los eventos
 })();

http.listen(port, () => {
    console.log('Listening on port 3000')
});

module.exports= sendMessage;
