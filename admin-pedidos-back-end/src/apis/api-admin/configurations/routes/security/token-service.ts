import jwt from "jsonwebtoken";
import { Request } from "express";
import { TokenPayload } from "./token-payload";

const generateToken = (dados: TokenPayload, saltKey: string) => {
  return jwt.sign(dados, saltKey, { expiresIn: "15d" });
};

const decodeToken = (token: string, saltKey: string) => {
  return <TokenPayload>jwt.verify(token, saltKey);
};

const getToken = (request: Request) => {
  return (
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"]
  );
};

export const tokenService = {
  generateToken,
  decodeToken,
  getToken
};
