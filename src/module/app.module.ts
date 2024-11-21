import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelSchema } from '../infrastructure/db/schemas/user.schema';
import { UserController } from '../interface/http/user.controller';
import { UserUseCase } from '../application/usecases/user.usecase';
import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository.impl';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './playlist.module';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Watchtogether'),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PlaylistModule,
  ],
  controllers: [UserController],
  providers: [
    UserUseCase,
    {
      provide: 'UserInterface',
      useClass: UserRepositoryImpl,
    },
    JwtAuthGuard
  ],
  exports: [JwtAuthGuard],

})
export class AppModule {}
