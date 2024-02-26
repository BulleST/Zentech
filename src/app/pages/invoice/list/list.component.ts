import { Component } from '@angular/core';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Invoice_List, invoiceColumns } from 'src/app/models/invoice.model';
import { AccountService } from 'src/app/services/account.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Table } from 'src/app/utils/table';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFileInvoice = faFileInvoice;
    list: Invoice_List[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = invoiceColumns;
    subscription: Subscription[] = [];
    loading = false;
    empresaSelected?: Empresa
    constructor(
        private table: Table,
        private invoiceService: InvoiceService,
        private accountService: AccountService,
        private empresaService: EmpresaService
    ) {
        var list = this.invoiceService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.invoiceService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        var empresa = this.empresaService.empresaSelected.subscribe(async res => {
          this.empresaSelected = res.empresa;
          if (res && res.id) {
            await lastValueFrom(this.invoiceService.getList(true));
          }
        });
        this.subscription.push(empresa);


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
        lastValueFrom(this.invoiceService.getList(true));
    }


}
