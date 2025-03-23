import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: 'mysql',
      logging: false,
    }
  );
  

export const sequelizeAuth = async () => {
    sequelize.authenticate()
        .then(() => console.log('Connected to database'))
        .catch((error) => console.error('Error connecting to database: ', error));
};

export const sequelizeCon = async () => {
    sequelize.sync()
        .then(() => console.log('Database synchronized'))
        .catch((error) => console.error('Error synchronizing database: ', error));
};

export default sequelize;



