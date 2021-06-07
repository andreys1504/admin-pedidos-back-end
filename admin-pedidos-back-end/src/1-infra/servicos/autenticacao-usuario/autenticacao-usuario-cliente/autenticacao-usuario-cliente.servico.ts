import jwt from 'jsonwebtoken';

import { DadosTokenUsuarioClienteModel } from './dados-token-usuario-cliente.model';

const gerarToken = (dados: DadosTokenUsuarioClienteModel, saltKey: string) => {
    return jwt.sign(dados, saltKey, { expiresIn: '15d' });
}

const decodificarToken = (token: string, saltKey: string) => {
    return <DadosTokenUsuarioClienteModel>jwt.verify(token, saltKey);
}

export const autenticacaoUsuarioClienteServico = {
    gerarToken,
    decodificarToken
}