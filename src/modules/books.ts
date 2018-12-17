import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server';

import { authors, books } from '../seeds';
import { AuthorsModule } from './authors';

const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: Author
  }

  type Query {
    book: [Book]
    book(id: Int!): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => books.find(book => book.id === args.id)
  },
  Book: {
    author: book => authors.find(author => author.id === book.authorId)
  }
};

export const BooksModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: () => [AuthorsModule]
});
