import jwt from 'jsonwebtoken';

import { DadosTokenUsuarioAdminModel } from './dados-token-usuario-admin.model';

const gerarToken = (dados: DadosTokenUsuarioAdminModel, saltKey: string) => {
    return jwt.sign(dados, saltKey, { expiresIn: '15d' });
}

const decodificarToken = (token: string, saltKey: string) => {
    return <DadosTokenUsuarioAdminModel>jwt.verify(token, saltKey);
}

export const autenticacaoUsuarioAdminServico = {
    gerarToken,
    decodificarToken
}