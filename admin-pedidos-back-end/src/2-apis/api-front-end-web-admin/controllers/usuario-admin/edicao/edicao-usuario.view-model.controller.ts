export interface EdicaoUsuarioViewModelController {
    senhaEditada: boolean;
    usuario: {
        idUsuario: number;
        nome: string;
        nomeUsuario: string;
        senha: string;
        permissoes?: string[];
    }
}