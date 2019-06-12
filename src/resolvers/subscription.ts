import { NEW_VOTE } from './resolversMap';
import { IResolvers } from 'graphql-tools';

const subscription : IResolvers = {
    Subscription: {
        newVote: {
            subscribe: (_, __, { pubsub }) => {
              return pubsub.asyncIterator(NEW_VOTE)
            }
        }
    }
}

export default subscription;