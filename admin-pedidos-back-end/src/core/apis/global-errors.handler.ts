import { Request, Response, NextFunction } from 'express';

export default class GlobalErrorsHandler {
    static configurar(erro: any, requisicao: Request, resposta: Response, avancar: NextFunction) {
        let mensagem = erro.message;
        let statuCode = 500;

        // if (typeof(erro) === 'string') {
        //     mensagem = erro;
        //     statuCode = 400;
        // }
        // else if (erro.name === 'UnauthorizedError') {
        //     mensagem = 'Invalid Token';
        //     statuCode = 401;
        // }

        console.log('\n\n==========================================');
        console.log(erro);
        console.log('==========================================');

        return resposta.status(statuCode).json({ mensagem });
    }
}
