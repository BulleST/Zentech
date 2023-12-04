
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class PessoaOperacaoList {
    id: number = 0;
    num_Op: number = '' as unknown as number;
    dataOperacao: Date = new Date;
    nomeCliente: string = '';
    cpfCliente: string = '';
    valorOperacao: number = 0;
    statusOperacao: string = '';
    chargeback: string = '';
    limiteConcedido: number = 0;
    limiteUtilizado: number = 0;
    limiteAtual: number = 0;
    cadastradaPor: string = '';
}

export class PessoaOperacaoRequest {
    id: number = 0;
    pessoa_Id: number = '' as unknown as number;
    data: Date = new Date;
    valor: number = '' as unknown as number;
    num_Op: number = '' as unknown as number;
    operacao_Status_Id: number = undefined as unknown as number;
    chargeback: boolean = false;
}

export class PessoaOperacaoStatus {
    id: number = 0;
    name: string = '';
}

export class PessoaOperacaoImportacao {
    id?: number;
    dataTransacao: Date = new Date;
    tipoCliente: string = '';
    nomeCliente: string = '';
    docCliente: string = '';
    nomeComprador: string = '';
    paisCompradorVendedor: string = '';
    moeda: string = '';
    tipoTransacao: string = '';
    formaPagamento: string = '';
    valorMoedaEstrangeira: string = '';
    valorMoedaNacional: string = '';
    statusOperacao: string = '';
    statusCadastro?: string;

    detalhes?: string;
    excel?: string;
    excelLinha?: number;
    sucesso?: boolean;
}

export var pessoaOperacaoColumns: Column[] = [

    {
        field: 'dataOperacao',
        header: 'Data da Operação',
        maskType: MaskType.dateTime,
        filterType: FilterType.datetime,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'num_Op',
        header: 'Nº Operação',
        maskType: MaskType.mask,
        mask: '0000',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'valorOperacao',
        header: 'Valor da Operação',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        decimal: '1.2',
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'statusOperacao',
        header: 'Status da Operação',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: 'Liberado', output: 'Liberado', class: 'flag-green' },
            { value: 'Bloqueado', output: 'Bloqueado', class: 'flag-danger' },
            { value: 'Chargeback', output: 'Chargeback', class: 'flag-warning' },
        ]
    },
    {
        field: 'cadastradaPor',
        header: 'Cadastrado Por',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
];


export var pessoaOperacaoAllColumns: Column[] = Object.assign([], pessoaOperacaoColumns);
pessoaOperacaoAllColumns.unshift(
    {
        field: 'nomeCliente',
        header: 'Nome',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cpfCliente',
        header: 'CPF',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
);
pessoaOperacaoAllColumns.splice(6, 0, 
    {
        field: 'limiteConcedido',
        header: 'Limite Concedido',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        decimal: '1.2',
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'limiteUtilizado',
        header: 'Limite Utilizado',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        decimal: '1.2',
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'limiteAtual',
        header: 'Limite Disponível',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        decimal: '1.2',
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    })