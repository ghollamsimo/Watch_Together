import { InjectModel } from "@nestjs/mongoose";
import { PlaylistEntity } from "src/core/entities/playlist.entity";
import { PlaylistInterface } from "src/core/interfaces/playlist.interface";
import { PlaylistDocument, Playlist} from "../db/schemas/playlist.schema";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";

export class PlaylistRepositoryImpl implements PlaylistInterface{
    constructor(@InjectModel(Playlist.name) public readonly playListModel: Model<PlaylistDocument>){}
    async delete(id: string, user_id: string): Promise<{ message: string }> {
        const playlist = await this.playListModel.findById(id).exec();
        if (!playlist) {
          throw new NotFoundException('Playlist not found');
        }
    
        const playlistDeleteResult = await this.playListModel.findOneAndDelete({
          _id: id,
          user_id: user_id,
        }).exec();
    
        if (!playlistDeleteResult) {
          throw new NotFoundException('No Playlist found with the specified id and user_id');
        }
    
        return { message: 'Playlist deleted' };
      }
    
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
    index(): Promise<PlaylistDocument[]> {
        return this.playListModel.find().exec()
    }
    
}