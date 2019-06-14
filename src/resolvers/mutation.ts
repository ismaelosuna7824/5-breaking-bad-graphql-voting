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

            db.collection(COLLECTIONS.VOTES)
                .insertOne(vote)
                .then((result: any) => {
                    vote.id = result.insertedId;
                })
                .catch((err: any) => {
                    // handle error
                    console.log(err);
            });
            // votes.push(vote);
            /**
             * Send all characters data and notify!
             */
            pubsub.publish(NEW_VOTE, { newVote: db.collection(COLLECTIONS.CHARACTERS).find().toArray() });
            return db.collection(COLLECTIONS.VOTES).find().toArray();
        }
    }
}

export default mutation;