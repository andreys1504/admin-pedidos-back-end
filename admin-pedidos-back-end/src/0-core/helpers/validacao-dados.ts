import * as validate from 'gerador-validador-cpf';

import { ResultadoValidacaoDadosModel } from '../dominio/resultado-validacao-dados.model';
import { extrairNumerosTexto } from '.';

export class ValidacaoDados {
    private erros: ResultadoValidacaoDadosModel[];

    constructor() {
        this.erros = [];
    }

    recuperarErros = () => {
        return this.erros;
    }

    limpar = () => {
        this.erros = [];
    }

    valido = () => {
        return this.erros.length === 0;
    }

    adicionarMensagem = (mensagem: string) => {
        this.erros.push({ mensagem });
    }

    precoZerado = (valor: string, mensagem: string) => {
        const valorUnitarioLimpo = extrairNumerosTexto(valor);
        let quantidadeZerosValor = 0;
        for (var i = 0; i < valorUnitarioLimpo.length; i++) {
            if (valorUnitarioLimpo.charAt(i) === '0')
                quantidadeZerosValor++;
        }

        if (quantidadeZerosValor === valorUnitarioLimpo.length) {
            this.erros.push({ mensagem });
            return false;
        }

        return true;
    }

    //
    obrigatorioColecoes = (valor: any[], mensagem: string) => {
        if (!valor || valor.length < 1) {
            this.erros.push({ mensagem });
            return false;
        }

        return true;
    }

    //any
    obrigatorio = (valor: any, mensagem: string = '') => {
        if (valor === '' || valor === null || valor === undefined) {
            if (mensagem) this.erros.push({ mensagem });
            return false;
        }

        if (valor.constructor === String && valor.toString().trim().length <= 0) {
            if (mensagem) this.erros.push({ mensagem });
            return false;
        }

        return true;
    }

    igual = (valor: any, valorComparacao: any, mensagem: string) => {
        if (!valor) return;

        if (valor != valorComparacao)
            this.erros.push({ mensagem });
    }

    naoIgual = (valor: any, valorComparacao: any, mensagem: string) => {
        if (!valor) return;

        if (valor == valorComparacao)
            this.erros.push({ mensagem });
    }

    //number
    menorMaior = (valor: number, minimo: number, maximo: number, mensagem: string) => {
        if (this.nullOuUndefined(valor)) return;

        if (valor < minimo || valor > maximo)
            this.erros.push({ mensagem });
    }

    //string
    tamanhoMinimo = (valor: string, minimo: number, mensagem: string) => {
        if (this.nullOuUndefined(valor)) return;

        if (valor.trim().length < minimo)
            this.erros.push({ mensagem });
    }

    tamanhoMaximo = (valor: string, maximo: number, mensagem: string) => {
        if (this.nullOuUndefined(valor)) return;

        if (valor.trim().length > maximo)
            this.erros.push({ mensagem });
    }

    tamanhoMinMax = (valor: string, minimo: number, maximo: number, mensagem: string) => {
        if (this.nullOuUndefined(valor)) return;

        valor = valor.trim();

        if (valor.length < minimo || valor.length > maximo)
            this.erros.push({ mensagem });
    }

    validarCep = (valor: string, mensagem: string) => {
        if (!valor) return;

        valor = extrairNumerosTexto(valor);

        if (!valor || valor.length != 8)
            this.erros.push({ mensagem });
    }

    tamanhoIgual = (valor: string, tamanho: number, mensagem: string) => {
        if (this.nullOuUndefined(valor)) return;

        if (valor.trim().length != tamanho)
            this.erros.push({ mensagem });
    }

    validarTelefone = (valor: string, mensagem: string) => {
        if (!valor) return;

        valor = extrairNumerosTexto(valor);
        if (valor.length < 10 || valor.length > 16)
            this.erros.push({ mensagem });
    }

    validarEmail = (valor: string, mensagem: string) => {
        if (!valor) return;

        if (!valor.match(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i))
            this.erros.push({ mensagem });
    }

    validarCpf = (valor: string, mensagem: string) => {
        if (!valor) return;

        valor = valor.toString();

        if (valor.length < 11) {
            for (let i = 1; i < 12; i++) {
                valor = '0' + valor;

                if (valor.length == 11)
                    break;
            }
        }

        if (!validate.validate(valor))
            this.erros.push({ mensagem });
    }

    validarCnpj = (valor: string, mensagem: string) => {
        if (!valor) return;

        if (valor.length < 14 || valor.length > 14) //TODO
            this.erros.push({ mensagem });
    }

    tipoDadoIgual = (valor: string, tipoDado: any, mensagem: string) => {
        if (!valor) return;

        if (valor.constructor !== tipoDado)
            this.erros.push({ mensagem });
    }

    static eUmCpf = (valor: string) => {
        if (valor.length <= 11)
            return true;

        return false;
    }

    private nullOuUndefined = (valor: any) => {
        return valor === null || valor === undefined;
    }
}
