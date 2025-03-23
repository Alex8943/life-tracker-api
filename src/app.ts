import express from 'express';
import {testConnection} from './db_service/db_connection';
import { sequelizeAuth } from './other_services/sequelizeConnection';
import userservice from './routes/usersRoute';
import authRoute from './routes/authRoute';
const app = express();
app.use(express.json());

//testConnection();
//sequelizeAuth();
app.use(userservice);
app.use(authRoute);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})