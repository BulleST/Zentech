import { EmpresaSelected, EmpresaService } from 'src/app/services/empresa.service';
import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ContratoService } from './../../../services/contrato.service';
import { contratoColumns } from './../../../models/contrato.model';
import { Contrato_List } from 'src/app/models/contrato.model';
import { Empresa } from 'src/app/models/empresa.model';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: Contrato_List[] = []
    tableLinks: MenuTableLink[] = [];
    columns = contratoColumns;
    subscription: Subscription[] = [];
    loading = false;
empresaSelected?: Empresa
    constructor(
        private table: Table,
        private contratoService: ContratoService,
        private empresaService: EmpresaService
    ) {
        var list = this.contratoService.list.subscribe(res =>  this.list = res);
        this.subscription.push(list);

        var loading = this.contratoService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        var empresa = this.empresaService.getEmpresa().subscribe(async res => {
          this.empresaSelected = res.empresa;
          if (res && res.id) {
            await lastValueFrom(this.contratoService.getList(true));
          }
        });
        this.subscription.push(empresa);
        lastValueFrom(this.contratoService.getList(true));

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    getList() {
        lastValueFrom(this.contratoService.getList(true));
    }



}
