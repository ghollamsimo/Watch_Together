import { UserEntity } from '../entities/user.entity'
import { LoginDTO } from '../dto/login.dto'

export interface UserInterface {
    store(user: UserEntity): Promise<UserEntity>
    index(user: UserEntity): UserEntity
    login(loginDTO: LoginDTO): Promise<{ token: string }>;
    forgotPassword(email: string): Promise<{ email: string }>;
    resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }>;
}