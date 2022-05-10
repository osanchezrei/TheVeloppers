const Panel = require('../models/Panel.js');
const mongoose = require('mongoose');
const { graphql, parseConstValue } = require('graphql');
const tareasController = require('../controllers/TareasController.js')

const resolvers = {
  Query: {
    async getPanelByid(_, id) {
      return await Panel.findOne({ id });
  },

    async getAllPanels() {
      const panels = await Panel.find({});
      return panels;
    }
  },
  Mutation: {
    async createPanel({ titulo, descripcion }) {
      const newPanel = new Panel({ titulo, descripcion });
      return createdPanel = await newPanel.save();
    },
    //deletePanel
    async deletePanel(panel) {
      if (mongoose.isValidObjectId(panel.id)) {
        var _id = new mongoose.mongo.ObjectId(panel.id)
        await Panel.findOneAndRemove(_id)
          .then(() =>
            tareasController.resolversTareas.Mutation.deleteTareasByPanel(_id)
          )
          .catch((err) =>
            console.log(err)
          )
      }
    },

    //updatePanel
    async updatePanel({ id, titulo, descripcion }) {
      const panel = await Panel.findOneAndUpdate({ id }, { titulo, descripcion }, { new: true })
        .then(() =>
          console.log("Panel Updated")
        )
        .catch((err) =>
          console.log(err)
        )
      return panel
    }

  }

}

exports.resolvers = resolvers;
