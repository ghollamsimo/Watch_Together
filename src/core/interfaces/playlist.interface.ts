import { PlaylistDocument } from "src/infrastructure/db/schemas/playlist.schema";
import { PlaylistEntity } from "../entities/playlist.entity";

export interface PlaylistInterface{
    store(playlistEntity: PlaylistEntity): Promise<PlaylistEntity>
    index(): Promise<PlaylistDocument[]>
    delete(id: string, user_id: string): Promise<{message: string}>    
}