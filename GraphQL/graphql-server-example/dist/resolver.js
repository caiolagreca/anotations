import db from "./_db.js";
export const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        reviews() {
            return db.reviews;
        },
        authors() {
            return db.authors;
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id);
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id);
        },
    },
};
/* resolverFunction(parent, args, context, info) { ... }
parent (or root) - The result return from the resolver on the parent field. It's usually not need (so denoted by an underscore "_");
args - Object that contains all the arguments passed to the field in the GraphQL query;
context - Used to pass shared data (like authentication, DB connectors, etc) to all resolvers;
info - Contains information about the exection state of the query, such as the field name, path to the field form the root, etc. It's advanced and usually not needed;

*/
