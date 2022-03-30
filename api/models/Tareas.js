import mongoose from 'mongoose';
const { Schema } = mongoose;

const tareas = new Schema({
 id: int,
 idPanel: int,
 titulo: String,
 descripcion: String,
 fecha_inicio: Date,
 fecha_fin: Date,
 estado: String
  }
});