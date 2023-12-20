import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class DocumentoSwift {
    id: number = 0;
    data: Date = new Date
    dataInvoice: Date = new Date;
    valor: number = '' as unknown as number;
    nomeBeneficiario: string = '';
    cnpjBeneficiario:  number = '' as unknown as number;
    nomeBanco: string = '';

}

export class DocumentoSwiftRequest {
  id: number = 0;
  data: Date = new Date
  invoice_Id:  number = '' as unknown as number;


}


export class DocumentoSwift_List {
  id: number = 0;
  data: Date = new Date
  dataInvoice: Date = new Date;
  valor: number = 0;
  nomeBeneficiario: string = '';
  cnpjBeneficiario:  number = 0;
  nomeBanco: string = '';
}

export var documentoSwiftColumns: Column[] = [
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
      field: 'data',
      header: 'Data',
      maskType: MaskType.dateTime,
      filterType: FilterType.datetime,
      filterDisplay: FilterDisplay.menu,
      filterShowAddButton: true,
      filterShowMatchMode: true,
      showOperator: true,
      filterMatchMode: FilterMatchMode.DATE_IS,
  },
    {
        field: 'dataInvoice',
        header: 'Data Invoice',
        maskType: MaskType.dateTime,
        filterType: FilterType.datetime,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: true,
        filterMatchMode: FilterMatchMode.DATE_IS,
    },
    {
        field: 'valor',
        header: 'Valor',
        maskType: MaskType.number,
        filterType: FilterType.numeric,
        filterDisplay: FilterDisplay.menu,
        decimal: '1.2',
        filterShowAddButton: true,
        filterShowMatchMode: true,
        showOperator: true,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'nomeBanco',
        header: 'Banco',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'nomeBeneficiario',
        header: 'Beneficiario',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'cnpjBeneficiario',
        header: 'CNPJ',
        maskType: MaskType.cnpj,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    }
];
