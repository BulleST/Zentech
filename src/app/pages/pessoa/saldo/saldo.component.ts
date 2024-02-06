import { Component, Input, OnChanges, OnDestroy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ColumnFilter } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { PessoaSaldo, pessoaSaldoColumns } from 'src/app/models/pessoa-saldo.model';
import { AccountService } from 'src/app/services/account.service';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnChanges, OnDestroy, AfterViewChecked  {
    maskType = MaskType;
    faDollarSign = faDollarSign;
    columns = pessoaSaldoColumns;
    filters = pessoaSaldoColumns.map(x => x.field);
    currentDateFilter: Date;

    @Input() saldos: PessoaSaldo[] = [];
    @Input() loading: boolean = false;
    @Input() limiteConcedido: number = 0;
    @Input() lastIdDelete: number = 0;
    subscription: Subscription[] = [];
    podeExcluir = false;

    constructor(
        private table: Table,
        private accountService: AccountService
    ) {
        this.podeExcluir =  this.accountService.accountValue?.perfilAcesso_Id == 1;

    }
    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['saldos']) {
            this.saldos = changes['saldos'].currentValue;
            this.formata();
        }
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
    
    formata() {
        this.table.loading.next(true);
        var list = JSON.parse(JSON.stringify(this.saldos));
        // list.every((row: any) => {
        //     this.columns.every(col => {
        //         try {
        //             row[col.field] = this.table.formatCellData(row, col);
        //         } catch (e) {
        //             console.error(e);
        //         }
        //         return col;
        //     })
        //     return row;
        // })

        this.saldos = Object.assign([], list);
        this.table.loading.next(false);
    }

    getOptionValue(row: any, col: Column, field: string) {
        if (col.values) {
            var value = this.table.getCellValue(row, col);
            var opt = col.values.find(x => x.value == value) as any;
            return opt[field];
        }
        return null;
    }

    filterDate(value: any, filterCallback: any, filterEl: ColumnFilter) {
        if (value)
            filterCallback(value);
        else
            filterEl.clearFilter();
    }

    filterNumeric(event: any, filterCallback: any, filterEl: ColumnFilter) {
        var value = event.target.value.replaceAll('.', '')
        value = parseFloat(value.replaceAll(',', '.'))
        if (value)
            filterCallback(value);
        else
            filterEl.clearFilter();
    }
}
