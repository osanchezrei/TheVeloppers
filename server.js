const express = require('express');  //requerimos express
const connection= require('./connection');  //requerimos el el script con la conexion
connection.connectMongoDB(); //conectamos con mongodb
const  { schema, root }= require('./graphql/typedef');
const { graphqlHTTP }= require('express-graphql'); //grphql express
const PanelController= require('./controllers/PanelController');
const TareasController = require('./controllers/TareasController');
const Tareas = require('./models/Tareas');
//const { graphql, buildSchema } = require('graphql'); //requerimos graphql
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

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


const tarea = new Tarea({
  titulo: 'Test2',
  descripcion: 'Test2',
  estado: 'TODO',
  prioridad : 'LOW',
  idPanel: new ObjectId()
})

// tarea.save()
// .then(result => {
//   console.log(result)
// })

// root.getAllTareas({})
// .then(result => {
//   console.log(result)
// })

// root.getTareasByPanel({idPanel: '62573921998c691267717100'})
// .then(result => {
//   console.log(result)
// })


// root.getTareaById({id: '6257395cf7d292a754cb0ca1'})
// .then(result => {
//   console.log(result)
// })

// root.createTarea({
//   titulo: 'Ultimo test',
//   descripcion: 'ultimo test',
//   estado: 'TODO',
//   prioridad: 'LOW',
//   idPanel: ObjectId('62573921998c691267717100')
// })

// root.updateTarea({
//   id: ObjectId('6257391c6a8ec030fa71aca3'),
//   titulo: 'Antes era test 1'
// })

// root.deleteTarea({id: '6257395cf7d292a754cb0ca1'})