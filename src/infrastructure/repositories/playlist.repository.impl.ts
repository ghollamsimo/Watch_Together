import { InjectModel } from "@nestjs/mongoose";
import { PlaylistEntity } from "src/core/entities/playlist.entity";
import { PlaylistInterface } from "src/core/interfaces/playlist.interface";
import { Playlist as  PlaylistDocument} from "../db/schemas/playlist.schema";
import { Model } from "mongoose";

export class PlaylistRepositoryImpl implements PlaylistInterface{
    constructor(@InjectModel(PlaylistDocument.name) public readonly playListModel: Model<PlaylistDocument>){}
    async store(playlistEntity: PlaylistEntity): Promise<PlaylistEntity> {
        const playlist = new this.playListModel({
            user_id: playlistEntity.user_id,
            name: playlistEntity.name,
            videos: playlistEntity.videos,
        });
        
        const savedPlaylist = await playlist.save();
        return new PlaylistEntity(
            savedPlaylist.user_id.toString(),
            savedPlaylist.name,
            savedPlaylist.videos
        )
    }
    index(playlistEntity: PlaylistEntity): Promise<PlaylistEntity> {
        throw new Error("Method not implemented.");
    }
    
}