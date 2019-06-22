import expressPlayground from 'graphql-playground-middleware-express';
import { PubSub, ApolloServer} from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import express from 'express';
import schema from './schema';
import  MongoClient  from 'mongodb' ;
import environments from './config/environments';

if (process.env.NODE_ENV !== 'production') {
    const envs = environments;
    console.log(envs);
}

async function start() {
    const app = express();
    const pubsub = new PubSub();
    app.use('*', cors());
    app.use(compression());

    // Configuración de la base de datos NoSQL
    const MONGO_DB = String(process.env.DATABASE) || 'mongodb://localhost:27017/breaking-bad-voting-characters';
    const LOG_COLOR = "\x1b[36m%s\x1b[0m";
    const client = await MongoClient.connect( MONGO_DB, { useNewUrlParser: true } );
    const db = client.db();
    // https://ramlez.com/blog/monitoring-mongodb-connection-status/
    if(client.isConnected()) {
        console.log('==========================DATABASE=============================');
        console.log(`STATUS: ${LOG_COLOR}`, 'ONLINE');
        console.log(`NAME: ${LOG_COLOR}`, db.databaseName);
    }

    // Inicializamos el servidor de Apollo
    const server = new ApolloServer({
        schema,
        context: { db, pubsub },
        introspection: true // Necesario
    });
    server.applyMiddleware({ app });

    app.get('/welcome', (_, res) => {
        res.send('Welcome to Breaking Bad vote system in GraphQL');
    });

    app.get('/', expressPlayground({
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
}
start();