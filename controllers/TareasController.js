const Tarea= require('../models/Tareas.js');
const { graphql, parseConstValue} = require('graphql');


const resolversTareas= {
  Query:{
    async getAllTareas(){
      const tareas = await Tarea.find({});
      return tareas;
    },

    async getTareasByPanel(_, {idPanel }){
      const tareas= await Tarea.find({idPanel});
      return tareas;
    },

    async getTareaById(_, {id}){
      const tarea= await Tarea.findOne({ id });
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
      const tarea= await Tarea.deleteOne({ id })
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
