
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class Empresa {
    id: number = 0;
    nome: string = '';
    logoDataUri: string = '';
    endereco: string = ''
    codigoRegistro: string = '';
    socioDiretor: string = '';
    rgSocioDiretor: string = '';
    cpfSocioDiretor: string = '';
}

export var empresaColumns: Column[] = [
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
    {
        field: 'logoDataUri',
        header: 'Logo',
        maskType: MaskType.imageUrl,
        filterType: FilterType.none,
        filterDisplay: FilterDisplay.none,
        sort: false,
    },
];

