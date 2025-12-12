import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';   
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import './config/init.js';


import userRoutes from './routes/userRoutes.js';

const { Pool } = pg; 


dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);  

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});