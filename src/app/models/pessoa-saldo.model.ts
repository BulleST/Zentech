
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class PessoaSaldo {
    id: number = 0;
    idEncrypted: string = '';
    dataConcessao: Date = '' as unknown as Date;
    valorConcedido: number = 0;
    usuarioCadastroNome: string = '';
    usuarioCadastroEmail: string = '';
}
export class PessoaSaldoRequest {
    pessoa_Id: number = 0;
    valorConcedido: number = '' as unknown as number;
}

export var pessoaSaldoColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },

    {
        field: 'dataConcessao',
        header: 'Data de Concessão',
        maskType: MaskType.dateTime,
        filterType: FilterType.datetime,
        filterDisplay: FilterDisplay.menu,
        showAddButton: true,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'valorConcedido',
        header: 'Valor Concedido',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        decimal: '1.2',
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'usuarioCadastroEmail',
        header: 'Cadastrado Por',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
];
