import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';

@Module({
    providers: [
        {
            provide: 'UserRepositoryImpl',
            useClass: UserRepositoryImpl, 
        },
    ],
    exports: ['UserRepositoryImpl'], 
})
export class UserRepositoryModule { }
