import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Invoice {
    id: number = 0;
    dataInvoice: Date = new Date;
    valor: number = 0;
    beneficiario_Id: number = 0;
    banco_Id: number = 0;
    swift: string = '';
    conta: number = 0;
    instituicaoFinanceira_Id: number = 0;
    moeda_Id: number = 0;
}

export class Invoice_List {
    id: number = 0;
    dataInvoice: Date = new Date;
    valor: number = 0;
    banco: string = '';
    swift: string = '';
    conta: number = 0;
    instituicaoFinanceira: string = '';
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
        field: 'banco',
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
        field: 'beneficiario',
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
        field: 'instituicaoFinanceira',
        header: 'Instituição Financeira',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }
];