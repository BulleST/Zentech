

import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ScreenWidth } from 'src/app/utils/mobile';
import { Representante, representanteColumns } from 'src/app/models/representante.model';
import { RepresentanteService } from 'src/app/services/representante.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: Representante[] = []
    tableLinks: MenuTableLink[] = [];

    columns = representanteColumns;
    subscription: Subscription[] = [];

    constructor(
        private table: Table,
        private representanteService: RepresentanteService,
        private accountService: AccountService,
    ) {
        var list = this.representanteService.list.subscribe(res => this.list = res);
        this.subscription.push(list);
        
        lastValueFrom(this.representanteService.getList());

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
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
