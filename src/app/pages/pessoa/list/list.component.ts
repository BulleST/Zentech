import { Component, OnDestroy } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { PessoaService } from 'src/app/services/pessoa.service';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    faCreditCard = faCreditCard;
    list: PessoaList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaColumns;
    subscription: Subscription[] = [];
    
    constructor(
        private table: Table,
        private pessoaService: PessoaService,
        private accountService: AccountService,
    ) { 
        var list = this.pessoaService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        lastValueFrom(this.pessoaService.getList());
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Cadastrar Saldo', routePath: ['cadastrar-saldo'], paramsFieldName: ['id'] }, 
                    { label: 'Cadastrar Operação', routePath: ['cadastrar-operacao'], paramsFieldName: ['id'] }, 
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] }, 
                ];

                if (this.accountService.accountValue?.perfilAcesso_Id == 1) {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] } )
                }

                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }



}
