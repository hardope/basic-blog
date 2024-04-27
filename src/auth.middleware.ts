import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {

 async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, 'simplesecret')
      req.headers['user'] = JSON.stringify(decoded);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
 }
}
