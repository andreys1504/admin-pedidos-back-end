import { Request, Response, NextFunction } from 'express';

export default class ErrorsHandler {
    static handle(error: any, request: Request, response: Response, avancar: NextFunction) {
        let message = error.message;
        let statusCode = 500;

        // if (typeof(erro) === 'string') {
        //     mensagem = erro;
        //     statuCode = 400;
        // }
        // else if (erro.name === 'UnauthorizedError') {
        //     mensagem = 'Invalid Token';
        //     statuCode = 401;
        // }

        console.log('\n\n==========================================');
        console.log(error);
        console.log('==========================================');

        return response.status(statusCode).json({ message });
    }
}
