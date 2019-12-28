const _ = require('lodash/array');
const CHARACTERS = require('./../data').CHARACTERS;

const characters = () => {
    return CHARACTERS;
}
const character = (__, { id }) => {
    return _.findIndex(CHARACTERS, function(o) { return o.id == id; });
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