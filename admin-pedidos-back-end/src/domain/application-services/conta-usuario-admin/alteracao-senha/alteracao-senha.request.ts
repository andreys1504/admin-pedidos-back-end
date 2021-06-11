export interface AlteracaoSenhaRequest {
    senhaAtual: string;
    novaSenha: string;
    confirmacaoNovaSenha: string;
    nomeUsuario: string;
}