
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class LogList {
    id: number = 0;
    data: Date = new Date;
    acao: string = '';
    objeto: string = '';
    entidade: string = '';
    usuarioNome: string = '';
    usuarioEmail: string = '';
    usuario_Id: 0;
}


export class LogRequest {
    id: number = 0;
    inputs: { key: string; value: unknown; class: string }[] = [];
    data: Date = new Date;
    acao: string = '';

    objeto: string = '';
    entidade: string = '';
    usuarioNome: string = '';
    usuarioEmail: string = '';
    usuario_Id: number = undefined as unknown as number;;
}




export var logColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'data',
        header: 'Data',
        maskType: MaskType.dateTime,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'acao',
        header: 'Ação',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'entidade',
        header: 'Entidade',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'usuarioNome',
        header: 'Nome',
        colgroup: 'Usuário',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'usuarioEmail',
        header: 'E-mail',
        colgroup: 'Usuário',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },

];

