import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

// parsers
app.use(express.json());
app.use(cors());

//! application routes
app.use('/api/v1/students', StudentRoutes);

export default app;
