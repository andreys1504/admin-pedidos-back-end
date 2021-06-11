import express from 'express';

import { CadastroClienteController } from '../controllers/cliente/cadastro/cadastro-cliente.controller';
import { ClientesParaCadastroPedidoController } from '../controllers/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.controller';
import { ClientesParaEdicaoDadosController } from '../controllers/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.controller';
import { EdicaoClienteController } from '../controllers/cliente/edicao/edicao-cliente.controller';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { authorize } from '../../../core/apis/routes/authorize';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.post('/',
    authorize(),
    catchErrors((contexto: RouteContext) => new CadastroClienteController().executar(contexto)));

rotas.get('/clientes-cadastro-pedido/:nomeCpfCnpj',
    authorize(),
    catchErrors((contexto: RouteContext) => new ClientesParaCadastroPedidoController().executar(contexto)));

rotas.get('/para-edicao/:nomeCpfCnpj',
    authorize(),
    catchErrors((contexto: RouteContext) => new ClientesParaEdicaoDadosController().executar(contexto)));

rotas.put('/:id',
    authorize(),
    catchErrors((contexto: RouteContext) => new EdicaoClienteController().executar(contexto)));

export default rotas;