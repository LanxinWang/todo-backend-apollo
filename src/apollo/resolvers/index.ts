import { Resolvers } from '../../__generated__/resolvers-types';
import queries from './queries.js';
import mutations from './mutations.js';

const resolvers: Resolvers = { ...queries,...mutations};
export default resolvers