import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {

 async use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      console.log(process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
      req.headers['user'] = JSON.stringify(decoded);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
 }
}
