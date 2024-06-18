import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
//import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser'
import { Sequelize } from 'sequelize'

//Environment variables .env
dotenv.config();

//MongoDb connection
mongoose.connect(process.env.MONGO,)
    .then(
        () => {console.log('MongoDB is connected')}
        
    ).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    })

//Sequelize setup for postgreSQL
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
})

//Testing the connection
sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL database connected');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err)
    });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
//app.use('/api/post', postRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

export default sequelize;