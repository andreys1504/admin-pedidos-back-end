import express, { Application } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';

import ManipuladorErrosApi from '../../0-core/apis/manipulador-erros-api';
import configurarRotas from './rotas.app';
import { ConfiguracoesGlobaisApp } from "../../0-core/configuracoes-aplicacoes/configuracoes-globais.app";
import { AmbientesAplicacao } from "../../0-core/configuracoes-aplicacoes/ambientes-aplicacao.app";

export default class App {
  public servidor: Application;

  constructor() {
    this.servidor = express();

    this.middlewares();
    this.rotas();
  }

  async middlewares() {
    var corsOptions: cors.CorsOptions = {
      origin: '*',
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }

    this.servidor.use(logger('combined'));
    this.servidor.use(bodyParser.urlencoded({ extended: false }));
    this.servidor.use(bodyParser.json({ limit: '5mb' }));

    if (ConfiguracoesGlobaisApp.CURRENT_ENVIRONMENT === AmbientesAplicacao.DESENVOLVIMENTO_LOCAL)
      this.servidor.use(cors(corsOptions));
      
    this.servidor.use(ManipuladorErrosApi.configurar);
  }

  rotas() {
    configurarRotas(this.servidor);
  }
}