import { FilterMatchMode } from "primeng/api";
import { Column, FilterDisplay, FilterType, MaskType } from "../helpers/column.interface";

export class Contrato_List {
    id: number = 0;
    tipo: string = '';
    numContrato: string = '';
    evento: string = '';
    data: Date = new Date;
    instituicao: string = '';
    taxa: number = 0;
    valorNacional: number = 0;
    dataLiquidacao: Date = new Date;
    pagRecExterior: string = '';
    pais: string = '';
    percentualAdiantamento: number = 0;
}


export class Contrato {
    id: number = 0;
    tipo_Id: number = 0;
    numContrato: string = '';
    evento_Id: number = 0;
    data: Date = new Date;
    instituicaoFinanceira_Id: number = 0;
    taxa: number = 0;
    valorNacional: number = 0;
    dataLiquidacao: Date = new Date;
    pagRecExterior: string = '';
    pais_Id: number = 0;
    percentualAdiantamento: number = 0;
}



export var contratoColumns: Column[] = [
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
        field: 'simbolo',
        header: 'Símbolo',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
    {
        field: 'codigo',
        header: 'Código',
        maskType: MaskType.undefined,
        filterType: FilterType.text,
        filterDisplay: FilterDisplay.menu,
        filterShowAddButton: false,
        filterShowMatchMode: false,
        showOperator: false,
        filterMatchMode: FilterMatchMode.CONTAINS,
    },
]