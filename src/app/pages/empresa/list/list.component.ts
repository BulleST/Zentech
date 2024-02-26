

import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Empresa, empresaColumns } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: Empresa[] = []
    tableLinks: MenuTableLink[] = [];

    columns = empresaColumns;
    subscription: Subscription[] = [];
    loading = false;

    constructor(
        private table: Table,
        private empresaService: EmpresaService,
    ) {
        var list = this.empresaService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.empresaService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        lastValueFrom(this.empresaService.getList(true));


        var selected = this.table.selected.subscribe(res => {
          if (res) {
              this.tableLinks = [
                { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                  { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                  { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
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
        lastValueFrom(this.empresaService.getList(true));
    }


}
