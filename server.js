const express = require('express');  //requerimos express
const connection= require('./connection');  //requerimos el el script con la conexion
const  { schema, root }= require('./graphql/typedef');
const { graphqlHTTP }= require('express-graphql'); //grphql express


connection.connectMongoDB(); //conectamos con mongodb

const app = express(); //asignamos la funcion exprexx del paquete anterior a un variable para su manejo
const port= '3000'; //creamos una constante para guardar el puerto

app.use(express.static(__dirname + '/httdocs/')); //utilizando el metodo use de la funcion, indicamos cual sera la ruta de los ficheros


//endpoint de graphql
console.log(schema);
console.log(root);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(port, () =>{  //ponemos el servidor a escuchar con el metodo listener, el primer argumento es el puerto en el que escuchara, el sigundo una funcion en el la que solo indicamos que el servidor esta a la escuha
  console.log('Server listening on port ' + port);
});
