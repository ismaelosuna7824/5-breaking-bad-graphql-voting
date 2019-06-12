import { database } from './../data/data.store';
import { IResolvers } from 'graphql-tools';
import lodash from 'lodash';

const query : IResolvers = {
    Query: {
        characters(_: void, __: any): any{
            return database.characters;
        },
        character(_: void, { id }): any {
            const character = lodash.filter(database.characters, ['id', id])[0];
            return (character !== undefined )? character: {id, name: `Not found ${id} contain character`, actor: '', total_episodes: -1};
        }
    }
}

export default query;