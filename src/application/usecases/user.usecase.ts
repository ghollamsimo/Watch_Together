import {Inject, Injectable} from "@nestjs/common";
import {UserEntity} from "../../core/entities/user.entity";
import { LoginDTO } from "src/core/dto/login.dto";
import { UserRepositoryImpl } from "src/infrastructure/repositories/user.repository.impl";

@Injectable()
export class UserUseCase{
    constructor(@Inject('UserInterface') private readonly userRepository: UserRepositoryImpl) {}

    async execute(name: string, email: string, password: string, role: string = 'client'): Promise<UserEntity> {
        const user = new UserEntity(name, email, password, role);
        return await this.userRepository.store(user);
    }

    async login(email: string): Promise<{token : string}> {
        const loginDTO: LoginDTO = new LoginDTO(email);
        return await this.userRepository.login(loginDTO)
    }
}