import { IResolvers } from 'graphql-tools';
import { NEW_VOTE } from '../config/constants';

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