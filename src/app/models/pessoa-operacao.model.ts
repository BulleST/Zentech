
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class PessoaOperacao {
    id: number = 0;
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
    pessoa_Id: number = 0;
    data: Date = new Date;
    valor: number = '' as unknown as number;
    operacao_Status_Id: number = undefined as unknown as number;
    chargeback: boolean = false;
}

export class PessoaOperacaoStatus {
    id: number = 0;
    name: string = '';
}

export var pessoaOperacaoColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
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
        maskType: MaskType.cpf,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'dataOperacao',
        header: 'Data',
        maskType: MaskType.dateTime,
        filterType: FilterType.datetime,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'valorOperacao',
        header: 'Valor',
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
        header: 'Status',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'chargeback',
        header: 'ChargeBack',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'valorOperacao',
        header: 'Valor',
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
        header: 'Limite Atual',
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
        field: 'cadastradoPor',
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
