import { Module } from '@nestjs/common';
import { UsuarioController } from './user.controller';
import { UsuarioService } from './user.service';
import { LoggerService } from './usuario.logger';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, LoggerService]
})
export class UserModule {}
