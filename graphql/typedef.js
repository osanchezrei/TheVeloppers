const { graphqlHTTP }= require('express-graphql'); //grphql express
const { graphql, buildSchema } = require('graphql'); //requerimos graphql
const Tarea= (require('../models/Tareas'))
const Panel= (require('../models/Panel'))
const { resolvers }= (require('../controllers/PanelController'))


const root = {
  getPanelByid: resolvers.Query.getPanelByid,
  getAllPanels: resolvers.Query.getAllPanels,
  createPanel: resolvers.Mutation.createPanel
};

//esquemas graphql
const schema = buildSchema(`
  type Tarea {
    id: ID!
    idPanel: Int
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
    getPanelByid(id: Int!): Panel
    getAllPanels:[ Panel ]
  }
  type Mutation{
    createPanel(titulo: String!, descripcion: String!): Panel
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
