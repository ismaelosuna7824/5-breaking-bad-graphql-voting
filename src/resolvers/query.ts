import { characters } from './resolversMap';
import { IResolvers } from 'graphql-tools';
import lodash from 'lodash';

const query : IResolvers = {
    Query: {
        getCharacters(_: void, __: any): any{
            return characters;
        },
        getCharacter(_: void, { id }): any {
            const character = lodash.filter(characters, ['id', id])[0];
            return (character !== undefined )? character: {id, name: `Not found ${id} contain character`, actor: '', total_episodes: -1};
        }
    }
}

export default query;