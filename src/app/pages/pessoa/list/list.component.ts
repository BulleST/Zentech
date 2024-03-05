import { Component, OnDestroy } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { PessoaService } from 'src/app/services/pessoa.service';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

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
    loading = false;
    empresaSelected?: Empresa;
    
    constructor(
        private table: Table,
        private pessoaService: PessoaService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) { 
        var list = this.pessoaService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);
        var loading = this.pessoaService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Cadastrar Saldo', routePath: ['cadastrar-saldo'], paramsFieldName: ['id'] }, 
                    { label: 'Cadastrar Operação', routePath: ['cadastrar-operacao'], paramsFieldName: ['id'] }, 
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] }, 
                ];
                if (this.accountService.accountValue?.perfilAcesso_Id != 3) {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] } )
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        var empresa = this.empresaService.empresaSelected.subscribe(async res => {
            this.empresaSelected = res.empresa;
            if (res && res.id) {
                await lastValueFrom(this.pessoaService.getList(true));
            }
        });
        this.subscription.push(empresa);

        if (this.pessoaService.list.value.length == 0) {
            lastValueFrom(this.pessoaService.getList(true));
        }

        

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    getList() {
        lastValueFrom(this.pessoaService.getList(true));
    }


}
