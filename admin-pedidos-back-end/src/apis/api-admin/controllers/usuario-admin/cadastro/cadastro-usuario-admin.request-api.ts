export interface CadastroUsuarioAdminRequestApi { 
    nomeUsuario: string, 
    senha: string, 
    nome: string, 
    permissoes?: string[] | undefined
}
