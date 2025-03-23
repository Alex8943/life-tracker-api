import express from 'express';
import userservice from './routes/userservice';
import {testConnection} from './db_service/db_connection';

const app = express();
testConnection();
app.use(userservice);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})