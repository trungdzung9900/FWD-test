import { config } from 'dotenv';
config();

export const serverConfig = {
  port: process.env.PORT || 4000,
};
