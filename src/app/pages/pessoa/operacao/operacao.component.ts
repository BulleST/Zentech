import { Component, Input, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { PessoaOperacaoList, pessoaOperacaoColumns } from 'src/app/models/pessoa-operacao.model';
import { Subscription } from 'rxjs';

import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Pessoa } from 'src/app/models/pessoa.model';
import { ListSharedComponent } from 'src/app/shared/list/list.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-operacao',
    templateUrl: './operacao.component.html',
    styleUrls: ['./operacao.component.css']
})
export class OperacaoComponent implements OnDestroy {
    columns = pessoaOperacaoColumns;
    tableLinks: MenuTableLink[] = [];
    subscription: Subscription[] = [];

    @Input() list: PessoaOperacaoList[] = [];
    @Input() pessoa: Pessoa = new Pessoa;
    @Input() pessoaIdEncrypted: Pessoa = new Pessoa;
    @Input() limiteUtilizado: number = 0;
    @Input() loading: boolean = false;


    @ViewChild('shared') shared: ListSharedComponent;

    constructor(
        private table: Table,
        private accountService: AccountService,
    ) {
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Detalhes', routePath: ['operacao', 'detalhes'], paramsFieldName: ['id'] }, 
                    { label: 'Editar', routePath: ['operacao', 'editar'], paramsFieldName: ['id'] }, 
                ];
                if (this.accountService.accountValue?.perfilAcesso_Id == 1) {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['operacao', 'excluir'], paramsFieldName: ['id'] }, )
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['list']) this.list = changes['list'].currentValue;
        if (changes['pessoa']) this.pessoa = changes['pessoa'].currentValue;
        if (changes['limiteUtilizado']) this.limiteUtilizado = changes['limiteUtilizado'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }


}
