import expressPlayground from 'graphql-playground-middleware-express';
import { PubSub, ApolloServer} from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import express from 'express';
import schema from './schema';

const app = express();
const pubsub = new PubSub();
app.use('*', cors());
app.use(compression());

// Inicializamos el servidor de Apollo
const server = new ApolloServer({
    schema,
    context: { pubsub },
    introspection: true // Necesario
});
server.applyMiddleware({ app });

app.get('/', (_, res) => {
    res.send('Welcome to Breaking Bad vote system in GraphQL');
});

app.get('/playground', expressPlayground({
    endpoint: '/graphql'
}));
const PORT = process.env.PORT || 5005;
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: PORT }, () : void => {
    console.log('========================SERVER==================================');
    console.log(`🚀 🚀  GraphQL Server running @ http://localhost:${PORT}${server.graphqlPath} 🚀 🚀 `);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
    console.log('================================================================');
});