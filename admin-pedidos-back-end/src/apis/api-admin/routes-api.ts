import { Application } from 'express';

import homeRoutes from './routes/home.routes';
import contaUsuarioAdminRoutes from './routes/conta-usuario-admin.routes';
import usuarioAdminRoutes from './routes/usuario-admin.routes';
import tipoClienteRoutes from './routes/tipo-cliente.routes';
import tipoPagamentoPedidoRoutes from './routes/tipo-pagamento-pedido.routes';
import situacaoExternaPedidoRoutes from './routes/situacao-externa-pedido.routes';
import situacaoInternaItemPedidoRoutes from './routes/situacao-interna-item-pedido.routes';
import clienteRoutes from './routes/cliente.routes';
import produtoRoutes from './routes/produto.routes';
import situacaoExternaItemPedidoRoutes from './routes/situacao-externa-item-pedido.routes';
import tipoPedidoRoutes from './routes/tipo-pedido.routes';
import pedidoRoutes from './routes/pedido.routes';
import tipoProdutoRoutes from './routes/tipo-produto.routes';

export default (app: Application) => {
    app.use('/', homeRoutes);
    app.use('/conta-usuario-admin', contaUsuarioAdminRoutes);
    app.use('/usuarios-admin', usuarioAdminRoutes);
    app.use('/tipos-cliente', tipoClienteRoutes);
    app.use('/tipos-pagamento-pedido', tipoPagamentoPedidoRoutes);
    app.use('/situacoes-externa-pedido', situacaoExternaPedidoRoutes);
    app.use('/situacoes-interna-item-pedido', situacaoInternaItemPedidoRoutes);
    app.use('/clientes', clienteRoutes);
    app.use('/produtos', produtoRoutes);
    app.use('/situacoes-externas-item-pedido', situacaoExternaItemPedidoRoutes);
    app.use('/tipos-pedido', tipoPedidoRoutes);
    app.use('/pedidos', pedidoRoutes);
    app.use('/tipos-produto', tipoProdutoRoutes);
}
