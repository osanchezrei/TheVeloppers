const Panel= require('../models/Panel.js');
const { graphql, parseConstValue} = require('graphql');


const resolvers = {
  Query:{
    async getPanelByid(_, { id }){
      const panel= await Panel.findOne({ id });
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
      const panel= await Panel.deleteOne({ id })
      .then( () =>
        console.log("Delete data")
      )
      .catch( (err) =>
        console.log(err)
      )
    },

    //updatePanel
    async updatePanel( {id, titulo, descripcion}){
      const panel = await Panel.findOneAndUpdate({id}, {titulo, descripcion}, {new: true})
      .then( () =>
        console.log("Panel Updated")
      )
      .catch( (err) =>
        console.log(err)
      )
      return panel
    }

  }

}

exports.resolvers= resolvers;
