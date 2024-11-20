import { InjectModel } from "@nestjs/mongoose";
import { PlaylistEntity } from "src/core/entities/playlist.entity";
import { PlaylistInterface } from "src/core/interfaces/playlist.interface";
import { Playlist as  PlaylistDocument} from "../db/schemas/playlist.schema";
import { Model } from "mongoose";

export class PlaylistRepositoryImpl implements PlaylistInterface{
    constructor(@InjectModel(PlaylistDocument.name) public readonly playListModel: Model<PlaylistDocument>){}
    store(playlistEntity: PlaylistEntity): Promise<PlaylistEntity> {
        
    }
    index(playlistEntity: PlaylistEntity): Promise<PlaylistEntity> {
        throw new Error("Method not implemented.");
    }
    
}