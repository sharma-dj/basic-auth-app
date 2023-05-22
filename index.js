import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()

import dotenv from 'dotenv'
// required for using process.env
dotenv.config()

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

import morgan from 'morgan'
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open',() => {
	console.log('Connection established successfully');
});

app.get('/', (req,res) => {
	res.send('Home');
})

import routes from './routes/authRoutes.js'
app.use('/api/v1/auth',routes)

app.listen(port,() => {
	console.log(`Server is running at port ${port}....`);
});