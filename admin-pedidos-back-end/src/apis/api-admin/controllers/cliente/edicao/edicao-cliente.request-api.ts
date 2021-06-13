export interface EdicaoClienteRequestApi {
    id: number;
    nome: string;
    idTipoCliente: number;
    logradouro: string; 
    cep: string; 
    nomeCidade: string; 
    siglaUf: string;
    telefone: string;
    email: string;
    observacoes: string;
}
