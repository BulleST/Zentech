import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { userColumns, Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    faUsers = faUsers;
    Role = Role;
    columns = userColumns;
    list: Usuario[] = [];
    tableLinks: MenuTableLink[] = [];
    account = new Account;
    menuTable = true;
    subscription: Subscription[] = [];

    constructor(
        private userService: UsuarioService,
        private table: Table,
        private accountService: AccountService
    ) {
        
        lastValueFrom(this.userService.getList()); 
        var account = this.accountService.account.subscribe(res => this.account = res ?? new Account);
        var list = this.userService.list.subscribe(res => this.list = res);
        
        var selected = this.table.selected.subscribe(res => {
            if (res) { // se tiver linha selecionada
                /**
                 * O usuario master pode alterar 
                 * qualquer outro usuário exceto o admin
                 * O usuário backoffice não tem acesso a essa sessão
                */
                if (this.account.perfilAcesso_Id == Role.Admin || (this.account.perfilAcesso_Id == Role.Master && res.perfilAcesso_Id != Role.Admin)) {
                    this.tableLinks = [
                        { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
                        { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                        { label: 'Resetar senha', routePath: [ 'reset-password'], paramsFieldName: ['id'] },
                        { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                    ];
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });

        this.subscription.push(account);
        this.subscription.push(list);
        this.subscription.push(selected);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    create = (userService: UsuarioService = this.userService): void => {
        userService.setObject(new Usuario);
    }

    canMenu() {
        return `(${this.account.perfilAcesso_Id} == ${Role.Admin}) || (${this.account.perfilAcesso_Id} == ${Role.Master} && item.perfilAcesso_Id != ${Role.Admin})` as unknown as boolean;
    }

}
