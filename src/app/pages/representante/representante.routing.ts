import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from 'src/app/models/account-perfil.model';

const routes: Routes = [

    { path: '', component: ListComponent, title: 'Zentech - Representantes', children: [
        { path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 }, title: 'Zentech - Cadastrar Representante' },
        { path: 'editar/:representante_id', component: FormComponent, data: { modalOrder: 1 }, title: 'Zentech - Editar Representante' },
        { path: 'excluir/:representante_id', component: DeleteComponent, data: { modalOrder: 1,  roles: [ Role.Admin ] }, canActivate: [ RoleGuard ], title: 'Zentech - Excluir Representante' },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepresentanteRoutingModule { }
