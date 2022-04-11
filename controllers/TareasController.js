const Tarea= require('../models/Tareas.js')


const getTareaByPanel= (query) => {
  return Tarea.find({idPanel: query.idPanel}, function(err, response)){
    if(err) return err
    return response;
  })
}

const getTarea= (query) => {
  return Tarea.findOne({id: query.id }), function(err, response){
    if(err) return err
    return response;
  }
}

const createTarea= (query) => {

}

const updateTarea= (query) => {

}

const deleteTarea= (query) => {

}
