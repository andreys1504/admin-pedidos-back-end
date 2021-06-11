import { Application } from 'express';

import homeRota from './routes/home.rota';
import contaUsuarioAdminRota from './routes/conta-usuario-admin.rota';
import usuarioAdminRota from './routes/usuario-admin.rota';
import tipoClienteRota from './routes/tipo-cliente.rota';
import tipoPagamentoPedidoRota from './routes/tipo-pagamento-pedido.rota';
import situacaoExternaPedidoRota from './routes/situacao-externa-pedido.rota';
import situacaoInternaItemPedidoRota from './routes/situacao-interna-item-pedido.rota';
import clienteRota from './routes/cliente.rota';
import produtoRota from './routes/produto.rota';
import situacaoExternaItemPedidoRota from './routes/situacao-externa-item-pedido.rota';
import tipoPedidoRota from './routes/tipo-pedido.rota';
import pedidoRota from './routes/pedido.rota';
import tipoProdutoRota from './routes/tipo-produto.rota';

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
