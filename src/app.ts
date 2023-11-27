import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalError from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

// parsers
app.use(express.json());
app.use(cors());

//! application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

//! error handler
app.use(globalError);

//not found
app.use(notFound);

export default app;
