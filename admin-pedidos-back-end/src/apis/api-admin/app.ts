import express, { Application } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import configurarRotas from './routes-app';
import { GlobalSettings } from "../../core/configurations/global-settings";
import { Environments } from "../../core/configurations/environments";
import GlobalErrorsHandler from "../../core/apis/global-errors.handler";

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

    if (GlobalSettings.CURRENT_ENVIRONMENT === Environments.DESENVOLVIMENTO_LOCAL)
      this.servidor.use(cors(corsOptions));
      
    this.servidor.use(GlobalErrorsHandler.configurar);
  }

  rotas() {
    configurarRotas(this.servidor);
  }
}
