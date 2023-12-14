import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Invoice {
    id: number = 0;
    dataInvoice: Date = new Date;
    valor: number = '' as unknown as number;
    beneficiario_Id: number = undefined as unknown as number;
    instituicaoFinanceira_Id: number = undefined as unknown as number;
    banco_Id: number = undefined as unknown as number;
    codigoSwift: string = '';
    conta: number = 0;
    moeda_Id: number = undefined as unknown as number;
    contrato_Id: number = undefined as unknown as number;
}

export class Invoice_List {
    id: number = 0;
    dataInvoice: Date = new Date;
    cnpjBeneficiario: number = 0;
    valor: number = 0;
    nomeBeneficiario: string = '';
    nomeBanco: string = '';
}

export var invoiceColumns: Column[] = [
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
        field: 'dataInvoice',
        header: 'Data',
        maskType: MaskType.dateTime,
        filterType: FilterType.datetime,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: true,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'valor',
        header: 'Valor',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        decimal: '1.2',
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'nomeBanco',
        header: 'Banco',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'nomeBeneficiario',
        header: 'Beneficiario',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cnpjBeneficiario',
        header: 'CNPJ',
        maskType: MaskType.cnpj,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }
];