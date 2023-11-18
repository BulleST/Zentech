import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/helpers/column.interface';
import { PessoaSaldo, pessoaSaldoColumns } from 'src/app/models/pessoa-saldo.model';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
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

    @Input() saldos: PessoaSaldo[] = [] 
    @Input() loading: boolean = false; 
    subscription: Subscription[] = [];

    lastIdDelete = 0;

    constructor(
        private table: Table,
        private pessoaSaldoService: PessoaSaldoService,
        private datepipe: DatePipe,
        private crypto: Crypto,
    ) {
        var list = this.pessoaSaldoService.list.subscribe(res => {
            this.saldos = res.map(x => {
                x.dataConcessao = this.datepipe.transform(x.dataConcessao, 'dd/MM/yyyy HH:mm', 'pt-BR') as unknown as Date;
                x.idEncrypted = this.crypto.encrypt(x.id) ?? '';
                return x
            }).sort((x, y) => x.id - y.id);
            this.lastIdDelete = res.length > 0 ? res[res.length - 1].id : 0;
        });
        this.subscription.push(list); 

    }
    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['saldos']) this.saldos = changes['saldos'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
    
    getCellData(row: any, col: Column): any {
        return this.table.formatCellData(row, col);
    }

}
