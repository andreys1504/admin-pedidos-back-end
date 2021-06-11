export interface CadastroUsuarioAdminRequest {
    nomeUsuario: string;
    senha: string;
    nome: string;
    permissoes?: string[];
}