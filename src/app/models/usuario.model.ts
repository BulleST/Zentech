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
    },
    {
        field: 'name',
        header: 'Nome',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.substring,
        substringLength: 22,
    },
    {
        field: 'email',
        header: 'E-mail',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.substring,
        substringLength: 30,
    },
    {
        field: 'telefoneCelular',
        header: 'Telefone/Celular',
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        maskType: MaskType.telefoneCelular,
    },
    {
        field: 'perfilAcesso.perfil',
        header: 'Tipo de Acesso',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
    },
    {
        field: 'ativo',
        header: 'Ativo',
        maskType: MaskType.boolean,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
        booleanValues: {
            'true': 'ativo',
            'false': 'inativo',
        }
    },
];
