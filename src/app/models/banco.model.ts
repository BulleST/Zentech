
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class BancoList {
    id: number = 0;
    nome: string = '';
    cidade: string = '';
    cep: string = '';
    numero: string = '';
    logradouro: string = '';
    pais: string = '';
    bairro: string = '';
    complemento: string = '';
    codigoSwift: string = '';
    estado: string = '';
}


export class BancoRequest {
    id: number = 0;
    nome: string = '';
    cidade:string = '';
    cep: number = '' as unknown as number;
    numero: string = '';
    logradouro: string = '';
    pais_Id:number = undefined as unknown as number;
    codigoSwift: string = '';
    bairro: string = '';
    complemento: string = '';
    estado: string = '';
}


export var bancoColumns: Column[] = [
    {
        field: 'nome',
        header: 'Nome',
        maskType: MaskType.undefined,
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
    {
        field: 'estado',
        header: 'UF',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pais',
        header: 'País',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
];

