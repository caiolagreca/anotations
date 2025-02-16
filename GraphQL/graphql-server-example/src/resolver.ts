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
	Author: {
		reviews(parent) {
			return db.reviews.filter((r) => r.author_id === parent.id);
		},
	},
	Mutation: {
		deleteGame(_, args) {
			return db.games.filter((d) => d.id !== args.id);
		},
		addGame(_, args) {
			let game = {
				...args.game,
				id: Math.floor(Math.random() * 1000).toString(),
			};
			db.games.push(game);
			return game;
		},
		updateGame(_, args) {
			db.games = db.games.map((item) => {
				if (item.id === args.id) {
					return { ...item, ...args.edits };
				}
				return item;
			});
			return db.games.find((item) => item.id === args.id);
		},
	},
};

/* resolverFunction(parent, args, context, info) { ... }
parent (or root) - The result return from the resolver on the parent field. It's usually not need (so denoted by an underscore "_");
args - Object that contains all the arguments passed to the field in the GraphQL query;
context - Used to pass shared data (like authentication, DB connectors, etc) to all resolvers;
info - Contains information about the execution state of the query, such as the field name, path to the field form the root, etc. It's advanced and usually not needed;

*/
