import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { TiposPagamentoController } from '../controllers/tipo-pagamento-pedido/tipos-pagamento/tipos-pagamento.controller';
import { CadastroTipoPagamentoPedidoController } from '../controllers/tipo-pagamento-pedido/cadastro/cadastro-tipo-pagamento-pedido.controller';
import { TiposPagamentoAtivosController } from '../controllers/tipo-pagamento-pedido/tipos-pagamento-ativos/tipos-pagamento-ativos.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposPagamentoController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroTipoPagamentoPedidoController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposPagamentoAtivosController().executar(contexto)));

export default rotas;