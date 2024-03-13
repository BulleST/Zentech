
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

import { PerfilAcesso } from "./account-perfil.model";
export class Empresa {
    id: number = 0;
    nome: string = '';
    logoDataUri: string = '';
    endereco: string = ''
    codigoRegistro: string = '';
    socioDiretor: string = '';
    rgSocioDiretor: string = '';
    cpfSocioDiretor: string = '';
    dataDesativado?: Date;
    ativo?: boolean;
    perfilAcesso_Id: number = undefined as unknown as number;
    perfilAcesso: PerfilAcesso = undefined as unknown as PerfilAcesso;
    primaryColor: string = '#ffc107';
    secundaryColor: string = '#3b3b47';
    cidade: string = '';
    uf: string = '';
    pais_Id: number = 0;
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
        field: 'codigoRegistro',
        header: 'Código do registro',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'socioDiretor',
        header: 'Sócio/Diretor',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'ativo',
        header: 'Ativo',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: true, output: 'Ativo', class: 'flag-green' },
            { value: false, output: 'Inativo', class: 'flag-danger' },
        ]
    },
    // {
    //     field: 'logoDataUri',
    //     header: 'Logo',
    //     maskType: MaskType.imageUrl,
    //     filterType: FilterType.none,
    //     filterDisplay: FilterDisplay.none,
    //     sort: false,
    // },

];

