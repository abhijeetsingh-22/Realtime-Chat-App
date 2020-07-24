const { PubSub } = require('graphql-subscriptions')
const gql = require('graphql-tag')
const { makeExecutableSchema } = require('graphql-tools')

const pubsub = new PubSub()

const typeDefs = gql`
    type Query{
        messages:[message]
    }

    
    type message{
        id:String
        username:String
        body:String
    }
    type Subscription{
        newMessage: message
    }
`

const resolvers = {
    Subscription: {
        newMessage: {
            subscribe: () => pubsub.asyncIterator('newMessage')
        }

    }
}


exports.pubsub = pubsub;
exports.schema = makeExecutableSchema({ typeDefs, resolvers })