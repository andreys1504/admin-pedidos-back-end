import { Request, Response, NextFunction } from 'express';

export interface RouteContext {
    requisicao: Request; 
    resposta: Response; 
    avancar: NextFunction;
}
