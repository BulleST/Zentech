import { Component } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Invoice_List, invoiceColumns } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
    list: Invoice_List[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = invoiceColumns;
    subscription: Subscription[] = [];
    
    constructor(
        private table: Table,
        private invoiceService: InvoiceService,
    ) { 
        var list = this.invoiceService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        lastValueFrom(this.invoiceService.getList());
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
