import { IsEmail, IsString, MinLength} from "class-validator";

export class criarUsuarioDto {
    //valida se é string
    @IsString()
    //valida se o comprimento é maior que 3
    @MinLength(3)
    nome!: string;

    //valida se é um email válido
    @IsEmail()
    email!: string;
}