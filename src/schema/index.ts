import { GraphQLSchema } from "graphql";
import 'graphql-import-node';
import resolvers from './../resolvers/resolversMap';
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
const typeDefs = mergeTypes(fileLoader(`${__dirname}/**/*.graphql`), { all: true });// Y quitamos

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;