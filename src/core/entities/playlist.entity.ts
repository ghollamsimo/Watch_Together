import { Video } from "src/infrastructure/db/schemas/video.schema";

export class PlaylistEntity {
    constructor(
        public readonly user_id: string,
        public readonly name: string,
        public readonly videos: Video[]
    ) {}
}