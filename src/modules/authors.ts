import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server';

import { authors, books } from '../seeds';
import { BooksModule } from './books';

const typeDefs = gql`
  type Author {
    id: Int
    name: String
    books: [Book]
  }

  type Query {
    authors: [Author]
    author(id: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authors: () => authors,
    author: (_, args) => authors.find(author => author.id === args.id)
  },
  Author: {
    books: author => books.filter(book => book.authorId === author.id)
  }
};

export const AuthorsModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: () => [BooksModule]
});
