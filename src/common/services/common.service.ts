import { HttpException, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const handleErrors = (message: string, code: number) => {
  const logger = new Logger();
  logger.error(message);

  throw new HttpException(message, code);
};

export const convertToken = (context: any) => {
  const authHeader = context.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  const decodedToken: any = jwt.verify(token, "GSJFDHG827FSDBNGLKWY0R982423TKJGHWS98R7-254");
  return decodedToken.sub;
};
