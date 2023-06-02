import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './user.guard';
import { UserService } from './user.service';
@Controller({ path: '/user', version: '1' })
export class UserController {
  constructor(
    private readonly userservice: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: any) {
    return this.userservice.getUserData(req.user);
  }

  @Post('/dummy-login')
  async dummyLogin(@Body() body: { password: string; username: string }) {
    const user = {
      username: 'new_user_1234',
      password: '123456',
    };

    if (body.password !== user.password || body.username !== user.username) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ ...user, user_metadata: null });

    return { user, token };
  }

  @Get('/dummy-auth')
  @UseGuards(AuthGuard)
  async dummyAuth() {
    const user = {
      username: 'new_user_1234',
      password: '123456',
    };
    return user;
  }
}
