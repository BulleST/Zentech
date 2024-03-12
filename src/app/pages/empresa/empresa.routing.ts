import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { EmpresaEditableAuth } from './empresa-editable.guard';

const routes: Routes = [

    { path: '', component: ListComponent, title: 'Zentech - Empresa', children: [
        { path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 }, title: 'Zentech - Cadastrar empresa' },
        { path: 'editar/:empresa_id', component: FormComponent, data: { modalOrder: 1 }, title: 'Zentech - Editar empresa' },
        { path: 'excluir/:empresa_id', component: DeleteComponent, data: { modalOrder: 1 }, title: 'Zentech - Excluir empresa' },
        { path: 'habilitar/:empresa_id', component: DeactivatedComponent, data: { modalOrder: 1 }, title: 'Zentech - Habilitar empresa', canActivate: [EmpresaEditableAuth] },
        { path: 'desabilitar/:empresa_id', component: DeactivatedComponent, data: { modalOrder: 1 }, title: 'Zentech - Desabilitar empresa', canActivate: [EmpresaEditableAuth] },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
