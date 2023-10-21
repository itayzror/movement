// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
//import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(email: string, password: string): Promise<any> {
    if (email === 'admin' && password === 'admin') {
      return { username: 'admin', password: 'admin' };
    }
    return null;
  }

  async generateJwtToken(user: { email: string; password: string}): Promise<string> {
    const payload = { username: user.email, password: user.password };
    const token = await jwt.sign(payload, 'my-secret', { expiresIn: '1h' }); 
    return token;
  }
}
