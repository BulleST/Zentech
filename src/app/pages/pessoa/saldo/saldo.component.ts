import { Component, Input, OnChanges, OnDestroy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ColumnFilter } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { PessoaSaldo, pessoaSaldoColumns } from 'src/app/models/pessoa-saldo.model';
import { AccountService } from 'src/app/services/account.service';
import { Crypto } from 'src/app/utils/crypto';
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
    lastIdDelete: number = 0;
    subscription: Subscription[] = [];
    podeExcluir = false;

    constructor(
        private table: Table,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private crypto: Crypto
    ) {
        this.podeExcluir =  this.accountService.accountValue?.perfilAcesso_Id == 1 || this.accountService.accountValue?.perfilAcesso_Id == 2;

    }
    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['saldos']) {
            this.saldos = changes['saldos'].currentValue;
            this.lastIdDelete = this.saldos.length > 0 ? this.saldos[this.saldos.length - 1].id : 0;
            this.formata();
        }
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['limiteConcedido']) this.limiteConcedido = changes['limiteConcedido'].currentValue;
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
    
    setDate(date: string) {
        return new Date(date) ?? 'N/A'
    }

    excluir(id: number) {
        var encrypted = this.crypto.encrypt(id)
        this.router.navigate(['saldo', 'excluir', encrypted], { relativeTo: this.activatedRoute })
    }

}
