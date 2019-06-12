import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
import subscription from './subscription';

const resolverMaps : IResolvers = {
    ...query,
    ...mutation,
    ...subscription
}

export default resolverMaps;