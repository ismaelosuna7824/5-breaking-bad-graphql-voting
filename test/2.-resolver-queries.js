'use strict';
const QUERIES = require('./mocks/operations/query');
const EasyGraphQLTester = require('easygraphql-tester');
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const apiSchema = mergeTypes(fileLoader(path.join(__dirname, './../src/schema/**/*.graphql')), { all: true });
const resolvers = require('./mocks/resolvers/query').resolverQueries;
const expect = require('chai').expect;

// Comprobar que los datos de la query coinciden y son en el formato que deseamos
const characterCheckData = async (tester, query, id, expectName) => {
    const result = await tester.graphql(query, undefined, undefined, { id });
    const resultTest = result.data.character;
    expect(resultTest.name).to.be.equal(expectName);
    expect(typeof(resultTest.description)).to.be.equal('string');
    expect(typeof(resultTest.votes)).to.be.equal('number');
};
describe('Test Schema GraphQL', () => {
	let tester;
	before(function() {
		tester = new EasyGraphQLTester(apiSchema, resolvers);
	});
	describe('Testing Resolvers - Type Root - Query', () => {
		it('Obtener la lista de los personajes y comprobar', async () => {
			const query = QUERIES.GETCHARACTERS;
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
        it('Obtener información del personaje Walter White y comprobar', async () => {
            await characterCheckData(tester, QUERIES.GETCHARACTER, '1', 'Walter White');
        });
        it('Obtener información del personaje Jesse Pinkman y comprobar', async () => {
			await characterCheckData(tester, QUERIES.GETCHARACTER, '2', 'Jesse Pinkman');
        });
        it('Obtener información del personaje Skyler y comprobar', async () => {
            await characterCheckData(tester, QUERIES.GETCHARACTER, '3', 'Skyler White');
        });
        it('Obtener información del personaje Hank y comprobar', async () => {
            await characterCheckData(tester, QUERIES.GETCHARACTER, '4', 'Hank Schrader');
		});
	});
});
