import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './user.guard';

@Controller({ path: '/user', version: '1' })
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: any) {
    return this.userservice.getUserData(req.user);
  }
}
