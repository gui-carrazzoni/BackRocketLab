# RocketLab Backend

API REST desenvolvida com NestJS para gerenciamento de produtos e carrinho de compras.

## Requisitos

- Node.js (versão 16 ou superior)
- pnpm (ou npm/yarn)

## Setup do Projeto

1. Clone o repositório:
```bash
git clone [https://github.com/gui-carrazzoni/BackRocketLab]
cd back-rocket-lab
```

2. Instale as dependências:
```bash
pnpm install
```

3. Setup do Banco de Dados (Prisma):

a. Crie o arquivo `.env` com a configuração do banco:
```bash
echo 'DATABASE_URL="file:./db.sqlite"' > .env
```

b. Gere o cliente Prisma:
```bash
npx prisma generate
```

c. Crie e aplique as migrações do banco:
```bash
npx prisma migrate dev --name init
```

Este último comando vai:
- Criar o banco de dados SQLite
- Criar as tabelas necessárias
- Gerar o cliente Prisma atualizado

4. Inicie o servidor:
```bash
pnpm run start:dev
```

O servidor estará rodando em `http://localhost:3000`

## Comandos Úteis do Prisma

- `npx prisma studio` - Abre interface visual para gerenciar o banco
- `npx prisma migrate reset` - Reseta o banco (apaga todos os dados)
- `npx prisma generate` - Atualiza o cliente após mudanças no schema
- `npx prisma migrate dev` - Aplica novas migrações em desenvolvimento

## Endpoints Disponíveis

### Produtos

- `GET /produto` - Lista todos os produtos
- `GET /produto/:id` - Busca produto por ID
- `GET /produto/buscar/:termo` - Busca produtos por nome ou categoria
- `POST /produto` - Cria novo produto
- `PATCH /produto/:id` - Atualiza produto
- `DELETE /produto/:id` - Remove produto

### Carrinho

- `POST /carrinho` - Cria carrinho vazio
- `POST /carrinho/novo-com-produto` - Cria carrinho com produto
- `GET /carrinho` - Lista todos os carrinhos
- `GET /carrinho/:id` - Busca carrinho por ID
- `PATCH /carrinho/:id` - Atualiza carrinho (adiciona/remove produtos)
- `DELETE /carrinho/:id` - Remove carrinho

### Pedidos

- `POST /pedido` - Cria pedido a partir de um carrinho
- `GET /pedido` - Lista todos os pedidos
- `GET /pedido/:id` - Busca pedido por ID
- `PATCH /pedido/:id` - Atualiza status do pedido
- `DELETE /pedido/:id` - Remove pedido

## Exemplos de Uso

### Criar um Produto
```http
POST /produto
{
    "nome": "Geladeira Frost Free",
    "preco": 2999.99,
    "categoria": "Eletrodomésticos",
    "descricao": "Geladeira moderna com tecnologia frost free"
}
```

### Adicionar ao Carrinho
```http
PATCH /carrinho/1
{
    "produtoIds": [1]
}
```

### Finalizar Compra
```http
POST /pedido
{
    "carrinhoId": 1
}
```

## Scripts Disponíveis

- `pnpm run start:dev` - Inicia o servidor em modo desenvolvimento
- `pnpm run build` - Compila o projeto
- `pnpm run start` - Inicia o servidor em modo produção
- `pnpm run test` - Executa os testes

## Tecnologias Utilizadas

- NestJS
- Prisma
- SQLite
- TypeScript
