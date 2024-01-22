import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Contrato {
    id: number = 0;
    evento_Id: number = '' as unknown as number;
    tipo_Id: number = '' as unknown as number;
    invoice_Id: number = '' as unknown as number;
    data: Date = new Date;
    dataLiquidacao: Date = '' as unknown as Date;
    taxa: number = '' as unknown as number;
    valorNacional: number = '' as unknown as number;
    numContrato: string = '';
    paisPagRecExterior?: number = '' as unknown as number; // Pais do Pagador/Recebedor no exterior
    pagRecExterior?: string = ''; // Pagador/Recebedor no exterior
    percentualAdiantamento?: number = '' as unknown as number;
    vet?: number = '' as unknown as number;
    rde?: string;
    clausulas: string = '';
    especificacoes: string = '';
    instrucoesRecebimentoPagamento: string = '';
    descricaoNaturezaFato?: string = 'Serviço de pagamento ou transferência internacional (eFX) - Aquisição de bens';
    descricaoFormaEntrega?: string = '65 - Teletransmissão';
    codigoNatureza?: number = '3405209N0590' as unknown as number ;
    codigoVinculoPagRecExterior?: string = '50-Demais';

    constructor(model?: Contrato) {
        this.descricaoNaturezaFato = 'Serviço de pagamento ou transferência internacional (eFX) - Aquisição de bens';
        this.descricaoFormaEntrega = '65 - Teletransmissão';
        this.codigoNatureza = '3405209N0590' as unknown as number ;
        this.codigoVinculoPagRecExterior = '50-Demais';
        if (model) {
            this.id = model.id;
            this.evento_Id = model.evento_Id;
            this.tipo_Id = model.tipo_Id;
            this.invoice_Id = model.invoice_Id;
            this.data = model.data;
            this.dataLiquidacao = model.dataLiquidacao;
            this.taxa = model.taxa;
            this.valorNacional = model.valorNacional;
            this.numContrato = model.numContrato;
            this.paisPagRecExterior = model.paisPagRecExterior;
            this.pagRecExterior = model.pagRecExterior;
            this.percentualAdiantamento = model.percentualAdiantamento;
            this.vet = model.vet;
            this.rde = model.rde;
            this.clausulas = model.clausulas;
            this.especificacoes = model.especificacoes;
            this.instrucoesRecebimentoPagamento = model.instrucoesRecebimentoPagamento;
        }
    }
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
    beneficiario: string = '';
    banco: string = '';

}

export var contratoColumns: Column[] = [

    {
        field: 'numContrato',
        header: 'Nº',
        maskType: MaskType.mask,
        mask: '0*', // Só funciona com o MaskType.mask
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
  
    {
        field: 'data',
        header: 'Data',
        maskType: MaskType.date,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'instituicao',
        header: 'Instituição',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'banco',
        header: 'Banco',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'taxa',
        header: 'Taxa',
        maskType: MaskType.number,
        decimal: '1.0-10',
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'valorNacional',
        header: 'Valor Nacional',
        maskType: MaskType.number,
        decimal: '1.2',
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'dataLiquidacao',
        header: 'Data de Liquidação',
        maskType: MaskType.date,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'beneficiario',
        header: 'Pagador/Recebedor no Exterior',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'pais',
        header: 'País do Pagador/Recebedor no Exterior',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'percentualAdiantamento',
        header: 'Percentual de Adiantamento',
        maskType: MaskType.percentage,
        decimal: '1.2',
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'tipo',
        header: 'Tipo',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: 'Compra', output: 'Compra', class: 'flag-dark' },
            { value: 'Venda', output: 'Venda', class: 'flag-yellow' },
        ]

    },
    {
        field: 'evento',
        header: 'Evento',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: 'Contratação', output: 'Contratação', class: 'flag-green' },
            { value: 'Cancelamento', output: 'Cancelamento', class: 'flag-danger' },
            { value: 'Alteração', output: 'Alteração', class: 'flag-warning' },
        ]
    },
];

