import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import { ApolloServer } from 'apollo-server-express';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.middleware.js';
import apiLimiter from './middlewares/rate-limit.middleware.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./docs/openapi.json');
import { typeDefs } from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import authMiddleware from './middlewares/graphql-auth.middleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(apiLimiter);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => authMiddleware(req),
});
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
