import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  validateUser(username: string, pass: string) {
    const user = this.userService.findOne(username);

    console.log(user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  refreshToken(user: any) {
    const payload = { username: user.username, sub: user.userId };

    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: jwtConstants.refreshSecret,
      }),
    };
  }
}
