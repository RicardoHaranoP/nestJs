import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';
import { UsuarioController } from './user/user.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    //define que o ApiKeyMiddleware vai ser executado antes de todas as rotas do usuarioController
    consumer.apply(ApiKeyMiddleware).forRoutes(UsuarioController)
  }
}
