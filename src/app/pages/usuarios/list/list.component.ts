import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Usuario, userColumns } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuarioService } from 'src/app/services/user.service';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { Table } from 'src/app/utils/table';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
    faUsers = faUsers;
    list: Usuario[] = []
    tableLinks: MenuTableLink[] = [];

    columns = userColumns;
    subscription: Subscription[] = [];
    loading = false;
    empresaSelected?: Empresa;
    constructor(
        private table: Table,
        private userService: UsuarioService,
        private accountService: AccountService,
        private empresaService: EmpresaService
    ) {
        var list = this.userService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.userService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);



        var empresa = this.empresaService.empresaSelected.subscribe(async res => {
          this.empresaSelected = res.empresa;
          if (res && res.id) {
            await lastValueFrom(this.userService.getList(true));
          }
        });
        this.subscription.push(empresa);
        lastValueFrom(this.userService.getList(true));

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                    { label: 'Resetar senha', routePath: [ 'reset-password'], paramsFieldName: ['id'] },
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
        lastValueFrom(this.userService.getList(true));
    }



}
