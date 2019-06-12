import { IResolvers } from 'graphql-tools';
import lodash from 'lodash';
import { votes } from './resolversMap';
/**
 * Take select character votes count
 * @param id Select Character ID value
 */
function getCharacterVotes(id: number | string) {
    return lodash.filter(votes, ['character', id]).length;
}

function getPhoto(photo: string) {
    return (photo !== undefined) ? 'https://vignette.wikia.nocookie.net/breakingbad/images'.concat(photo) : undefined;
}

const type: IResolvers = {
    Character: {
        votes: parent => getCharacterVotes(parent.id),
        photo: parent => getPhoto(parent.photo)
    }
}

export default type;