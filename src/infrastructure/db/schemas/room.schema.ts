import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Room extends Document {
    @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
    user_id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({
        type: [
            {
                playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
                sharedUntil: { type: Date, required: true },
            },
        ],
        default: [],
    })
    sharedPlaylists: Array<{
        playlist: mongoose.Schema.Types.ObjectId;
        sharedUntil: Date;
    }>;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
