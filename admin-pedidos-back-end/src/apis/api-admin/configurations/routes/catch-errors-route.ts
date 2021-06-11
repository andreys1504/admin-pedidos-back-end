import { Request, Response, NextFunction } from "express";

export const catchErrorsRoute =
  (funcao: any) =>
  (requisicao: Request, resposta: Response, avancar: NextFunction) => {
    Promise.resolve(funcao({ requisicao, resposta, avancar })).catch((erro) => {
      console.log("Erro em Controller");
      console.log(erro);
      (erro.httpStatus = 500), avancar(erro);
    });
  };
