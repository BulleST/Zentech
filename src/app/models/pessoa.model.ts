import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Pessoa {
    id: number = 0;
    nome: string = '';
    cpf: number = 0;
    situacao: string = '';
    dataInscricao: Date = new Date;
    digito: string = '';
    dataNascimento: Date = new Date;
    nomeMae: string = '';
    anoObito: number = 0;
    telefone: string = '';
    email: string = '';
    obs: string = '';
    excel_Status: string = '';
    excel_Data_Cap: Date = new Date;
    excel_Hora_Cap: Date = new Date;
    excel_IdNum: string = '';
    excel_Controle: string = '';
    excel_Erro: string = '';
    brConsulta_Status: string = '';
    brConsulta_Data_Cap: Date = new Date;
    brConsulta_Hora_Cap: Date = new Date;
    brConsulta_Id_Consulta: string = '';
    brConsulta_Controle: string = '';
    brConsulta_Erro: string = '';
    saldoAtual: number = 0;
    dataCadastro: Date = new Date;
    cadastradoPor: string = '';
    dataAtualizacaoExcel: Date = new Date;
    dataAtualizacaoBRConsulta: Date = new Date;
}

export class PessoaList {
    id: number = 0;
    nome: string = '';
    cpf: string = '';
    saldoAtual: number = 0;
    dataCadastro: Date = '' as unknown as Date;
    situacao: string = '';
    filterConcat?: string = '';
}

export class PessoaFormulario {
    nome: string = '';
    cpf: string = '';
    dataNascimento: Date = '' as unknown as Date;
    nomeMae: string = '';
    email: string = '';
    obs: string = '';
}

export class PessoaImportacao {
    id: number = 0;
    nome: string = '';
    cpf: string = '';
    dataNascimento: Date = '' as unknown as Date;
    situacao: string = '';
    dataInscricao:  Date = '' as unknown as Date;
    digito: string = '';
    anoObito: string = '';
    excel_Status: string = '';
    excel_Data_Cap: Date = '' as unknown as Date;
    excel_Hora_Cap: Date = '' as unknown as Date;
    excel_IdNum: string = '';
    excel_Controle: string = '';
    excel_Erro: string = '';

    isDuplicate? = true;
    isValid? = true;
    detalhes? = '';
    sucesso? = true;
}

export class PessoaResponse {
    nome: string = '';
    cpf: number = '' as unknown as number;
    sucesso: boolean = true;
    detalhes: string = '';
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
        maskType: MaskType.undefined,
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
        field: 'saldoAtual',
        header: 'Saldo Atual',
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
        field: 'dataCadastro',
        header: 'Data de Cadastro',
        maskType: MaskType.date,
        filterType: FilterType.date,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'situacao',
        header: 'Situação',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    }, 
];