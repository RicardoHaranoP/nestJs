import { Controller, Get, Query, Param, Body, Post, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { criarUsuarioDto } from './dto/criar-usuario.dto';
import { atualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import { UsuarioService } from './user.service';
import { RoleGuard } from 'src/guards/role.guard';

// Controlador recebe uma requisição e fornece uma resposta
@Controller('user')
export class UsuarioController {
    //utiliza injeção de dependência para fornecer uma instância do serviço ao Controller
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
    getUsuarios(@Query('nome') nome: string): unknown {
        return this.usuarioService.findAllUsuarios(nome)
    }
    @Get(':id')
    getUsuariosById(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.EncontrarUmUsuario(id)
    }
    @Post()
    criarUsuario(@Body() criarUsuarioDto: criarUsuarioDto) {
        return this.usuarioService.CriarUsuario(criarUsuarioDto)
    }
    @Put(':id')
    atualizarUsuario(@Param('id', ParseIntPipe) id: number, @Body() AtualizarUsuarioDto: atualizarUsuarioDto) {
        return this.usuarioService.AtualizarUsuario(id, AtualizarUsuarioDto)
    }
    @Delete('id')
    @UseGuards(RoleGuard)
    deletarUsuario(@Param('id', ParseIntPipe) id: number) {
        this.usuarioService.deletarUsuario(id)


        return {
            mensagem: 'Usuário removido com sucesso'
        };
    }
}
