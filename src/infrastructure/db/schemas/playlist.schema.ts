import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';

@Schema()
export class Playlist extends Document {
    @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
    user_id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [VideoSchema], default: [] })
    videos: Video[];
}
export type PlaylistDocument = Playlist & Document;

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
