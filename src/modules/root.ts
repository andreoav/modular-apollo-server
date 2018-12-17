import { GraphQLModule } from '@graphql-modules/core';

import { AuthorsModule } from './authors';
import { BooksModule } from './books';

export const RootModule = new GraphQLModule({
  imports: () => [AuthorsModule, BooksModule]
});
