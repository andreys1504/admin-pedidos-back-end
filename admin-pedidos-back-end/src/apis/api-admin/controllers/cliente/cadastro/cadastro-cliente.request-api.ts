export interface CadastroClienteRequestApi {
    nome: string; 
    idTipoCliente: number;
    cpfCnpj: string; 
    logradouro: string; 
    cep: string; 
    nomeCidade: string; 
    siglaUf: string;
    telefone: string;
    email: string;
    observacoes: string;
}
