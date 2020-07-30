const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');
const {PubSub} = require('graphql-subscriptions');
const fetch = require('cross-fetch');
const pubsub = new PubSub();
const messageType = new GraphQLObjectType({
  name: 'message',
  fields: {
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    messages: {
      type: GraphQLList(messageType),
      async resolve(parentValue, args) {
        const response = await fetch('http://localhost:3003/messages');
        const data = await response.json();
        return data;
      },
    },
  },
});

const addMessage = {
  type: messageType,
  args: {
    username: {type: GraphQLString},
    body: {type: GraphQLString},
  },
  resolve: async function (parentValue, args) {
    const response = await fetch('http://localhost:3003/messages', {
      method: 'POST',
      body: JSON.stringify(args),
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    console.log(data);
    pubsub.publish('newMessage', {newMessage: data});
    return data;
  },
};

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMessage: addMessage,
  },
});

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    newMessage: {
      type: messageType,

      subscribe: () => pubsub.asyncIterator('newMessage'),
    },
  }),
});
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});

module.exports = schema;
