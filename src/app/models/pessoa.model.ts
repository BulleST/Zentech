import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";
import { FilterMatchMode } from "primeng/api";

export class PessoaList {
    id: number = 0;
    idEncrypted?: string = '';
    nome: string = '';
    cpf: string = '';
    saldo: number = 0;
    inclusao: Date = '' as unknown as Date;
    status: boolean = false;

    filterConcat?: string = '';
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

export class PessoaRelatorio {
    id: number = 0;
    nome: string = '';
    cpf: number = 0;
    dataOperacao: Date = new Date;
    valorOperacao: number = 0;
    valorOperacaoMoeda: string = '';
    limiteAtribuido: number = 0;
    limiteAtribuidoMoeda: string = '';
    limiteConsumido: number = 0;
    limiteConsumidoMoeda: string = '';
    saldoLimite: number = 0;
    saldoLimiteMoeda: string = '';
    chargeBack: boolean = false;
    status: string = '';
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
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
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
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cpf',
        header: 'CPF',
        maskType: MaskType.cpf,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'saldo',
        header: 'Saldo',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        decimal: '1.2',
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'inclusao',
        header: 'Inclusão',
        maskType: MaskType.date,
        filterType: FilterType.date,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'status',
        header: 'Status',
        maskType: MaskType.boolean,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
        booleanValues: {
            'true': 'ativo',
            'false': 'inativo',
        }
    }, 
];