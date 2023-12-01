export class Invoice {
    id: number = 0;
    dataInvoice: Date = new Date;
    valor: number = 0;
    beneficiario_Id: number = 0;
    banco_Id: number = 0;
    swift: string = '';
    conta: number = 0;
    instituicaoFinanceira_Id: number = 0;
}


export class Invoice_List {
    id: number = 0;
    dataInvoice: Date = new Date;
    valor: number = 0;
    banco: string = 0;
    banco_Id: number = 0;
    swift: string = '';
    conta: number = 0;
    instituicaoFinanceira_Id: number = 0;

}