import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { Role } from 'src/app/models/account-perfil.model';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent, title: 'Zentech - Cadastrar Instituição Financeira', data: { modalOrder: 1 } },
        { path: 'editar/:instituicaoFinanceira_id', component: FormComponent, title: 'Zentech - Editar Instituição Financeira', data: { modalOrder: 1 } },
        { path: 'excluir/:instituicaoFinanceira_id', component: DeleteComponent, title: 'Zentech - Excluir Instituição Financeira', data: { modalOrder: 1, roles: [Role.Admin, Role.Master] }, canActivate: [RoleGuard] },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituicaoFinanceiraRoutingModule { }
