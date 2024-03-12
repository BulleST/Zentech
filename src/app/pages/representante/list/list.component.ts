

import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ScreenWidth } from 'src/app/utils/mobile';
import { Representante, representanteColumns } from 'src/app/models/representante.model';
import { RepresentanteService } from 'src/app/services/representante.service';
import { AccountService } from 'src/app/services/account.service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faUsers = faUsers;
    list: Representante[] = []
    tableLinks: MenuTableLink[] = [];

    columns = representanteColumns;
    subscription: Subscription[] = [];
    loading = false;
    empresaSelected?: Empresa;

    constructor(
        private table: Table,
        private representanteService: RepresentanteService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        var list = this.representanteService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.representanteService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);


        var empresa = this.empresaService.empresaSelected.subscribe(async res => {
            this.empresaSelected = res.empresa;
            if (res && res.id) {
                await lastValueFrom(this.representanteService.getList(true));
            }
        });
        this.subscription.push(empresa);

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                ];

                if (this.accountService.accountValue?.perfilAcesso_Id != 3) {
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
    getList() {
        lastValueFrom(this.representanteService.getList(true));
    }


}
