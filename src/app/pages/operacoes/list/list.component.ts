import { Component } from '@angular/core';
import { faEllipsisV, faFilter, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { pessoaOperacaoColumns } from 'src/app/models/pessoa-operacao.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    maskType = MaskType;
    list: PessoaList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaOperacaoColumns;
    subscription: Subscription[] = [];
    
    constructor(
        private table: Table,
        private pessoaOperacaoService: PessoaOperacaoService
    ) { 
        var list = this.pessoaOperacaoService.list.subscribe(res => {
            this.list = Object.assign([], res)
        });
        this.subscription.push(list);

        lastValueFrom(this.pessoaOperacaoService.getList());

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] }, 
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] }, 
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        this.table.currentPage.next(1);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    ngAfterViewChecked(): void {
        setTimeout(() => {
            this.table.currentPageChange();
        }, 200);
    }



}
