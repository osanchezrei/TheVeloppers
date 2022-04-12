const Panel= require('../models/Panel.js');
const { graphql, parseConstValue} = require('graphql');

const resolvers = {
  Query:{

    async getPanelByid(_, { id }){
      const panel= await Panel.findOne({"_id": id });
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
    async deletePanel({ id }){
      const panel= await Panel.deleteOne({"_id": id })
      .then( () =>
        console.log("Delete data")
      )
      .catch( (err) =>
        console.log(err)
      )
    },

    //updatePanel, no probado
    async updatePanel( {id, titulo, descripcion}){
      const panel = await Panel.findOne({"_id" : id });
      panel.titulo = { titulo };
      panel.descripcion = { descripcion };
      return updatedPanel = await panel.save();
    }
  }

}

exports.resolvers= resolvers;
