'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const apiSchema = mergeTypes(fileLoader(path.join(__dirname, './../src/schema/**/*.graphql')), { all: true });

// const tester =
describe('Test Schema GraphQL', () => {
	let tester;
	before(function() {
		tester = new EasyGraphQLTester(apiSchema);
	});
	describe('Type Root: Query', () => {
		it("Llamada 'characters' válida", () => {
			const query = `
                {
                    characters {
                        id
                        name
                    }
                }
            `;
            tester.test(true, query, {});
            const query2 = `
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
			tester.test(true, query2, {});
		});
		it("Llamada 'characters' inválida", () => {
			const query = `
                {
                    characters
                }
            `;
            tester.test(false, query, {});
            const query2 = `
                {
                    characters {
                        id
                        actor {
                            name
                        }
                        description
                        votes_count
                        photo
                        total_episodes
                        url
                    }
                }
            `;
			tester.test(false, query2, {});
        });
        it("Llamada 'character' válida", () => {
			const query = `
                query selectCharacter($id: ID!){
                    character(id: $id) {
                        id
                        name
                        total_episodes
                    }
                }
            `;
            tester.test(true, query, {id: "1"});
		});
		it("Llamada 'character' inválida", () => {
			const query = `
                {
                    characters
                }
            `;
            tester.test(false, query, {id: "1"});
		});
	});
	describe('Type Root: Mutation', () => {

		it("Llamada 'addVote' válida", () => {
			const query = `
                mutation votar($character: ID!) {
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
			tester.test(true, query, {character: "1"});
        });
        it("Llamada 'addVote' inválida", () => {
			const query = `
                query votar($id: ID!) {
					addVote(id: $id) {
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
			tester.test(false, query, {character: "1"});
        });
        it("Llamada 'updateVote' válida", () => {
			const query = `
                mutation votar($id: ID!, $character: ID!) {
					updateVote(id: $id, character: $character) {
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
			tester.test(true, query, {id: "1", character: "2"});
        });
        it("Llamada 'updateVote' inválida", () => {
			const query = `
                query actualizar($id: ID!) {
					addVote(id: $id) {
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
			tester.test(false, query, {character: "1"});
        });
        it("Llamada 'removeVote' válida", () => {
			const query = `
                mutation quitar($id: ID!) {
					deleteVote(id: $id) {
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
			tester.test(true, query, {id: "1"});
        });
        it("Llamada 'deleteVote' inválida", () => {
			const query = `
                query votar($id: ID!) {
					deleteVote(id: $id) {
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
			tester.test(false, query, {id: "1"});
		});
		
	});
});
