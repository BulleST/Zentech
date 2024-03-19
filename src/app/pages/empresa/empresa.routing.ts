import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { EmpresaEditableAuth } from './empresa-editable.guard';
import { Role } from 'src/app/models/account-perfil.model';

const routes: Routes = [

    { path: '', component: ListComponent, title: 'Zentech - Empresa', children: [
        { path: 'cadastrar', component: FormComponent, data: { modalOrder: 1, roles: [Role.Admin] }, title: 'Zentech - Cadastrar empresa' },
        { path: 'editar/:empresa_id', component: FormComponent, data: { modalOrder: 1, roles: [Role.Admin] }, title: 'Zentech - Editar empresa' },
        { path: 'excluir/:empresa_id', component: DeleteComponent, data: { modalOrder: 1, roles: [Role.Admin] }, title: 'Zentech - Excluir empresa' },
        { path: 'habilitar/:empresa_id', component: DeactivatedComponent, data: { modalOrder: 1, roles: [Role.Admin] }, title: 'Zentech - Habilitar empresa' },
        { path: 'desabilitar/:empresa_id', component: DeactivatedComponent, data: { modalOrder: 1, roles: [Role.Admin] }, title: 'Zentech - Desabilitar empresa' },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
