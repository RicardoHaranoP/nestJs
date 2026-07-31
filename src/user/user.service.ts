import { Injectable } from '@nestjs/common';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
}

@Injectable()
export class UsuarioService {
    private usuarios: Usuario[] = [
        { id: 1, nome: 'John Doe', email: 'john@example.com'},
        { id: 2, nome: 'John Doe', email: 'john@example.com'},
    ];

    findAllUsuarios(nome: string = ''){
        return this.usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(nome.toLowerCase()),
        );
    }
}
