import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  // canActivate decide se permite a execução da rota (true) ou se bloqueia a execução (false)
  canActivate(context: ExecutionContext): boolean {
    //obtém a requisição
    const request: Request = context.switchToHttp().getRequest()
    const role = request.headers['role']
    //verifica se é admin, se for, então continua, se não for, lança uma exceção
    if (role !== 'admin'){
      throw new UnauthorizedException(
        'Você não tem permissão para fazer essa ação'
      )
    }
    return true;
  }
}
