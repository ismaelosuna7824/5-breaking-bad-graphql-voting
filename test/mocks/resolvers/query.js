const _ = require('lodash');
const DATA = require('./../data');
const CHARACTERS = DATA.CHARACTERS;
const characters = () => {
    CHARACTERS.map((c, index) => {
        c.votes = DATA.CHARACTER_VOTES(c.id);
        CHARACTERS[index] = c;
    });
    return CHARACTERS;
}
const character = (__, { id }) => {
    return _.find(CHARACTERS, function(o) { return o.id == id; });
}

const resolverQueries = {
    Query: {
        characters,
        character
    }
}

module.exports = {
    resolverQueries
}