import { IResolvers } from 'graphql-tools';
import lodash from 'lodash';
import { votes } from './resolversMap';
/**
 * Take select character votes count
 * @param id Select Character ID value
 */
function getCharacterVotes(id: number | string) {
    return lodash.filter(votes, ['character', +id]).length;
}

const type: IResolvers = {
    Character: {
        votes: parent => getCharacterVotes(parent.id)
    }
}

export default type;