import { PlaylistEntity } from "../entities/playlist.entity";

export interface PlaylistInterface{
    store(playlistEntity: PlaylistEntity): Promise<PlaylistEntity>
    index(playlistEntity: PlaylistEntity): Promise<PlaylistEntity>
}