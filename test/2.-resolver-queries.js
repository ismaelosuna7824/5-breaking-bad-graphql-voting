'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const apiSchema = mergeTypes(fileLoader(path.join(__dirname, './../src/schema/**/*.graphql')), { all: true });
const resolvers = require('./mocks/resolvers/query').resolverQueries;
const expect = require('chai').expect;
// const tester =
describe('Test Schema GraphQL', () => {
	let tester;
	before(function() {
		tester = new EasyGraphQLTester(apiSchema, resolvers);
	});
	describe('Testing Resolvers - Type Root - Query', () => {
		it('Obtener la lista de los personajes y comprobar', async () => {
			const query = `
                {
                    characters {
                        id
                        name
                        actor
                        description
                        votes
                        photo
                        total_episodes
                        url
                    }
                }
            `;
			const result = await tester.graphql(query, undefined, undefined, {});
            result.data.characters.map( character => {
                // Comprobar que nombre es string
                expect(typeof(character.id)).to.be.equal('string');
                expect(typeof(character.name)).to.be.equal('string');
                expect(typeof(character.actor)).to.be.equal('string');
                expect(typeof(character.description)).to.be.equal('string');
                expect(typeof(character.photo)).to.be.equal('string');
                expect(typeof(character.votes)).to.be.equal('number');
                expect(typeof(character.total_episodes)).to.be.equal('number');
            });
            
		});
	});
});
