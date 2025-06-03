import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
    @IsNotEmpty()
    @IsNumber()
    carrinhoId: number;
}
