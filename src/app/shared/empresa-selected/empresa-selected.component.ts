import { JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaSelected, EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa-selected',
  templateUrl: './empresa-selected.component.html',
  styleUrls: ['./empresa-selected.component.css'],
})
export class EmpresaSelectedComponent implements OnDestroy {
    empresaSelected: EmpresaSelected = new EmpresaSelected;
    empresas: Empresa[] = [];
    loading = false;
    account?: Account;
    Role = Role;
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
        private accountService: AccountService,
    ) {

        
        var account = this.accountService.account.subscribe(res => this.account = res);
        this.subscription.push(account);

        var empresa = this.empresaService.empresaSelected.subscribe(res => this.empresaSelected = res);
        this.subscription.push(empresa);

        var list = this.empresaService.list.subscribe(res => this.empresas = res);
        this.subscription.push(list);

        if (this.accountService.accountValue && this.accountService.accountValue?.perfilAcesso_Id == 1) {
            lastValueFrom(this.empresaService.getList())
            .then(res => {
                if (res.length > 0) {
                    var e = res[0];
                    this.empresaService.empresaSelected.next({
                        empresa: e,
                        id: e.id
                    });
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    async empresaChange(id: number) {
        if (this.accountService.accountValue && this.accountService.accountValue?.perfilAcesso_Id == 1) {
            if (id) {
                if (this.empresas.length == 0) 
                    await lastValueFrom(this.empresaService.getList());
                var empresa = this.empresas.find(x => x.id == id) as Empresa;
                this.empresaService.empresaSelected.next({ empresa, id });
            }
        }
    }

}
