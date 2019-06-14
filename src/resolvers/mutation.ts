import { Datetime } from './../libs/datetime';
import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, NEW_VOTE } from '../config/constants';
const mutation : IResolvers = {
    Mutation: {
        async addVote(_:void, { character}, {db, pubsub}) {
            const vote = {
                id: String(await db.collection(COLLECTIONS.VOTES).countDocuments() + 1),
                character,
                createdAt: (new Datetime().getCurrentDateTime())
            };

            await db.collection(COLLECTIONS.VOTES)
                .insertOne(vote)
                .then((result: any) => {
                    
                })
                .catch((err: any) => {
                    // handle error
                    console.log(err);
            });
            // votes.push(vote);
            /**
             * Send all characters data and notify!
             */
            pubsub.publish(NEW_VOTE, { newVote: await db.collection(COLLECTIONS.CHARACTERS).find().toArray() });
            return vote;
        }
    }
}

export default mutation;