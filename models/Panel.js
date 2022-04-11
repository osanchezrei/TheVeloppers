const mongoose= require('mongoose');
//const { Schema } = mongoose;
//const tareasModel = mongoose.model('Tareas');

const panelSchema = new mongoose.Schema({
 //__id: Number,
 titulo: String,
 descripcion: String
});


module.exports= Panel= mongoose.model('Panel', panelSchema);
//export const Panel= mongoose.model('Panel', panelSchema);

// exports.Panel= Panel;
