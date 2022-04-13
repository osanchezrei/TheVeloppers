const { graphqlHTTP }= require('express-graphql'); //grphql express
const { graphql, buildSchema } = require('graphql'); //requerimos graphql
const Tarea= (require('../models/Tareas'));
const Panel= (require('../models/Panel'));
const { resolvers }= (require('../controllers/PanelController'));
const { resolversTareas }= (require('../controllers/TareasController'));


const root = {
  getPanelByid: resolvers.Query.getPanelByid,
  getAllPanels: resolvers.Query.getAllPanels,
  createPanel: resolvers.Mutation.createPanel,
  deletePanel: resolvers.Mutation.deletePanel,
  updatePanel: resolvers.Mutation.updatePanel,
  getAllTareas: resolversTareas.Query.getAllTareas,
  getTareasByPanel: resolversTareas.Query.getTareasByPanel,
  getTareaById: resolversTareas.Query.getTareaById,
  createTarea: resolversTareas.Mutation.createTarea,
  updateTarea: resolversTareas.Mutation.updateTarea,
  deleteTarea: resolversTareas.Mutation.deleteTarea,
};

//esquemas graphql
const schema = buildSchema(`
  type Tarea {
    id: ID!
    idPanel: String
    titulo: String
    descripcion: String
    estado: String
    prioridad: String
  }
  type Panel{
    id: ID!
    titulo: String!
    descripcion: String!
  }
  type Query{
    getPanelByid(id: ID!): Panel
    getAllPanels:[ Panel ]
  }
  type Mutation{
    createPanel(titulo: String!, descripcion: String!): Panel
    updatePanel(id: ID!, titulo: String, descripcion: String): Panel
    deletePanel(id: ID!, titulo: String, descriptcion: String): Panel
  }
`);


exports.schema= schema;
exports.root= root;


/*
type Query {
  getPanelByid(id: Int!): Panel
  getTareaByPanel(id: Int!): tareasS0chema
}

*/

/*var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  panel: getPanelByPanel;
};*/
