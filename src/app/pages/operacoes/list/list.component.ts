import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { pessoaOperacaoAllColumns } from 'src/app/models/pessoa-operacao.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    maskType = MaskType;
    list: PessoaList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaOperacaoAllColumns;
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
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] }, 
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] }, 
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] }, 
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  
        
    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }



}
