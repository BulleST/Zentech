
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Contrato {
  id: number = 0;
  tipo_Id: number = '' as unknown as number;
  numContrato: string = '';
  evento_Id: number = '' as unknown as number;
  data: string = '';
  instituicaoFinanceira_Id: number = '' as unknown as number;
  taxa: number = '' as unknown as number;
  valorNacional: number = '' as unknown as number;
  dataLiquidacao: string = '';
  pagRecExterior: string = '';
  pais_Id: number = '' as unknown as number;
  percentualAdiantamento: number = '' as unknown as number;
}



export class ContratoList {
  id: number = 0;
  tipo: string = '';
  numContrato: string = '';
  evento: string = '';
  data: string = '';
  instituicao: string = '';
  taxa: number = 0;
  valorNacional: number = 0;
  dataLiquidacao: string = '';
  pagRecExterior: string = '';
  pais: string = '';
  percentualAdiantamento: number = 0;

}



export class ContratoRequest {
  id: number = 0;
  tipo_Id: number = '' as unknown as number;
  numContrato: string = '';
  evento_Id: number = '' as unknown as number;
  data: string = '';
  instituicaoFinanceira_Id: number = '' as unknown as number;
  taxa: number = '' as unknown as number;
  valorNacional: number = '' as unknown as number;
  dataLiquidacao: string = '';
  pagRecExterior: string = '';
  pais_Id: number = '' as unknown as number;
  percentualAdiantamento: number = '' as unknown as number;


}


export class ContratoResponse {
  nome: string = '';
  cpf: number = '' as unknown as number;
  sucesso: boolean = true;
  detalhes: string = '';
}

export class ContratoStatus {
  id: number = 0;
  name: string = '';
}

export var contratoColumns: Column[] = [

  {

    field: 'nomeInstituicao',
    header: 'Nome',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: true,
    filterShowMatchMode: true,
    showOperator: false,
    filterMatchMode: FilterMatchMode.CONTAINS,

  },
  {
    field: 'cnpj',
    header: 'CNPJ',
    maskType: MaskType.cnpj,
    mask: '0000',
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'nomeCidade',
    header: 'Cidade',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'uf',
    header: 'UF',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'logradouro',
    header: 'Logradouro',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'numero',
    header: 'Número',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'cep',
    header: 'CEP',
    maskType: MaskType.cep,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },





];

