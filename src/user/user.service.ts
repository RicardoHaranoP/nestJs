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
    constructor(private readonly logger: LoggerService) { }

    private usuarios: Usuario[] = [
        { id: 1, nome: 'John Doe', email: 'john@example.com' },
        { id: 2, nome: 'Maria', email: 'john@example.com' },
    ];

    findAllUsuarios(nome: string = '') {
        this.logger.log('Encontrando todos os usuários');

        return this.usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(nome.toLowerCase()),
        );
    }

    EncontrarUmUsuario(id: number) {
        this.logger.log('Encontrando um usuário');

        const usuario = this.usuarios.find((usuario) =>
            usuario.id === id
        );

        //verifica se tem usuário, se não tiver então lança uma exceção
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado')
        }

        return usuario;
    }

    //Criando um usuário
    CriarUsuario(dto: criarUsuarioDto) {
        this.logger.log('Criando um usuário');

        const novoUsuario: Usuario = {
            id: this.usuarios.length + 1,
            nome: dto.nome,
            email: dto.email,
        }

        this.usuarios.push(novoUsuario)
        return novoUsuario;
    }

    //Atualizando um usuário
    AtualizarUsuario(id: number, dto: atualizarUsuarioDto) {
        this.logger.log('Atualizando usuário')

        // procura usuário
        const usuario = this.usuarios.find(usuario => usuario.id === id)

        // se não encontrar usuário, lança uma exceção
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado')
        }

        // verifica campo nome, se nome não for undefined, então atualiza o nome
        if (dto.nome !== undefined) {
            usuario.nome = dto.nome
        }

        //verifica campo email, se email não for undefined, então atualiza o email
        if (dto.email !== undefined) {
            usuario.email = dto.email
        }

        return usuario
    }

    deletarUsuario(id: number): void {
        this.logger.log('Removendo usuário')
        //findIndex retorna a posição do elemento no array
        const indice = this.usuarios.findIndex(usuario => usuario.id === id);

        // verifica se não encontrou
        if (indice === -1) {
            throw new NotFoundException('Usuário não encontrado');
        }

        //splice modifica o array, primeiro parâmetro é a posição, e o segundo quantos elementos serão removidos
        this.usuarios.splice(indice, 1);

    }
}
