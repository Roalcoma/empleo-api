// src/database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config(); // Carga las variables de entorno del archivo .env

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, // Asegura que el puerto sea un número
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'], // IMPORTANTE: Apunta a los archivos .js compilados
  migrations: ['dist/database/migrations/*.js'], // Apunta a las migraciones compiladas
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;