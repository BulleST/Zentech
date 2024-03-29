import { logColumns } from './../../../models/log-model';
import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { LogList } from './../../../models/log-model';
import { LogService } from 'src/app/services/log-service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faClock = faClock;
    maskType = MaskType;
    list: LogList[] = []
    tableLinks: MenuTableLink[] = [];
    columns =logColumns;
    subscription: Subscription[] = [];
    objeto: LogList = new LogList;
    loading = false;
    empresaSelected?: Empresa
    constructor(
        private table: Table,
        private logService: LogService,
        private empresaService: EmpresaService
    ) {
        var list = this.logService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.logService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);


        var empresa = this.empresaService.getEmpresa().subscribe(async res => {
          this.empresaSelected = res.empresa;
          if (res && res.id) {
            await lastValueFrom(this.logService.getList(true));
          }
        });
        this.subscription.push(empresa);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    getList() {
        lastValueFrom(this.logService.getList(true));
    }



}
