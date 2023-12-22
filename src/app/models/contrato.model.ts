import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Contrato {
    id: number = 0;
    tipo_Id: number = '' as unknown as number;
    numContrato: string = '';
    evento_Id: number = '' as unknown as number;
    data: string = '';
    instituicaoFinanceira_Id: number = '' as unknown as number;
    taxa: number = '' as unknown as number;
    valorNacional: number = '' as unknown as number;
    dataLiquidacao: string = '';
    pagRecExterior: string = '';
    pais_Id: number = '' as unknown as number;
    percentualAdiantamento: number = '' as unknown as number;
    invoice_Id: number = '' as unknown as number;
    especificacoes: string = '';
    clausulas: string = '';
    instrucoesRecebimentoPagamento: string = '';
}



export class Contrato_List {
    id: number = 0;
    tipo: string = '';
    numContrato: string = '';
    evento: string = '';
    data: string = '';
    instituicao: string = '';
    taxa: number = 0;
    valorNacional: number = 0;
    dataLiquidacao: string = '';
    pagRecExterior: string = '';
    pais: string = '';
    percentualAdiantamento: number = 0;
    invoice_Id: number = 0;
    especificacoes: string = '';
    clausulas: string = '';
    instrucoesRecebimentoPagamento: string = '';

}

export class ContratoResponse {
    nome: string = '';
    cpf: number = '' as unknown as number;
    sucesso: boolean = true;
    detalhes: string = '';
}

export class ContratoStatus {
    id: number = 0;
    name: string = '';
}

export var contratoColumns: Column[] = [

    {

        field: 'tipo',
        header: 'Tipo',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,

    },
    {
        field: 'numContrato',
        header: 'Número do contrato',
        maskType: MaskType.mask,
        mask: '0#',// Só funciona com o MaskType.mask
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'evento',
        header: 'Evento',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'data',
        header: 'Data',
        maskType: MaskType.dateTime,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'instituicao',
        header: 'Instituição',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'taxa',
        header: 'Taxa',
        maskType: MaskType.mask,
        mask: '0#', // Só funciona com o MaskType.mask
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'valorNacional',
        header: 'Valor Nacional',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'dataLiquidacao',
        header: 'Data de Liquidação',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pagRecExterior',
        header: 'Pagador/Recebedor no Exterior',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pais',
        header: 'País',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'percentualAdiantamento',
        header: 'Percentual de Adiantamento',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
];

