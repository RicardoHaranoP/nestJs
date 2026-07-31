import { Injectable } from "@nestjs/common";

//cria um serviço responsável por registrar mensagens de Log
@Injectable()
export class LoggerService {
    log(mensagem: string){
        console.log('[LOG]', mensagem);
    }
}