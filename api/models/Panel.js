import mongoose from 'mongoose';
const { Schema } = mongoose;

const panel = new Schema({
 id: int,
 titulo: String,
 descripcion: String,
 tareas: String
  }
});