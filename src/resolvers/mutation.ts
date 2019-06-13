import { Datetime } from './../libs/datetime';
import { IResolvers } from 'graphql-tools';
import { votes, NEW_VOTE } from './resolversMap';
import {database} from './../data/data.store';
const mutation : IResolvers = {
    Mutation: {
        async addVote(_:void, { character}, {db, pubsub}) {
            const vote = {
                id: String(await db.collection('votes').count() + 1),
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
             * Send all characters data
             */
            pubsub.publish(NEW_VOTE, { newVote: db.collection('characters').find().toArray() });
            return db.collection('votes').find().toArray();
        }
    }
}

export default mutation;