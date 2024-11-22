import { Inject, Injectable } from "@nestjs/common";
import { PlaylistDTO } from "src/core/dto/playlist.dto";
import { PlaylistRepositoryImpl } from "src/infrastructure/repositories/playlist.repository.impl";

@Injectable()
export class PlaylistUseCase {
    constructor(
        @Inject('PlaylistInterface') 
        public readonly playlistRepositoryImpl: PlaylistRepositoryImpl
    ) {}

    async store(playlistDTO: PlaylistDTO) {
        return this.playlistRepositoryImpl.store(playlistDTO);
    }

    delete(id: string, userId: string) {
        return this.playlistRepositoryImpl.delete(id, userId);
    }

    index(){
        return this.playlistRepositoryImpl.index()
    }
}
