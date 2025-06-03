import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddProdutoDto {
    @IsNotEmpty()
    @IsNumber()
    produtoId: number;
} 