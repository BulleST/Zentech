import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { Contrato } from "./contrato.model";

export class Invoice {
    id: number = 0;
    data: Date = new Date;
    moeda_Id: number = undefined as unknown as number;
    valor: number = '' as unknown as number;
    instituicaoFinanceira_Id: number = undefined as unknown as number;
    beneficiario_Id: number = undefined as unknown as number;
    conta: string = '';
}

export class Invoice_List {
    id: number = 0;
    data: Date = new Date;
    cnpjBeneficiario: number = 0;
    valor: number = 0;
    nomeBeneficiario: string = '';
    nomeBanco: string = '';
    filter: string = '';
    conta: string = '';
    empresa_Id: number = 0;
}


export class InvoiceRequest {
    invoice: Invoice = new Invoice;
    contrato: Contrato = new Contrato();
}

export var invoiceColumns: Column[] = [
    {
        field: 'id',
        header: 'Nº Invoice',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'data',
        header: 'Data Invoice',
        maskType: MaskType.dateTime,
        filterType: FilterType.date,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'valor',
        header: 'Valor',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        decimal: '1.2',
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'nomeBanco',
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
        field: 'nomeBeneficiario',
        header: 'Beneficiario',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'representante',
        header: 'Representante',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'conta',
        header: 'Conta',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
];
