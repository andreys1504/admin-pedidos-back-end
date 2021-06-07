
# Admin Pedidos - Back end
Admin Pedidos - Back end tem por intuito demonstrar uma opção para criação de um back-end para o seu sistema. Código que tem por base a plataforma Node.js/Typescript.
 

### Frameworks/Libs
- Node.js
- Typescript
- PostgreSQL
- TypeORM
- Docker


### Implementação: Configurações
- docker-compose
via terminal: docker-compose up -d

- .env
utilizar .env.EXAMPLE para a criação das configurações da Api.

- criar bancos de dados: AdminPedidos e AdminPedidos_Tests.

- executar migrations: npm run migration:run

### yml's

os arquivos yml são um exemplo para realizar a publicação da Api em um ambiente de testes junto ao Azure.

### Observações

- controllers

recuperarValorBoleanoRequisicao

- entidades

não permitir que os campos de entidades aceitem 'undefined';

em colunas que aceitam valores nulos informar 'type', 'nullable' e 'null':
@Column({ name: "dataFinalizacaoPedido", type: 'date', nullable: true })
dataFinalizacaoPedido: string | null;

campos que mapeiam colunas 'date' devem ser definidas como 'string', exceto as propriedades
'dataCriacao' e 'dataAtualizacao';


- disparo de excessões

'throw new Error()', deve ser usado em casos onde uma operação não pode ser realizada pelo consumidor:
    desativação de seu próprio cadastro; 
    usuário a ser editado não consta no sistema, etc.


- repositórios

não inserir string vazias e sim 'null'
