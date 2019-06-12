import { Datetime } from './../libs/datetime';
import { IResolvers } from 'graphql-tools';
import { votes, NEW_VOTE } from './resolversMap';
import {database} from './../data/data.store';
const mutation : IResolvers = {
    Mutation: {
        addVote(_:void, { character}, {pubsub}) {
            const vote = {
                id: String(votes.length + 1),
                character,
                createdAt: (new Datetime().getCurrentDateTime())
            };
            votes.push(vote);
            /**
             * Send all characters data
             */
            pubsub.publish(NEW_VOTE, { newVote: database.characters });
            return votes;
        }
    }
}

export default mutation;