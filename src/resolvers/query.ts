import { IResolvers } from 'graphql-tools';

const query : IResolvers = {
    Query: {
        getCharacters(_: void, __: any): any{
            return [
                {
                    id: 1,
                    name: 'Walter White',
                    actor: 'Bryan Cranston',
                    total_episodes: 62
                },
                {
                    id: 2,
                    name: 'Jesse Pinkman',
                    actor: 'Aaron Paul',
                    total_episodes: 62
                }
            ]
        }
    }
}

/**
 * id: ID!
    name: String!
    actor: String!
    total_episodes: Int!
    photo: String
 */

export default query;