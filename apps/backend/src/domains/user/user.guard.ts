import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = context.switchToHttp().getRequest().headers[
        'authorization'
      ];

      const payload = this.jwtService.verify(token);

      if (!payload) throw payload;

      context.switchToHttp().getRequest().user = payload.user_metadata;

      return true;
    } catch (error) {
      throw new UnauthorizedException('You are not authenticated');
    }
  }
}
