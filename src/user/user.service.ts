import { Injectable } from '@nestjs/common';
import { LoggerService } from './usuario.logger';

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
}
