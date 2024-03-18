
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class Representante {
    id: number = 0;
    nome: string = '';
    codigo: string = '';
    empresa_Id: number = 0;
}

export var representanteColumns: Column[] = [
    {
        field: 'codigo',
        header: 'Código',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'nome',
        header: 'Nome',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
];

