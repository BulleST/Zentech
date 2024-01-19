import { BeneficiarioList, beneficiarioColumns } from './../../../models/beneficiario.model';
import { BeneficiarioService } from './../../../services/beneficiario.service';
import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faUsers = faUsers;
    maskType = MaskType;
    list: BeneficiarioList[] = []
    tableLinks: MenuTableLink[] = [];
    columns = beneficiarioColumns;
    subscription: Subscription[] = [];
    loading = false;
    // empresaSelected?: Empresa;

    constructor(
        private table: Table,
        private beneficiarioService: BeneficiarioService,
        private accountService: AccountService,
        // private empresaService: EmpresaService,
    ) {
        var list = this.beneficiarioService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.beneficiarioService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);
        // var empresa = this.empresaService.empresaSelected.subscribe(async res => {
        //     this.empresaSelected = res.empresa;
        //     console.log(this.empresaSelected)
        //     if (res && res.id) {
        //         await lastValueFrom(this.beneficiarioService.getList(res.id));
        //     }
        // });
        // this.subscription.push(empresa);
        lastValueFrom(this.beneficiarioService.getList(true));

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
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

    getList() {
        lastValueFrom(this.beneficiarioService.getList(true));
    }
}
