import { IsString, IsOptional } from 'class-validator';

export class UpdatePedidoDto {
    @IsOptional()
    @IsString()
    status?: string;
}
