import { Application } from 'express';

import homeRota from './rotas/home.rota';
import contaUsuarioAdminRota from './rotas/conta-usuario-admin.rota';
import usuarioAdminRota from './rotas/usuario-admin.rota';
import tipoClienteRota from './rotas/tipo-cliente.rota';
import tipoPagamentoPedidoRota from './rotas/tipo-pagamento-pedido.rota';
import situacaoExternaPedidoRota from './rotas/situacao-externa-pedido.rota';
import situacaoInternaItemPedidoRota from './rotas/situacao-interna-item-pedido.rota';
import clienteRota from './rotas/cliente.rota';
import produtoRota from './rotas/produto.rota';
import situacaoExternaItemPedidoRota from './rotas/situacao-externa-item-pedido.rota';
import tipoPedidoRota from './rotas/tipo-pedido.rota';
import pedidoRota from './rotas/pedido.rota';
import tipoProdutoRota from './rotas/tipo-produto.rota';

export default (app: Application) => {
    app.use('/', homeRota);
    app.use('/conta-usuario-admin', contaUsuarioAdminRota);
    app.use('/usuarios-admin', usuarioAdminRota);
    app.use('/tipos-cliente', tipoClienteRota);
    app.use('/tipos-pagamento-pedido', tipoPagamentoPedidoRota);
    app.use('/situacoes-externa-pedido', situacaoExternaPedidoRota);
    app.use('/situacoes-interna-item-pedido', situacaoInternaItemPedidoRota);
    app.use('/clientes', clienteRota);
    app.use('/produtos', produtoRota);
    app.use('/situacoes-externas-item-pedido', situacaoExternaItemPedidoRota);
    app.use('/tipos-pedido', tipoPedidoRota);
    app.use('/pedidos', pedidoRota);
    app.use('/tipos-produto', tipoProdutoRota);
}
