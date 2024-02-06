
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class BeneficiarioList {
    id: number = 0;
    nome: string = '';
    estado: string = '';
    cidade: string = '';
    logradouro: string = '';
    conta: string = '';
    representante: string = '';
    codigoSwift: string = '';
    nomeBanco: string = '';
    nomePais: string = '';
    codigoRegistro: string = '';
    empresa_Id: number = 0;
}

export class BeneficiarioRequest {
    id: number = 0;
    nome: string = '';
    codigoRegistro: string = '';
    cep:  number = '' as unknown as number;
    cidade: string = '';
    estado: string = '';
    logradouro: string = '';
    numero: string = '';
    codigoSwift: string = '';
    conta: string = '';
    complemento: string = '';
    bairro: string = ''
    banco_Id: number = undefined as unknown as number;
    pais_Id:number = undefined as unknown as number;
    representante_Id: number = undefined as unknown as number;
    empresa_Id: number = 0;
    nomeRepresentanteLegal?: string;
    codigoRepresentanteLegal?: string;
    assinaturaRepresentanteLegal?: string;
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
        field: 'codigoRegistro',
        header: 'Código de Registro',
        // maskType: MaskType.cnpj,
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
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
];

