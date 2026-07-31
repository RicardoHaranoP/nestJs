import { Controller, Get, Query, Param, Body, Post, Put } from '@nestjs/common';
import { criarUsuarioDto } from './dto/criar-usuario.dto';
import { atualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { UsuarioService } from './user.service';

// Controlador recebe uma requisição e fornece uma resposta
@Controller('user')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    getUsuarios(@Query('nome') nome: string) {
        const usuarioService = new UsuarioService();

        return usuarioService.findAllUsuarios(nome)
        // Permite filtragem pelo nome na url
        // if (nome) {
        //     return usuarios.filter((usuario) =>
        //         usuario.nome.toLowerCase().includes(nome.toLowerCase()),
        //     );
        // }

        // return usuarios;
    }
    @Get(':id')
    getUsuariosById(@Param('id') id: string) {
        return {id, name: 'Johm Doe'};
    }
    @Post()
    criarUsuario(@Body() criarUsuarioDto:criarUsuarioDto) {
        return { data: criarUsuarioDto, mensagem: 'Usuário criado com sucesso!'};
    }
    @Put(':id')
    atualizarUsuario(@Param('id') id: string, @Body() atualizarUsuarioDto:atualizarUsuarioDto) {
        return { 
            data: { id, ...atualizarUsuarioDto }, 
            mensagem: 'Usuário atualizado com sucesso'
        };
    }
}
