import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { PedidosParaTratamentoController } from '../controllers/pedido/pedidos-para-tratamento/pedidos-para-tratamento.controller';
import { CadastroPedidoController } from '../controllers/pedido/cadastro/cadastro-pedido.controller';
import { EdicaoPedidoController } from '../controllers/pedido/edicao/edicao-pedido.controller';
import { PedidosCadastradosController } from '../controllers/pedido/pedidos-cadastrados/pedidos-cadastrados.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new PedidosCadastradosController().executar(contexto)));

rotas.get('/pedidos-para-tratamento',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new PedidosParaTratamentoController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroPedidoController().executar(contexto)));

rotas.put('/:id',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new EdicaoPedidoController().executar(contexto)));
    
export default rotas;