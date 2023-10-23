import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { FilterMatchMode } from "primeng/api";

export class PessoaList {
    id: number = 0;
    nome: string = '';
    cpf: string = '';
    saldo: string = '';
    inclusao: Date = '' as unknown as Date;
    status: boolean = false;
}

export class PessoaRequest {
    nome: string = '';
    cpf: number = '' as unknown as number;
    telefone: number = '' as unknown as number;
    email: string = '';
    dataNascimento: Date = '' as unknown as Date;
    nomeMae: string = '';
    obs?: string;
}
export class PessoaRequestMany {
    id: number = 0;
    cpf: string = '';
    nome: string = '';
    dataNascimento: string = '';
    situacao: string = '';
    dataInscricao: string = '';
    digito: string = '';
    controle: string = '';
    anoObito: string = '';
    status: string = '';
    dataCap: string = '';
    horaCap: string = '';
    idNum: string = '';
    tipoErro: string = '';
    isDuplicate = true;
    isValid = true;
}


export var pessoaColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'nome',
        header: 'Nome',
        maskType: MaskType.substring,
        substringLength: 22,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cpf',
        header: 'CPF',
        maskType: MaskType.cpf,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'saldo',
        header: 'Saldo',
        maskType: MaskType.money,
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'inclusao',
        header: 'Inclusão',
        maskType: MaskType.date,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'status',
        header: 'Status',
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