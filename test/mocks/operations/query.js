const GETCHARACTERS = `
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

const GETCHARACTER = `
query selectCharacter($id: ID!) {
    character(id: $id) {
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
const QUERIES = {
    GETCHARACTER,
    GETCHARACTERS
};

module.exports = QUERIES;