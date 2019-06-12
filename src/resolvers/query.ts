import { IResolvers } from 'graphql-tools';
import lodash from 'lodash';
const characters = [
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
];
const query : IResolvers = {
    Query: {
        getCharacters(_: void, __: any): any{
            return characters;
        },
        getCharacter(_: void, { id }): any {
            console.log(id);
            return lodash.filter(characters, ['id', +id])[0];
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