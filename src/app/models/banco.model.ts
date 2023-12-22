
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class BancoList {
    id: number = 0;
    nome: string = '';
    cidade: string = '';
    cep: string = '';
    numero: string = '';
    logradouro: string = ''
}


export class BancoRequest {
    id: number = 0;
    nome: string = '';
    cidade_Id: number = undefined as unknown as number;
    cep: string = '';
    numero: string = '';
    logradouro: string = ''

}


export var bancoColumns: Column[] = [
    {
        field: 'nome',
        header: 'Nome',
        maskType: MaskType.undefined, // colocar mask para cep e cnpj
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,

    },
    {
        field: 'cidade',
        header: 'Cidade',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
];

