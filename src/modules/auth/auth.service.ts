import { Injectable } from '@nestjs/common';
//import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MedicosService } from '../medicos/service/medicos.service';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = {
      
    };
    if (user) {
      
      return user;
    }
    return null;
  }

  generateJWT(user: any) {
    const payload: any = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}