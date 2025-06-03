import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProdutoDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsNumber()
    preco: number;

    @IsNotEmpty()
    @IsString()
    categoria: string;

    @IsOptional()
    @IsString()
    descricao?: string;
}
