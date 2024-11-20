import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Playlist extends Document {
    @Prop({ required: true , ref : 'User', type: mongoose.Schema.Types.ObjectId})
    user_id: mongoose.Schema.Types.ObjectId;

}

export const PlaylistsModelSchema = SchemaFactory.createForClass(Playlist);
