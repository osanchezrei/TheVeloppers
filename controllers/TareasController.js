const Tarea= require('../models/Tareas.js');
const { graphql, parseConstValue} = require('graphql');


const resolversTareas= {
  Query:{
    async getAllTareas(){
      const tareas = await Tarea.find({});
      return tareas;
    },
    async getTareasByPanel({idPanel}){
      const tareas= await Tarea.find({idPanel});
      return tareas;
    },
    async getTareaById({id}){
      const tarea= await Tarea.findById(id);
      return tarea;
    }
  },

  Mutation:{
    async createTarea({titulo, descripcion, estado, prioridad, idPanel }){
      const tarea= new Tarea({titulo, descripcion, estado, prioridad, idPanel });
      return createdTarea= await tarea.save();
    },

    async updateTarea({id, titulo, descripcion, estado, prioridad}){
      return tarea= await Tarea.findOneAndUpdate({id}, {titulo, descripcion, estado, prioridad}, {new: true});
    },

    async deleteTarea({id}){
      const tarea= await Tarea.findByIdAndDelete(id)
      .then( () =>
        console.log("Deleted Object: " + id)
      )
      .catch( (err) =>
        console.log(err)
      )
    }
  }

}

exports.resolversTareas= resolversTareas;
