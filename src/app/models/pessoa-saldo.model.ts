
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class PessoaSaldo {
    id: number = 0;
    idEncrypted: string = '';
    dataConcessao: Date = '' as unknown as Date;
    valorConcedido: number = 0;
    cadastradoPor: string = '';
}
export class PessoaSaldoRequest {
    pessoa_Id: number = 0;
    valorConcedido: number = '' as unknown as number;
}

export var pessoaSaldoColumns: Column[] = [
    // {
    //     field: 'id',
    //     header: 'Id',
    //     maskType: MaskType.undefined,
    //     filterType: FilterType.text,
    //     filterDisplay: FilterDisplay.menu,
    //     filterShowAddButton: false,
    //     filterShowMatchMode: false,
    //     showOperator: false,
    //     filterMatchMode: FilterMatchMode.EQUALS,
    // },
    {
        field: 'valorConcedido',
        header: 'Valor Concedido',
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
        field: 'dataConcessao',
        header: 'Data de Concessão',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
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
