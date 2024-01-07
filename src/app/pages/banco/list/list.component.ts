

import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { BancoList } from 'src/app/models/banco.model';
import { bancoColumns } from 'src/app/models/banco.model';
import { BancoService } from 'src/app/services/banco.service';
import { AccountService } from 'src/app/services/account.service';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: BancoList[] = []
    tableLinks: MenuTableLink[] = [];
    columns = bancoColumns;
    subscription: Subscription[] = [];
    loading = false;
    
    constructor(
        private table: Table,
        private bancoService: BancoService,
        private accountService: AccountService,
    ) {
        var list = this.bancoService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.bancoService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        lastValueFrom(this.bancoService.getList(true));

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
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
        lastValueFrom(this.bancoService.getList(true));
    }

}
