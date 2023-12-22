import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Moeda {
    id: number = 0;
    nome: string = '';
    simbolo: string = '';
    codigo: string = '';
}

export var moedaColumns: Column[] = [
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
        field: 'nome',
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
        field: 'simbolo',
        header: 'Símbolo',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'codigo',
        header: 'Código',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
]