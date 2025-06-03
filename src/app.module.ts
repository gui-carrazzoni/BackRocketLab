import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { PrismaModule } from './prisma/prisma.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    PrismaModule,
    ProdutoModule,
    CarrinhoModule,
    PedidoModule
  ],
})
export class AppModule {}
