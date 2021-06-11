import { Request, Response, NextFunction } from "express";
import { GlobalSettings } from "../../../../../core/configurations/global-settings";
import { RouteContext } from "../route-context";
import { tokenService } from "./token-service";
import jwt from "jsonwebtoken";

export const authorize =
  (permission: string = "") =>
  (request: Request, response: Response, avancar: NextFunction) => {
    Promise.resolve(
      permission != ""
        ? authorizeAccessRoute({ request, response, avancar }, permission)
        : authorizeAccessRoute({ request, response, avancar })
    ).catch((erro) => {
      (erro.httpStatus = 500), avancar(erro);
    });
  };

const authorizeAccessRoute = (
  routeContext: RouteContext,
  chavePermissao: string = ""
) => {
  const token = tokenService.getToken(routeContext.request);

  if (!token)
    routeContext.response.status(401).json({ mensagem: "Acesso Restrito" });
  else
    jwt.verify(
      token,
      <string>GlobalSettings.APIS_SALT_KEY,
      (erro: any, decoded: any) => {
        if (erro)
          routeContext.response
            .status(401)
            .json({ mensagem: "Token Inválido" });
        else {
          if (!chavePermissao) routeContext.avancar();
          else {
            if (decoded.permissoes.includes(chavePermissao))
              routeContext.avancar();
            else
              routeContext.response.status(403).json({
                mensagem:
                  "Você não possui permissão de acesso a esta funcionalidade",
              });
          }
        }
      }
    );
};
