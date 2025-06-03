import { Injectable } from '@nestjs/common';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarrinhoService {
  constructor(private prisma: PrismaService) {}

  create(createCarrinhoDto: CreateCarrinhoDto) {

    // Cria um novo carrinho sem produtos
    return this.prisma.carrinho.create({
      data: createCarrinhoDto,
      include: {
        produtos: true,
      },
    });
  }

  findAll() {
    return this.prisma.carrinho.findMany({
      include: {
        produtos: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.carrinho.findUnique({
      where: { id },
      include: {
        produtos: true,
      },
    });
  }

  async update(id: number, updateCarrinhoDto: UpdateCarrinhoDto) {
    // Remove todos os produtos
    if (updateCarrinhoDto.limpar) {
      await this.prisma.produto.updateMany({
        where: { carrinhoId: id },
        data: { carrinhoId: null }
      });
      return this.findOne(id);
    }

    // Remove produtos específicos
    if (updateCarrinhoDto.removerProdutoIds && updateCarrinhoDto.removerProdutoIds.length > 0) {
      await this.prisma.produto.updateMany({
        where: { 
          id: { in: updateCarrinhoDto.removerProdutoIds },
          carrinhoId: id
        },
        data: { carrinhoId: null }
      });
    }

    // Adiciona novos produtos
    if (updateCarrinhoDto.produtoIds && updateCarrinhoDto.produtoIds.length > 0) {
      await this.prisma.produto.updateMany({
        where: { id: { in: updateCarrinhoDto.produtoIds } },
        data: { carrinhoId: id }
      });
    }

    // Retorna o carrinho atualizado
    return this.findOne(id);
  }

  remove(id: number) {
    return this.prisma.carrinho.delete({
      where: { id },
    });
  }

  async createWithProduct(produtoId: number) {

    const produto = await this.prisma.produto.findUnique({
      where: { id: produtoId }
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    // Cria um novo carrinho
    const carrinho = await this.prisma.carrinho.create({
      data: {}
    });

    // Atualiza o produto para associá-lo ao carrinho
    await this.prisma.produto.update({
      where: { id: produtoId },
      data: { carrinhoId: carrinho.id }
    });

    // Retorna o carrinho com o produto
    return this.findOne(carrinho.id);
  }
}
