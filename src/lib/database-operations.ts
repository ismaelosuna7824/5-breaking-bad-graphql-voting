import { COLLECTIONS } from "../config/constants";

// Lista de personaje

export async function getCharacters(db: any) {
    return await db.collection(COLLECTIONS.CHARACTERS).find().sort({ id : 1}).toArray();
}

// Personaje seleccionado

export async function getCharacter(db: any, id: string) {
    return await db.collection(COLLECTIONS.CHARACTERS).findOne({ id });
}

// Votos de un personaje

export async function getCharacterVotes(db: any, id: string) {
    return await db.collection(COLLECTIONS.VOTES).find({ character: id }).count();
}