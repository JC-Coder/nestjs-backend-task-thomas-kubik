import { config } from 'dotenv';

config();

interface IEnvironment {
  APP: {
    PORT: number | string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    PORT: process.env.PORT,
  },
};
