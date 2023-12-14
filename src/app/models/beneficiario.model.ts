
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";




export class BeneficiarioList {
  id: number = 0;
  nome: string = '';
  cep: string = '';
  uf: string = '';
  cidade: string = '';
  logradouro: string = '';
  numero: string = '';
  codigoSwift: string = '';
  conta: string = '';
  representante: string = '';
  cnpj: number= 0;
  nomeBanco: string = '';
  nomePais: string = '';
}




export class BeneficiarioRequest {
  id: number = 0;
  nome: string = '';
  cnpj:  number = undefined as unknown as number;
  cep: string = '';
  cidade_Id: number = undefined as unknown as number;
  logradouro: string = '';
  numero: string = '';
  codigoSwift: string = '';
  banco_Id:  number = undefined as unknown as number;
  conta: string = '';
  pais_Id:  number = undefined as unknown as number;
  representante: string = '';


}


// export class BeneficiarioResponse {
//   id: number = 0;
//   nome: string = '';
//   cidade_Id: string =  '';
//   cep: string = '';
//   bairro:string = '';
//   logradouro: string = '';
//   cNumero:string = '';
//   numero: string = '';
//   sucesso: boolean = true;
//   detalhes: string = '';
// }

// export class BeneficiarioStatus {
//     id: number = 0;
//     name: string = '';
// }

export var beneficiarioColumns: Column[] = [

  {

    field: 'nome',
    header: 'Nome',
    maskType: MaskType.undefined, // colocar mask para cep e cnpj
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
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: true,
    filterShowMatchMode: true,
    showOperator: false,
    filterMatchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: 'representante',
    header: 'Representante',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: true,
    filterShowMatchMode: true,
    showOperator: false,
    filterMatchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: 'codigoSwift',
    header: 'Código Swift',
    maskType: MaskType.codigoSwift,
    mask: '00.0000.000/0000-00',
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'nomeBanco',
    header: 'Banco',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: true,
    filterShowMatchMode: true,
    showOperator: false,
    filterMatchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: 'conta',
    header: 'Conta',
    maskType: MaskType.undefined, // colocar mask para cep e cnpj
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: true,
    filterShowMatchMode: true,
    showOperator: false,
    filterMatchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: 'cidade',
    header: 'Cidade',
    maskType: MaskType.undefined,
    mask: '0000',
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
    field: 'nomePais',
    header: 'País',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: true,
    filterShowMatchMode: true,
    showOperator: false,
    filterMatchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: 'cep',
    header: 'CEP',
    maskType: MaskType.cep,
    mask: '00000-000',
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
    maskType: MaskType.cnpj,
    mask: '00.0000.000/0000-00',
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
    maskType: MaskType.cnpj,
    mask: '00.0000.000/0000-00',
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
  },





];

