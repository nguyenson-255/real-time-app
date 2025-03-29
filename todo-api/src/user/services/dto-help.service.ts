import { UserI } from "../interfaces/user.interfaces";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";

export class DtoHelperService {

    createDtoToEntites(createUserDto: CreateUserDto): UserI {
        return {
            username: createUserDto.username,
            password: createUserDto.password,
            email: createUserDto.email
        }
    }

    loginDtoToEntites(loginDto: LoginDto): UserI {
        return {
            password: loginDto.password,
            email: loginDto.email
        }
    }
}