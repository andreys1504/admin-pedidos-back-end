import express, { Application } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import routesApp from '../routes-api';
import { GlobalSettings } from "../../../core/configurations/global-settings";
import { Environments } from "../../../core/configurations/environments";
import ErrorsHandler from "./errors.handler";

export default class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  async middlewares() {
    var corsOptions: cors.CorsOptions = {
      origin: '*',
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }

    this.server.use(logger('combined'));
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json({ limit: '5mb' }));

    if (GlobalSettings.CURRENT_ENVIRONMENT === Environments.DESENVOLVIMENTO_LOCAL)
      this.server.use(cors(corsOptions));
      
    this.server.use(ErrorsHandler.handle);
  }

  routes() {
    routesApp(this.server);
  }
}
