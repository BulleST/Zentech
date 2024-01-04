

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

    constructor(
        private table: Table,
        private empresaService: EmpresaService,
    ) {
        var list = this.empresaService.list.subscribe(res => {
            this.list = res.map(x => JSON.parse(JSON.stringify(x)))
        });
        this.subscription.push(list);
        
        lastValueFrom(this.empresaService.getList());

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

}
