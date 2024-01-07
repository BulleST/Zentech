
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class LogList {
    id: number = 0;
    data: Date = new Date;
    acao: string = '';
    objeto: string = '';
    entidade: string = '';
    usuarioNome: string = '';
    usuarioEmail: string = '';
    usuario_Id: 0;
}


export class LogRequest {
    id: number = 0;
    inputs: { key: string; value: unknown; class: string }[] = [];
    data: Date = new Date;
    acao: string = '';

    objeto: string = '';
    entidade: string = '';
    usuarioNome: string = '';
    usuarioEmail: string = '';
    usuario_Id: number = undefined as unknown as number;;
}




export var logColumns: Column[] = [
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
        field: 'data',
        header: 'Data',
        maskType: MaskType.dateTime,
        filterType: FilterType.datetime,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'entidade',
        header: 'Entidade',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'acao',
        header: 'Ação',
        maskType: MaskType.options,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        values: [
            { value: 'Cadastro', output: 'Cadastro', class: 'flag-green' },
            { value: 'Exclusão', output: 'Exclusão', class: 'flag-danger' },
            { value: 'Edição', output: 'Edição', class: 'flag-warning' },
            { value: 'Reset de Senha', output: 'Reset de Senha', class: 'flag-dark' },
            { value: 'Desabilitar Conta', output: 'Desabilitar Conta', class: 'flag-dark' },
            { value: 'Habilitar Conta', output: 'Habilitar Conta', class: 'flag-dark' },
            { value: 'Cadastro de Nova senha', output: 'Cadastro de Nova senha', class: 'flag-dark' },
            { value: 'BR Consulta', output: 'BR Consulta', class: 'flag-dark' },
            { value: 'Atribuição', output: 'Atribuição', class: 'flag-dark' },
            { value: 'Importação', output: 'Importação', class: 'flag-dark' },
            { value: 'Importação de Operações', output: 'Importação de Operações', class: 'flag-dark' },
            { value: 'Importação de Pessoas', output: 'Importação de Pessoas', class: 'flag-dark' },
            { value: 'Verificação de Conta', output: 'Verificação de Conta', class: 'flag-dark' },
            { value: 'Esqueci minha senha', output: 'Esqueci minha senha', class: 'flag-dark' },
        ]
    },
    {
        field: 'usuarioNome',
        header: 'Nome',
        colgroup: 'Usuário',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'usuarioEmail',
        header: 'E-mail',
        colgroup: 'Usuário',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        showAddButton: false,
        showMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },

];

