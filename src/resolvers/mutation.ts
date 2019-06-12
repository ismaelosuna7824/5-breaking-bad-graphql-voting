import { Datetime } from './../libs/datetime';
import { IResolvers } from 'graphql-tools';
import { votes, NEW_VOTE } from './resolversMap';

const mutation : IResolvers = {
    Mutation: {
        addVote(_:void, { character}, {pubsub}) {
            const vote = {
                id: String(votes.length + 1),
                character,
                createdAt: (new Datetime().getCurrentDateTime())
            };
            votes.push(vote);
            pubsub.publish(NEW_VOTE, { newVote: vote });
            return votes;
        }
    }
}

export default mutation;