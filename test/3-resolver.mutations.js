'use strict';
const _ = require('lodash');
const CHARACTERS = require('./mocks/data').CHARACTERS;
const EasyGraphQLTester = require('easygraphql-tester');
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const apiSchema = mergeTypes(fileLoader(path.join(__dirname, './../src/schema/**/*.graphql')), { all: true });
const resolvers = require('./mocks/resolvers/mutation').resolverMutations;
const expect = require('chai').expect;
// const tester =
describe('Test Schema GraphQL', async () => {
	let tester;
	before(async() => {
		tester = new EasyGraphQLTester(apiSchema, resolvers);
	});
	describe('Testing Resolvers - Type Root - Mutation', () => {
		it('Añadir votos y comprobar los resultados', async () => {
            // Obtener votos antes de votar del personaje 1
            console.log(CHARACTERS);
            // Añadir test
            // Votar al personaje con el ID "1"
		        const query = `
            mutation add($character: ID!) {
                addVote(character: $character) {
                  status
                  message
                  characters {
                    id
                    name
                    votes
                  }
                }
              }
            `;
			      const result = await tester.graphql(query, undefined, undefined, { character: '1'});
            console.log(_.find(CHARACTERS, function(o) { return o.id == '1'; }));
		});
		
	});
});
