import { Component } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { PessoaService } from 'src/app/services/pessoa.service';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faCreditCard = faCreditCard;
    list: PessoaList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaColumns;
    subscription: Subscription[] = [];
    
    constructor(
        private table: Table,
        private pessoaService: PessoaService
    ) { 
        console.log(' app-list-component construtor')
        var list = this.pessoaService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        lastValueFrom(this.pessoaService.getList());
        var selected = this.table.selected.subscribe(res => {
            console.log(' app-list-component selected')
            if (res) {
                this.tableLinks = [
                    // { label: 'Relatório', routePath: ['relatorio'], paramsFieldName: ['id'] }, 
                    { label: 'Cadastrar operação', routePath: ['cadastrar-operacao'], paramsFieldName: ['id'] }, 
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] }, 
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] }, 
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        this.table.currentPage.next(1);

    }

    ngOnDestroy(): void {
        console.log(' app-list-component ngOnDestroy')
        this.subscription.forEach(x => x.unsubscribe());
    }



}
