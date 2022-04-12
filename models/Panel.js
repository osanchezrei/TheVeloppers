const mongoose= require('mongoose');

const panelSchema = new mongoose.Schema({
 titulo: String,
 descripcion: String
});


module.exports= Panel= mongoose.model('Panel', panelSchema);
