import { Module } from '@nestjs/common';
import { UsuarioController } from './user.controller';
import { UsuarioService } from './user.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UserModule {}
