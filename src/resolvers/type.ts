import { IResolvers } from 'graphql-tools';
/**
 * Take select character votes count
 * @param id Select Character ID value
 */
async function getCharacterVotes(db: any, id: number | string) {
    // TODO return select character votes total
    return db.collection('votes').find({ character: id }).count();
}

function getPhoto(photo: string) {
    return (photo !== undefined) ? 'https://vignette.wikia.nocookie.net/breakingbad/images'.concat(photo) : undefined;
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