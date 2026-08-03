import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './usuario.logger';
import { criarUsuarioDto } from './dto/criar-usuario.dto';
import { atualizarUsuarioDto } from './dto/atualizar-usuario.dto';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
}

// o decorator @Injectable faz com que seja tratado como um provider
@Injectable()
export class UsuarioService {
    //Utiliza injeção de dependência para disponibilizar uma instância do serviço de log à classe
    constructor(private readonly logger: LoggerService){}
    
    private usuarios: Usuario[] = [
        { id: 1, nome: 'John Doe', email: 'john@example.com'},
        { id: 2, nome: 'Maria', email: 'john@example.com'},
    ];

    findAllUsuarios(nome: string = ''){
        this.logger.log('Encontrando todos os usuários');

        return this.usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(nome.toLowerCase()),
        );
    }

    EncontrarUmUsuario(id: number){
        this.logger.log('Encontrando um usuário');

        return this.usuarios.find((usuario) =>
            usuario.id === id
        );
    }

    //Criando um usuário
    CriarUsuario (criarUsuarioDto: criarUsuarioDto){
        this.logger.log('Criando um usuário');

        const novoUsuario: Usuario = {
            id: this.usuarios.length + 1,
            nome: criarUsuarioDto.nome,
            email: criarUsuarioDto.email,
        }

        this.usuarios.push(novoUsuario)
        return novoUsuario;
    }

    //Atualizando um usuário
    AtualizarUsuario (id: number, AtualizarUsuariodto: atualizarUsuarioDto) {
        this.logger.log('Atualizando usuário')

        // procura usuário
        const usuario = this.usuarios.find(usuario => usuario.id === id)

        // se não encontrar usuário, lança uma exceção
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado')
        }

        // verifica campo nome, se nome não for undefined, então atualiza o nome
        if (AtualizarUsuariodto.nome !== undefined) {
            usuario.nome = AtualizarUsuariodto.nome
        }

        //verifica campo email, se email não for undefined, então atualiza o email
        if (AtualizarUsuariodto.email !== undefined) {
            usuario.email = AtualizarUsuariodto.email
        }

        return usuario
    }
}
