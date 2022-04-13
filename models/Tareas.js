const mongoose= require('mongoose'); 
const Panel = require('./Panel');

const tareasSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    estado: String,
    prioridad: String,
    idPanel: { type: mongoose.Schema.ObjectId, ref: 'Panel' }
});

module.exports= Tarea= mongoose.model('Tarea', tareasSchema);
