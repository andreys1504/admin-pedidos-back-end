import { Request, Response, NextFunction } from 'express';

export interface ContextoRota {
    requisicao: Request; 
    resposta: Response; 
    avancar: NextFunction;
}