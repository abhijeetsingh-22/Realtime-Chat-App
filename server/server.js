const express = require('express')
const cors = require('cors')
const schema = require('./schema')
const { graphqlHTTP } = require('express-graphql')
const { schema: subscriptionSchema } = require('./subscription')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')
const app = express()
const PORT = 3001
const WS_PORT = 3002
app.use(cors())

const ws = createServer((req, res) => {
    res.writeHead(400)
    res.end()
})

ws.listen(WS_PORT, () => console.log('websocket listening on port ', WS_PORT))

const subscriptionServer = SubscriptionServer.create({
    schema: subscriptionSchema,
    execute,
    subscribe,
    onConnect: () => console.log('client connected')

}, { server: ws, path: '/graphql' })


app.use('/graphql', graphqlHTTP(req => {
    return { schema, graphiql: true }
}))
app.listen(PORT, () => console.log('http server listening on ', PORT))
