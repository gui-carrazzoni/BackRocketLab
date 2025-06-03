export class Produto {
    id: number;
    nome: string;
    preco: number;
    categoria: string;
    descricao?: string;
    carrinhoId?: number;
    carrinho?: any;
}