import { Component, Input, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaOperacaoList, PessoaOperacaoRequest, PessoaOperacaoStatus, pessoaOperacaoColumns } from 'src/app/models/pessoa-operacao.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { Modal } from 'src/app/utils/modal';
import { getError } from 'src/app/utils/error';
import { Crypto } from 'src/app/utils/crypto';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Pessoa } from 'src/app/models/pessoa.model';

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
    lastIdDelete = 0;
    @ViewChild('shared') shared: TemplateRef<any>;

    constructor(
        private table: Table,
        private pessoaOperacaoService: PessoaOperacaoService,
    ) {
        var list = this.pessoaOperacaoService.listOperacaoPorPessoa.subscribe(res => {
            this.list = res.sort((x, y) => x.id - y.id);
            this.lastIdDelete = res.length > 0 ? res[res.length - 1].id : 0;
        });
        this.subscription.push(list); 
        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['operacao', 'editar'], paramsFieldName: ['id'] }, 
                    { label: 'Excluir', routePath: ['operacao', 'excluir'], paramsFieldName: ['id'] }, 
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);  

        this.table.currentPage.next(1);

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['list']) this.list = changes['list'].currentValue;
        if (changes['pessoa']) this.pessoa = changes['pessoa'].currentValue;
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
}
