import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {

    const carrinho = await this.prisma.carrinho.findUnique({
      where: { id: createPedidoDto.carrinhoId },
      include: { produtos: true }
    });

    if (!carrinho) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    if (carrinho.produtos.length === 0) {
      throw new NotFoundException('Carrinho está vazio');
    }

    // Calcula o valor total do pedido
    const valorTotal = carrinho.produtos.reduce((total, produto) => total + produto.preco, 0);

    // Cria o pedido e associa os produtos em uma única transação
    const pedido = await this.prisma.$transaction(async (tx) => {

      const novoPedido = await tx.pedido.create({
        data: {
          valorTotal,
          status: 'PENDENTE'
        }
      });

      // Atualiza os produtos para pertencerem ao pedido
      await tx.produto.updateMany({
        where: { carrinhoId: carrinho.id },
        data: { 
          carrinhoId: null,
          pedidoId: novoPedido.id
        }
      });

      return novoPedido;
    });

    // Retorna o pedido com os produtos
    return this.findOne(pedido.id);
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        produtos: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        produtos: true
      }
    });
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data: updatePedidoDto,
      include: {
        produtos: true
      }
    });
  }

  async remove(id: number) {
    // Primeiro, desassocia os produtos do pedido
    await this.prisma.produto.updateMany({
      where: { pedidoId: id },
      data: { pedidoId: null }
    });

    // Depois remove o pedido
    return this.prisma.pedido.delete({
      where: { id }
    });
  }
}
