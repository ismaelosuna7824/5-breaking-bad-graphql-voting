import { IResolvers } from "graphql-tools";
import { getCharacters, getCharacter, getCharacterByName } from "../lib/database-operations";

const query: IResolvers = {
    Query: {
        async characters(_: void, __: any, { db }) {
            return await getCharacters(db);
        },
        async character(_: void,{ id }, { db }) {
            return await getCharacter(db, id);
        },
        async findCharactersByNameSearch(_: void, { text }, { db }) {
            return await getCharacterByName(db, text);
        }
    }
}

export default query;