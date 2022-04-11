const mongoose= require('mongoose');
//const { Schema } = mongoose;
const Panel = require('./Panel');
//import Panel from './Panel.js';

const tareasSchema = new mongoose.Schema({
 id: Number,
 titulo: String,
 descripcion: String,
 estado: String,
 prioridad: String,
 idPanel: { type: mongoose.Schema.ObjectId, ref: 'Panel' }
});

module.exports= Tarea= mongoose.model('Tarea', tareasSchema);

//exports.Tarea= Tarea;
