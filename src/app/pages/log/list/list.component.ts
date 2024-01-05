import { logColumns } from './../../../models/log-model';
import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { LogList } from './../../../models/log-model';
import { LogService } from 'src/app/services/log-service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: LogList[] = []
    tableLinks: MenuTableLink[] = [];
    columns =logColumns;
    subscription: Subscription[] = [];
    screen: ScreenWidth = ScreenWidth.lg;
    objeto: LogList = new LogList;

    constructor(
        private table: Table,
        private logService: LogService,
        private isMobile: IsMobile
    ) {
        var list = this.logService.list.subscribe(res => {
          this.list = Object.assign([], res);

          console.log('teste', this.list);

        });
        this.subscription.push(list);
        var mob = this.isMobile.value.subscribe(res => this.screen = res);
        this.subscription.push(mob);

        lastValueFrom(this.logService.getList());


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



}
