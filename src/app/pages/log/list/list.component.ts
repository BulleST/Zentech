import { logColumns } from './../../../models/log-model';
import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { LogList } from './../../../models/log-model';
import { LogService } from 'src/app/services/log-service';

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

    constructor(
        private table: Table,
        private logService: LogService,
    ) {
        var list = this.logService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.logService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        lastValueFrom(this.logService.getList(true));

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] },
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
        lastValueFrom(this.logService.getList(true));
    }



}
