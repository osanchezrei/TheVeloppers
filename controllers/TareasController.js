const Tarea= require('../models/Tareas.js');
const { graphql, parseConstValue} = require('graphql');


const resolversTareas= {
  Query:{
    async getAllTareas(){
      const tareas = await Tarea.find({});
      return tareas;
    },

    async getTareasByPanel(_, {idPanel}){
      const tareas= await Tarea.find({"idPanel": idPanel});
      return tareas;
    },

    async getTareaById(_, {id}){
      const tarea= await Tarea.findOne({"_id": id});
      return tarea;
    }
  },

  Mutation:{
    async createTarea({titulo, descripcion, estado, prioridad, idPanel }){
      const tarea= new Tarea({titulo, descripcion, estado, prioridad, idPanel });
      return createdTarea= await tarea.save();
    },

    async updateTarea({titulo, descripcion, estado, prioridad}){
      const tarea = await Tarea.findOne({"_id" : id });
      tarea.titulo = { titulo };
      tarea.descripcion = { descripcion };
      tarea.estado = { estado };
      tarea.prioridad = { prioridad };
      return updatedTarea = await tarea.save();
    },

    async deleteTarea({id}){
      const tarea= await Tarea.deleteOne({"_id": id })
      .then( () =>
        console.log("Delete data")
      )
      .catch( (err) =>
        console.log(err)
      )
    }
  }

}

exports.resolversTareas= resolversTareas;
