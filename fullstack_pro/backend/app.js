import express from 'express'
import cors from 'cors';
const app = express()

app.use(cors());
app.use(express.json());

import jobRouter from './src/router/job.router.js'
import studentRouter from './src/router/student.router.js'
import teacherRouter from './src/router/teacher.router.js'

app.use('/api/student',studentRouter)
app.use('/api/job',jobRouter);
app.use('api/student',studentRouter)
app.use('/api/teacher',teacherRouter);

export default app;
