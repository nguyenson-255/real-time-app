import { IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class CreateUserDto extends LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string
}
