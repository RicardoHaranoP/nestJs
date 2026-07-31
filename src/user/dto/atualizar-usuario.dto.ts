import { PartialType } from '@nestjs/mapped-types'
import { criarUsuarioDto } from './criar-usuario.dto'

export class atualizarUsuarioDto extends PartialType (criarUsuarioDto) {}