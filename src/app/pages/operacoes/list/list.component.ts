import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaOperacaoList, pessoaOperacaoAllColumns } from 'src/app/models/pessoa-operacao.model';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { AccountService } from 'src/app/services/account.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: PessoaOperacaoList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaOperacaoAllColumns;
    subscription: Subscription[] = [];
    loading = false;
    empresaSelected?: Empresa;

    constructor(
        private table: Table,
        private pessoaOperacaoService: PessoaOperacaoService,
        private pessoaService: PessoaService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        var list = this.pessoaOperacaoService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.pessoaOperacaoService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);
        
        if (this.pessoaService.list.value.length == 0) {
            lastValueFrom(this.pessoaService.getList(true));
        }
        var empresa = this.empresaService.empresaSelected.subscribe(async res => {
            this.empresaSelected = res.empresa;
            if (res && res.id) {
                await lastValueFrom(this.pessoaOperacaoService.getList(true));
            }
        });
        this.subscription.push(empresa);

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] },
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                ];
                if (this.accountService.accountValue?.perfilAcesso_Id == 1) {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] })
                }

                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    getList() {
        lastValueFrom(this.pessoaOperacaoService.getList(true));
    }


}
