import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import globalError from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

// parsers
app.use(express.json());
app.use(cors());

//! application routes
app.use('/api/v1', router);
//! error handler
app.use(globalError);

//not found
app.use(notFound);

export default app;
