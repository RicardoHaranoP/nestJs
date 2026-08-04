import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'

// Valida a ApiKey antes de continuar
@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // lê a api key
    const apiKey = req.headers['x-api-key'];
    //valida a api-key
    if(apiKey !== 'secret-key-123'){
      throw new UnauthorizedException('Invalid API key')
    }

    next();
  }
}
