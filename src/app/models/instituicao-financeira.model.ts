
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class InstituicaoFinanceiraList {
    id: number = 0;
    nome: string = '';
    cnpj: number = 0;
    cidade: string = '';
    estado: string = '';
    pais: string = '';
}

export class InstituicaoFinanceiraRequest {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    logradouro: string = '';
    numero: string = '';
    cep: number = '' as unknown as number;
    bairro: string = '';
    complemento: string = '';
    cidade:string = '';
    estado: string = '';
    pais_Id: number = undefined as unknown as number;
}

export var instituicaoFinanceiraColumns: Column[] = [

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
        field: 'cnpj',
        header: 'CNPJ',
        maskType: MaskType.cnpj,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'cidade',
        header: 'Cidade',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'estado',
        header: 'UF',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'pais',
        header: 'País',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },

];

