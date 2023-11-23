import { Component, Input, OnChanges, OnDestroy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/helpers/column.interface';
import { PessoaSaldo, pessoaSaldoColumns } from 'src/app/models/pessoa-saldo.model';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnChanges, OnDestroy, AfterViewChecked  {
    faDollarSign = faDollarSign;
    columns = pessoaSaldoColumns;
    filters = pessoaSaldoColumns.map(x => x.field);
    currentDateFilter: Date;

    @Input() saldos: PessoaSaldo[] = [];
    @Input() loading: boolean = false;
    @Input() limiteConcedido: number = 0;
    @Input() lastIdDelete: number = 0;
    subscription: Subscription[] = [];


    constructor(
        private table: Table,
    ) {

    }
    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['saldos']) this.saldos = changes['saldos'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['limiteConcedido']) this.limiteConcedido = changes['limiteConcedido'].currentValue;
        if (changes['lastIdDelete']) this.lastIdDelete = changes['lastIdDelete'].currentValue;
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
    
    getCellData(row: any, col: Column): any {
        return this.table.formatCellData(row, col);
    }

}
