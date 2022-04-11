const mongoose = require('mongoose');// requerimos mongoose

function connectMongoDB(){
  //creamos el connection string para conectar con el servidor atlas
  const mongoUrl = 'mongodb+srv://thevelopers:lxIEUA5fGNI1SLNR@cluster0.zcrn6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  //utilizamos el metodo connect de mongoose, este recibe por argumento la url y un objeto en el que pasamos ciertos parametros para evitar errores
  mongoose.connect( mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  //creamos una constante con la conexion de moongoose para poder escuchar sus eventos
  const dbConnection = mongoose.connection;

  //con el metodo on manejamos los eventos, en este caso monitorizamos el evento error, con una fucion anonima imprimos el error
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));

  //el evento open, verificamso si la conexion a sido exitosa
  dbConnection.on("open", () => console.log("Connected to cluster0.zcrn6.mongodb.net"));
}

//hacemos exportable la funcion
exports.connectMongoDB= connectMongoDB ;
