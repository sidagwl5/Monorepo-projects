import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { User } from './user.schema';
import crypto from 'crypto';

export class UserService {
  constructor(
    @InjectModel(User.name) private userSchema: Model<HydratedDocument<User>>
  ) {}

  async getUserData(payload: any) {
    let user: any;
    user = await this.userSchema.findOne({ email: payload.email });

    if (!user) {
      const [firstName, lastName] = payload.full_name.split(' ');
      payload.firstName = firstName;
      payload.lastName = lastName;
      payload.clientId = crypto.randomUUID();

      user = await this.userSchema.create(payload);
    }

    return user;
  }
}
