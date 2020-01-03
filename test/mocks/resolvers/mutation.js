const DATA = require('./../data');

const addVote = (__, {character}) => {
    DATA.FIND_CHARACTER(character).votes = DATA.CHARACTER_VOTES(character) + 1
    return DATA.CHARACTERS;
}

const updateVote = () => {

}

const deleteVote = () => {
    
}



const resolverMutations = {
    Mutation: {
        addVote,
        updateVote,
        deleteVote
    }
}

module.exports = {
    resolverMutations
}