- GraphQL = Query Language;

- Alternative to using REST API, because REST overfetch the data (gets back much more data than we need) or underfecth it;

- GraphQL has a single endpoint;
- It uses basically POST method for all requests;

- Instead of using GET method we use the QUERY keyword to fetch data:

```js
query ReviewsQuery{
  reviews{
    rating,
    id,
    author {
      name,
      id,
      reviews {
        rating,
        id,
        game {
          title
        }
      }
    },
    game {
      title,
      platform
    }
  }
}
```

- For DELETE, PUT, POST methods, we use the MUTATION keyword:

```js
mutation updateMutation($id: ID!, $edits: EditGameInput){
  updateGame(id: $id, edits: $edits){
    id,
    title,
    platform
  }
}
```

- We need to define a schema to define the structure of data tha clients can query:

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs"), that together define the "shape" of queries that are executed against your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
// Clients will be able to execute a query named books, and our server will return an array of zero or more Book
```

- Defining a data set as an example:

```js
const books = [
	{
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		title: "City of Glass",
		author: "Paul Auster",
	},
];
```

- Now we need to define a resolver:

```js
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		books: () => books,
	},
};
```

- QUERY VARIABLES:
  It allows you to pass dynamic values into our quereies or mutations.
  Benefits: Reusability, security (prevent injection attack), Caching...
  Basic structure:
  - The operation definition - Here you declare the variables and types.
  - The query/mutation body - Instead of hardcoding values, you reference the declared varaibles.

Example:

```js
//fetching a user by ID:
query GetUser($userId: !ID){
  user(id: $userId){
    id
    name
    email
  }
}
//GetUser = name of the query (optional but useful for debbugind and caching)
//(#userId: !ID) = this declares a variable named $userId of type ID
//user(id: $userId) = the id field is now using the variable $userId
```

- Pratical example:

```js
//Passing the variables to the Query:
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
	query GetUser($userId: ID!) {
		user(id: $userId) {
			id
			name
			email
		}
	}
`;

// In a React component:
function UserComponent({ userId }) {
	const { loading, error, data } = useQuery(GET_USER, {
		variables: { userId }, //passing the variable here
	});

	if (loading) return <p>Loading</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h2>{data.user.name}</h2>
			<p>{data.user.email}</p>
		</div>
	);
}
//the variable userId is passed in from the component props and then provided as the variables object in the useQuery hook.
```
