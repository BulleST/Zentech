import { PerfilAcesso } from "./account-perfil.model";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { FilterMatchMode } from "primeng/api";

export class Usuario {
    id: number = 0;
    perfilAcesso: PerfilAcesso = undefined as unknown as PerfilAcesso;
    perfilAcesso_Id: number = undefined as unknown as number;
    name: string = '';
    email: string = '';
    telefoneCelular: string = '';
    dataDesativado?: Date;
    ativo?: boolean;
    empresa_Id: number = 0;
}

export class UsuarioRequest {
    id: number = 0;
    empresa_Id: number = 0
    perfilAcesso_Id: number = undefined as unknown as number;
    name: string = '';
    email: string = '';
    telefoneCelular: string = '';
    dataDesativado?: Date;
    ativo?: boolean;
}


export var userColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'name',
        header: 'Nome',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.substring,
        substringLength: 22,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'email',
        header: 'E-mail',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.substring,
        substringLength: 30,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'telefoneCelular',
        header: 'Telefone/Celular',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.undefined,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'perfilAcesso.perfil',
        header: 'Tipo de Acesso',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: 'Admin', output: 'Admin', class: 'flag-yellow' },
            { value: 'Master', output: 'Master', class: 'flag-info' },
        ]
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
];
