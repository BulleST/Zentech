
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class BeneficiarioList {
    id: number = 0;
    nome: string = '';
    cep: string = '';
    estado: string = '';
    cidade: string = '';
    logradouro: string = '';
    numero: string = '';
    codigoSwift: string = '';
    conta: string = '';
    representante: string = '';
    cnpj: number = 0;
    nomeBanco: string = '';
    nomePais: string = '';
    complemento: string = '';
    bairro: string = ''
}

export class BeneficiarioRequest {
    id: number = 0;
    nome: string = '';
    cnpj: number = '' as unknown as number;
    cep:  number = '' as unknown as number;
    cidade: string = '';
    estado: string = '';
    logradouro: string = '';
    numero: string = '';
    codigoSwift: string = '';
    banco_Id: number = undefined as unknown as number;
    conta: string = '';
    pais_Id:number = undefined as unknown as number;
    representante: string = '';
    complemento: string = '';
    bairro: string = ''
}

export var beneficiarioColumns: Column[] = [
    {

        field: 'nome',
        header: 'Nome',
        maskType: MaskType.undefined, // colocar mask para cep e cnpj
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
        field: 'representante',
        header: 'Representante',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'codigoSwift',
        header: 'Código Swift',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'nomeBanco',
        header: 'Banco',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'conta',
        header: 'Conta',
        maskType: MaskType.undefined,
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
        filterMatchMode: FilterMatchMode.EQUALS,
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
        field: 'nomePais',
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

