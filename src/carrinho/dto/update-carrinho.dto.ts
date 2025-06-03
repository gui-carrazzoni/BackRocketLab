import { IsArray, IsOptional, IsNumber } from 'class-validator';

export class UpdateCarrinhoDto {
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    produtoIds?: number[];  // IDs dos produtos que devem estar no carrinho

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    removerProdutoIds?: number[];  // IDs dos produtos a serem removidos

    @IsOptional()
    limpar?: boolean;  // Se true, remove todos os produtos do carrinho
}
