import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
import subscription from './subscription';
import type from './type';

export const votes: any = [];

export const NEW_VOTE = 'NEW_VOTE';

const resolverMaps : IResolvers = {
    ...query,
    ...mutation,
    ...subscription,
    ...type
}

export default resolverMaps;