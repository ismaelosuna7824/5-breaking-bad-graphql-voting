import { Datetime } from './../libs/datetime';
import { IResolvers } from 'graphql-tools';
import { NEW_VOTE } from './resolversMap';
const mutation : IResolvers = {
    Mutation: {
        async addVote(_:void, { character}, {db, pubsub}) {
            const vote = {
                id: String(await db.collection('votes').countDocuments() + 1),
                character,
                createdAt: (new Datetime().getCurrentDateTime())
            };

            db.collection('votes')
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
            pubsub.publish(NEW_VOTE, { newVote: db.collection('characters').find().toArray() });
            return db.collection('votes').find().toArray();
        }
    }
}

export default mutation;