import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faFilter, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa-crud.model';
import { Table } from 'src/app/utils/table';
import { Crypto } from 'src/app/utils/crypto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MaskApplierService } from 'ngx-mask';
import { PessoaService } from 'src/app/services/pessoa.service';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    maskType = MaskType;
    faFilter = faFilter;
    faCreditCard = faCreditCard;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;
    loading = false;
    list: PessoaList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaColumns;
    filters: string[] = ['id', 'nome', 'cpf', 'inclusao', 'status', 'saldo', 'filterConcat'];
    subscription: Subscription[] = [];
    currentBooleanFilter: any;
    currentCPFFilter: any;
    currentDateFilter: Date;
    selected?: any;
    
    constructor(
        private table: Table,
        private datepipe: DatePipe,
        private mask: MaskApplierService,
        private currency: CurrencyPipe,
        private pessoaService: PessoaService
    ) { 
        var list = this.pessoaService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var selected = this.table.selected.subscribe(res => this.selected = res);
        this.subscription.push(selected);

        var loading = this.table.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);


        lastValueFrom(this.pessoaService.getList());
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    // { label: 'Relatório', routePath: ['relatorio'], paramsFieldName: ['id'] }, 
                    // { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] }, 
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] }, 
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        this.table.currentPage.next(1);

        // this.format()
    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    ngAfterViewChecked(): void {
        setTimeout(() => {
            this.table.currentPageChange();
        }, 200);
    }

    format() {
        this.list = this.list.map(x => {
            x.cpf = x.cpf.toString().padStart(11, '0');
            x.filterConcat = this.mask.applyMask(x.cpf, '000.000.000-00')
            x.filterConcat += this.datepipe.transform(x.dataCadastro, 'dd/MM/yyyy', 'UTC')
            x.filterConcat += (x.situacao ? 'Ativo' : 'Inativo');
            x.filterConcat +=  this.currency.transform(x.saldoAtual.toString(), 'BRL', '', '1.2'); 
            return x;
        })
    }

    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
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
