import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ type: 'string', required: true, isRequired: true })
  firstName: string;

  @Prop({ type: 'string', required: true, isRequired: true })
  clientId: string;

  @Prop({ type: 'string' })
  lastName: string;

  @Prop({ type: 'string', required: false })
  avatar_url: string;

  @Prop({ type: 'string', required: false })
  picture: string;

  @Prop({ type: 'string', required: true, unique: true, _id: true })
  email: string;
}

export const userSchema = SchemaFactory.createForClass(User);
