import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFilter, faList } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { Crypto } from 'src/app/utils/crypto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MaskApplierService } from 'ngx-mask';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    maskType = MaskType;
    faFilter = faFilter;
    faCreditCard = faCreditCard;
    loading = false;
    list: PessoaList[] = [];
    filters: string[] = ['id', 'nome', 'cpf', 'inclusao', 'status', 'saldo', 'filterConcat'];
    columns = pessoaColumns;
    currentBooleanFilter: any;
    currentCPFFilter: any;
    currentDateFilter: Date;
    
    constructor(
        private table: Table,
        private router: Router,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private mask: MaskApplierService,
        private currency: CurrencyPipe
    ) { 
        var index = 0;
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index as unknown as string, inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: parseFloat(index.toString().padEnd(5, '0')) })
        this.format()
    }

    ngAfterViewChecked(): void {
        setTimeout(() => {
            this.table.currentPageChange();
        }, 200);
    }

    format() {
        this.list = this.list.map(x => {
            x.idEncrypted = this.crypto.encrypt(x.id) ?? undefined;
            x.cpf = x.cpf.toString().padStart(11, '0');
            x.filterConcat = this.mask.applyMask(x.cpf, '000.000.000-00')
            x.filterConcat += this.datepipe.transform(x.inclusao, 'dd/MM/yyyy', 'UTC')
            x.filterConcat += (x.status ? 'Ativo' : 'Inativo');
            x.filterConcat +=  this.currency.transform(x.saldo.toString(), 'BRL', '', '1.2'); 
            return x;
        })
    }

    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }

    gelCellTitle(row: any, col: Column) {
        const nestedProperties: string[] = col.field.split('.');
        let title: any = row;
        for (const prop of nestedProperties) {
            title = title ? title[prop] ?? undefined : undefined;
        }
        return title;
    }

}
