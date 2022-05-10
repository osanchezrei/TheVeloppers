const { PubSub } = require('graphql-subscriptions');  //importamos PubSub de apollo server

const pubsub= new PubSub(); //instanciamos un objeto PubSub y lo hacemos exportable

module.exports= pubsub;
