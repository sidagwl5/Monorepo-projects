import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema, collection: 'users' },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      privateKey: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
