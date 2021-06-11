import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { TiposPagamentoController } from '../controllers/tipo-pagamento-pedido/tipos-pagamento/tipos-pagamento.controller';
import { CadastroTipoPagamentoPedidoController } from '../controllers/tipo-pagamento-pedido/cadastro/cadastro-tipo-pagamento-pedido.controller';
import { TiposPagamentoAtivosController } from '../controllers/tipo-pagamento-pedido/tipos-pagamento-ativos/tipos-pagamento-ativos.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposPagamentoController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroTipoPagamentoPedidoController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposPagamentoAtivosController().executar(contexto)));

export default rotas;