import { Controller, Get, Query, Param, Body, Post, Put } from '@nestjs/common';
import { criarUsuarioDto } from './dto/criar-usuario.dto';
import { atualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { UsuarioService } from './user.service';

// Controlador recebe uma requisição e fornece uma resposta
@Controller('user')
export class UsuarioController {
    //utiliza injeção de dependência para fornecer uma instância do serviço ao Controller
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    getUsuarios(@Query('nome') nome: string): unknown {
        return this.usuarioService.findAllUsuarios(nome)
    }
    @Get(':id')
    getUsuariosById(@Param('id') id: string) {
        return this.usuarioService.EncontrarUmUsuario(Number(id))
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
