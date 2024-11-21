import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from 'src/infrastructure/db/schemas/playlist.schema';
import { PlaylistController } from 'src/interface/http/playlist.controller';
import { PlaylistUseCase } from 'src/application/usecases/playlist.usecase';
import { PlaylistRepositoryImpl } from 'src/infrastructure/repositories/playlist.repository.impl';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
        secret: 'your-secret-key', // Replace with your actual secret
        signOptions: { expiresIn: '1h' },
      }),
    MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]),
  ],
  controllers: [PlaylistController],
  providers: [
    PlaylistUseCase,
    {
      provide: 'PlaylistInterface',
      useClass: PlaylistRepositoryImpl,
    },
    JwtAuthGuard
  ],
  exports: ['PlaylistInterface'],
})
export class PlaylistModule {}
