const Tarea= require('../models/Tareas.js');
const { graphql, parseConstValue} = require('graphql');
const pubsub = require('../graphql/pubsub');




const create_task= 'create_task';


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
      createdTarea= await tarea.save();
      pubsub.publish(create_task, { tarea });
      return createdTarea;
  },
    async updateTarea({id, titulo, descripcion, estado, prioridad}){
      return tarea= await Tarea.findOneAndUpdate({id}, {titulo, descripcion, estado, prioridad}, {new: true});
      
    },

    async deleteTarea({id}){
      await Tarea.findByIdAndDelete(id)
      .then( () =>
        console.log("Deleted Object: " + id)
      )
      .catch( (err) =>
        console.log(err)
      )
    },
    async deleteTareasByPanel({id}){
      const query = {"tareas": {"$idPanel": id}}
      await Tarea.deleteMany(query)
      .then((res) => {
        console.log("delete multiple tasks")
      })
      .catch((err) =>{
        console.log(err)
      })
    }
},

 Subscription: {
    createTask:
    {
        resolve: (payload) =>  payload.tarea,
        subscribe: () =>{
        const asyncIterator =  pubsub.asyncIterator([create_task]);
        return asyncIterator;
        }
    },
},
 
}


exports.resolversTareas= resolversTareas;
