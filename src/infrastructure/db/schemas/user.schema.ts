import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, enum: ['client', 'admin'], default: 'client' })
    role: string;
}

export const UserModelSchema = SchemaFactory.createForClass(User);
