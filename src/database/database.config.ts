// src/config/database.config.ts

import { registerAs } from '@nestjs/config';

// La función 'registerAs' crea un paquete de configuración con el nombre 'database'.
export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  
  // Esta opción encuentra tus entidades automáticamente.
  autoLoadEntities: true, 

  // Es crucial que esto sea 'false' para no usar migraciones manuales.
  synchronize: false, 
}));