
import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";


export class LogList {
    id: number = 0;
    data: string = '';
    acao: string = '';
    objeto: string = '';
    entidade: string = '';
    usuarioNome: string = '';
    usuarioEmail: string = '';
    empresa: string = '';
    usuario_Id: 0;
    empresa_Id: 0;
}


export class LogRequest {
  id: number = 0;
  data: string = '';
  acao: string = '';
  objeto: string = '';
  entidade: string = '';
  usuarioNome: string = '';
  usuarioEmail: string = '';
  empresa: string = '';
  usuario_Id: number = undefined as unknown as number;;
  empresa_Id: number = undefined as unknown as number;;
}


export var logColumns: Column[] = [
    {
        field: 'id',
        header: 'Id',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'data',
        header: 'Data',
        maskType: MaskType.dateTime,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'acao',
        header: 'Ação',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
        field: 'objeto',
        header: 'Objeto',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.EQUALS,
    },
    {
      field: 'entidade',
      header: 'Entidade',
      maskType: MaskType.undefined,
      filterType: FilterType.text,
      filterDisplay: FilterDisplay.menu,
      filterShowAddButton: false,
      filterShowMatchMode: false,
      showOperator: false,
      filterMatchMode: FilterMatchMode.EQUALS,
  },
  {
    field: 'usuarioNome',
    header: 'Nome',
    maskType: MaskType.undefined,
    filterType: FilterType.text,
    filterDisplay: FilterDisplay.menu,
    filterShowAddButton: false,
    filterShowMatchMode: false,
    showOperator: false,
    filterMatchMode: FilterMatchMode.EQUALS,
},
{
  field: 'usuarioEmpresa',
  header: 'Empresa',
  maskType: MaskType.undefined,
  filterType: FilterType.text,
  filterDisplay: FilterDisplay.menu,
  filterShowAddButton: false,
  filterShowMatchMode: false,
  showOperator: false,
  filterMatchMode: FilterMatchMode.EQUALS,
},
{
  field: 'Empresa',
  header: 'Empresa',
  maskType: MaskType.undefined,
  filterType: FilterType.text,
  filterDisplay: FilterDisplay.menu,
  filterShowAddButton: false,
  filterShowMatchMode: false,
  showOperator: false,
  filterMatchMode: FilterMatchMode.EQUALS,
},
];

