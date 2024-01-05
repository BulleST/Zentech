import { FilterMatchMode } from "primeng/api";

export interface Column {
    field: string;
    header: string;
    colgroup?: string;
    maskType: MaskType,
    mask?: string;
    decimal?: string,
    moeda?: string
    filterType: FilterType;
    filterDisplay: FilterDisplay;
    showMatchMode?: boolean;
    showOperator?: boolean;
    showAddButton?: boolean;
    filterMatchMode?: FilterMatchMode;
    substringLength?: number; // Masktype.substring
    title?: string;
    filterValue?: any;
    values?: OptionValues[];
    sort?: boolean;
}

export enum FilterType {
    text = 'text',
    numeric = 'numeric',
    date = 'date',
    datetime = 'datetime',
    boolean = 'boolean',
    none = 'none',
}

export enum FilterDisplay {
    menu = 'menu',
    none = 'none',
}

export enum MaskType {
    undefined,
    number = 'number',
    money = 'money',
    percentage = 'percentage',
    date = 'date',
    dateTime = 'dateTime',
    cnpj = 'cnpj',
    cpf = 'cpf',
    cpfcnpj = 'cpfcnpj',
    rg = 'rg',
    any = 'any',
    boolean = 'boolean',
    telefoneCelular = 'telefoneCelular',
    substring = 'substring',
    options = 'options',
    mask = 'mask',
    cep = 'cep',
    imageUrl = 'imageUrl',
}


export class OptionValues {
    output: string = '';
    value: any;
    class?: string;
}
