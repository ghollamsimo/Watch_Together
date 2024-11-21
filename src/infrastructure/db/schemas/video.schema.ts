import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Video extends Document {

    @Prop({ required: true })
    url: string;

}

export const VideoSchema = SchemaFactory.createForClass(Video);
