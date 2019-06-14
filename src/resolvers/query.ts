import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const query : IResolvers = {
    Query: {
        characters(_: void, __: any, { db }): any{
            return db.collection(COLLECTIONS.CHARACTERS).find().toArray();
        },
        character(_: void, { id }, { db }): any {
            const c = db.collection(COLLECTIONS.CHARACTERS).findOne({id: id});
            return (c !== undefined )? c: {id, name: `Not found ${id} contain character`, actor: '', total_episodes: -1};
        }
    }
}

export default query;