const Panel= require('../models/Panel.js');
const mongoose= require('mongoose');
const { graphql, parseConstValue} = require('graphql');

const resolvers = {
  Query:{

    async getPanelByid(_, { id }){
      const panel= await Panel.findOne({id});
      return panel;
    },

    async getAllPanels(){
      const panels= await Panel.find({});
      return panels;
    }
  },
  Mutation: {
    async createPanel({ titulo, descripcion }) {
      const newPanel= new Panel({ titulo, descripcion });
      return createdPanel= await newPanel.save()
    },
    //deletePanel
    async deletePanel(_, { id }){
      await Panel.deleteOne({_id: id})
    },

    //updatePanel
    async updatePanel (_, {id, titulo, descripcion}){
      const panel = await Panel.findOne({id})
      panel.titulo = titulo
      panel.descripcion = descripcion
      return updatedPanel = await panel.save()
    }
  }

}

exports.resolvers= resolvers;

/*
//introducidas en las definicioes de graphql, busca un panel por su id
const getPanelByid= (query) => {
  return Panel.findOne({idPanel: query.id}, function(err, response){
    if(err) return err
    return response;
  })
}
//introducida en schemas, devuelve todos los paneles
const getAllPanels= (query) => {
  console.log("launch getAllPanels");
  return Panel.find({}, function(err, response){
    if(err) return err
    return response;
  })
}

//crea un nuevo panel,
const createPanel= async (query) => {
  console.log("lanzada");
  const newPanel= new Panel({titulo: query.titulo, descripcion: query.descripcion});
  const createdPanel = await newPanel.save()
}

//crea un nuevo panel,
/*async function createPanel(query){
  console.log("lanzada");
  const newPanel= new Panel({titulo: query.titulo, descripcion: query.descripcion});
  const createdPanel = await newPanel.save()
}*/

/*const resolversPanel = {
  Mutation: {
    async createPanel(_, {titulo, descripcion}){
      const newPanel= new Panel({titulo, descripcion});
      const createdPanel =  await newPanel.save();
    }
  }
}*/
