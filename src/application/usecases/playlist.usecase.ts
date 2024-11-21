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
        // Delegate the storage logic to the repository
        return this.playlistRepositoryImpl.store(playlistDTO);
    }
}
