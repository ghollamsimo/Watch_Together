import { UserInterface } from "../../core/interfaces/user.interface";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../core/entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User as UserDocument } from "../db/schemas/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../../core/dto/login.dto'


@Injectable()
export class UserRepositoryImpl implements UserInterface {
  constructor(@InjectModel(UserDocument.name) private userModel: Model<UserDocument>, private readonly jwtService: JwtService) { }
    
  
  async login(loginDTO: LoginDTO): Promise<{ token: string; }> {
    const user = await this.userModel.findOne({ email: loginDTO.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id, name: user.name, email: user.email });
    
    return { token };
  }

    index(user: UserEntity): UserEntity {
    const users = this.userModel.find();
    if (!users) return null;
    return new UserEntity(user.name, user.email, user.password, user.role);
  }

  async store(user: UserEntity): Promise<UserEntity> {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);

    const newUser = new this.userModel({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role || "client",
    });

    const savedUser = await newUser.save();
    return new UserEntity(
      savedUser.name,
      savedUser.email,
      savedUser.password,
      savedUser.role
    );
  }

}
