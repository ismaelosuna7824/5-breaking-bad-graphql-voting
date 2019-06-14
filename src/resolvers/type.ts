import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, PHOTO_URL_PRINCIPAL } from '../config/constants';
/**
 * Take select character votes count
 * @param id Select Character ID value
 */
async function getCharacterVotes(db: any, id: number | string) {
    // TODO return select character votes total
    return db.collection(COLLECTIONS.VOTES).find({ character: id }).count();
}

function getPhoto(photo: string) {
    return (photo !== undefined) ? PHOTO_URL_PRINCIPAL.concat(photo) : undefined;
}

const type: IResolvers = {
    Character: {
        votes: async (parent, _, { db }) => {
            return getCharacterVotes(db, parent.id)
        },
        photo: parent => getPhoto(parent.photo)
    }
}

export default type;