import { Request, Response, NextFunction } from 'express';

export interface RouteContext {
    request: Request; 
    response: Response; 
    avancar: NextFunction;
}
