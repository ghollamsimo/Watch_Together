import { Body, Controller, Post } from "@nestjs/common";
import { UserUseCase } from "../../application/usecases/user.usecase";
import { UserEntity } from "../../core/entities/user.entity";
import { LoginDTO } from "src/core/dto/login.dto";

@Controller('auth')
export class UserController {
    constructor(private readonly userUseCase: UserUseCase) { }

    @Post('register')
    async store(
        @Body() body: { name: string; email: string; password: string }
    ): Promise<UserEntity> {
        return this.userUseCase.execute(body.name, body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: LoginDTO): Promise<{ token: string }> {
        return this.userUseCase.login(body.email);
    }
}
