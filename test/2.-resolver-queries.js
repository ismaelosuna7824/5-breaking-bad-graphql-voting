'use strict';
const QUERIES = require('./mocks/data').QUERIES;
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
			const query = QUERIES.GETCHARACTER;
            const walter = await tester.graphql(query, undefined, undefined, {id: '1'});
            const walterTest = walter.data.character;
            expect(walterTest.name).to.be.equal('Walter White');
            expect(typeof(walterTest.description)).to.be.equal('string');
            expect(typeof(walterTest.votes)).to.be.equal('number');
        });
        it('Obtener información del personaje Jesse Pinkman y comprobar', async () => {
			const query = QUERIES.GETCHARACTER;
            const jesse = await tester.graphql(query, undefined, undefined, {id: '2'});
            const jesseTest = jesse.data.character;
            expect(jesseTest.name).to.be.equal('Jesse Pinkman');
            expect(typeof(jesseTest.description)).to.be.equal('string');
            expect(typeof(jesseTest.votes)).to.be.equal('number');
        });
        it('Obtener información del personaje Skyler y comprobar', async () => {
            const query = QUERIES.GETCHARACTER;
            const skyler = await tester.graphql(query, undefined, undefined, {id: '3'});
            const skylerTest = skyler.data.character;
            expect(skylerTest.name).to.be.equal('Skyler White');
            expect(typeof(skylerTest.description)).to.be.equal('string');
            expect(typeof(skylerTest.votes)).to.be.equal('number');
        });
        it('Obtener información del personaje Hank y comprobar', async () => {
			const query = QUERIES.GETCHARACTER;
            const hank = await tester.graphql(query, undefined, undefined, {id: '4'});
            const hankTest = hank.data.character;
            expect(hankTest.name).to.be.equal('Hank Schrader');
            expect(typeof(hankTest.description)).to.be.equal('string');
            expect(typeof(hankTest.votes)).to.be.equal('number');
		});
	});
});
