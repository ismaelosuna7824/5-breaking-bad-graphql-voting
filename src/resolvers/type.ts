import { IResolvers } from 'graphql-tools';


const type: IResolvers = {
    Character: {
        votes: parent => (parent.votes === undefined) ? 0: parent.votes
    }
}

export default type;