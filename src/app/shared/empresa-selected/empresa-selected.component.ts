import { JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaSelected, EmpresaService } from 'src/app/services/empresa.service';
import { Colors } from 'src/app/utils/colors';

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
        private colors: Colors
    ) {
        var account = this.accountService.accountSubject.subscribe(async account => {
            this.account = account;
            if (account) {
                if (account.perfilAcesso_Id == 1) {
                    if (this.empresaService.list.value.length == 0) 
                        await lastValueFrom(this.empresaService.getList());
                }
                if (account.perfilAcesso_Id != 1 || !this.empresaService.getEmpresa().value.empresa) {
                    this.empresaService.setEmpresa({
                        id: account.empresa_Id,
                        empresa: account.empresa
                    })
                }
            }
        });
        this.subscription.push(account);

        var empresa = this.empresaService.getEmpresa().subscribe(res => {
            this.empresaSelected = res;
            if (res) {
                this.setColorsJquery();
            }
        });
        this.subscription.push(empresa);

        var list = this.empresaService.list.subscribe(res => {
            this.empresas = res;
        });
        this.subscription.push(list);
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
                this.empresaService.setEmpresa({ empresa, id });
            }
        }
    }
    setColorsJquery() {
        var empresa = this.empresaSelected.empresa as Empresa;
        this.colors.setColorsJquery(empresa);
    }


}
