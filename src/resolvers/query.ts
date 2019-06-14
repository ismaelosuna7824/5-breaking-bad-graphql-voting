import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const query : IResolvers = {
    Query: {
        async characters(_: void, __: any, { db }): Promise<any>{
            return await db.collection(COLLECTIONS.CHARACTERS).find().toArray();
        },
        async character(_: void, { id }, { db }): Promise<any> {
            const c = await db.collection(COLLECTIONS.CHARACTERS).findOne({id: id});
            console.log(c);
            return (c !== undefined && c !== null )? c: {id, name: `Not found ${id} contain character`, actor: '', total_episodes: -1};
        }
    }
}

export default query;