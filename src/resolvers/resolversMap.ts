import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
import subscription from './subscription';
import type from './type';

export const characters = [
    {
        id: '1',
        name: 'Walter White',
        actor: 'Bryan Cranston',
        total_episodes: 62
    },
    {
        id: '2',
        name: 'Jesse Pinkman',
        actor: 'Aaron Paul',
        total_episodes: 62
    }
];
export const votes: any = [];

export const NEW_VOTE = 'NEW_VOTE';

const resolverMaps : IResolvers = {
    ...query,
    ...mutation,
    ...subscription,
    ...type
}

export default resolverMaps;