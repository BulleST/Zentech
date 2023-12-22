import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { ContratoService } from './../../../services/contrato.service';
import { contratoColumns } from './../../../models/contrato.model';
import { Contrato_List } from 'src/app/models/contrato.model';
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
    screen: ScreenWidth = ScreenWidth.lg;


    constructor(
        private table: Table,
        private contratoService: ContratoService,
        private isMobile: IsMobile
    ) {
        var list = this.contratoService.list.subscribe(res => {
            this.list = Object.assign([], res)

        });
        this.subscription.push(list);
        var mob = this.isMobile.value.subscribe(res => this.screen = res);
        this.subscription.push(mob);

        lastValueFrom(this.contratoService.getList());

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
