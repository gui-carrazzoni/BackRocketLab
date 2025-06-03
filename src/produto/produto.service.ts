import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  create(createProdutoDto: CreateProdutoDto) {
    return this.prisma.produto.create({
      data: createProdutoDto,
    });
  }

  findAll() {
    return this.prisma.produto.findMany({
      include: {
        carrinho: true,
      },
    });
  }

  findOneId(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: {
        carrinho: true,
      },
    });
  }

  findOneCategoriaOrNome(busca: string) {
    const termoBusca = busca.toLowerCase();
    return this.prisma.produto.findMany({
      where: {
        OR: [
          {
            categoria: {
              contains: termoBusca
            }
          },
          {
            nome: {
              contains: termoBusca
            }
          }
        ]
      },
      include: {
        carrinho: true,
      },
    });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  remove(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}
