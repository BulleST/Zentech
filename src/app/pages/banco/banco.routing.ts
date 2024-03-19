import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { Role } from 'src/app/models/account-perfil.model';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    {
        path: '', component: ListComponent, title: 'Zentech - Bancos', children: [
            { path: 'cadastrar', component: FormComponent, title: 'Zentech - Cadastrar Banco', data: { modalOrder: 1 } },
            { path: 'editar/:banco_id', component: FormComponent, title: 'Zentech - Editar Banco', data: { modalOrder: 1 } },
            { path: 'excluir/:banco_id', component: DeleteComponent, title: 'Zentech - Excluir Banco', data: { modalOrder: 1, data: [Role.Admin, Role.Master] }, canActivate: [RoleGuard] },
            MyAccountRouter,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BancoRoutingModule { }
