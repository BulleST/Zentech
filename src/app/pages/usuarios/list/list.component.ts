import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Usuario, userColumns } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user.service';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { Table } from 'src/app/utils/table';

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
    screen: ScreenWidth = ScreenWidth.lg;




    constructor(
        private table: Table,
        private userService: UsuarioService,
        private isMobile: IsMobile
    ) {
        var list = this.userService.list.subscribe(res => this.list = res);
        this.subscription.push(list);

        var mob = this.isMobile.value.subscribe(res => this.screen = res);
        this.subscription.push(mob);

        lastValueFrom(this.userService.getList());

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] },
                    { label: 'Resetar senha', routePath: [ 'reset-password'], paramsFieldName: ['id'] },
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
