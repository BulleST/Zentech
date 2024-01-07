import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from 'src/app/models/account-perfil.model';

const routes: Routes = [
    { path: 'cadastrar', component: FormComponent, title: 'Zentech - Cadastrar Moeda', data: { modalOrder: 1 } },
    { path: 'editar/moeda/:moeda_id', component: FormComponent, title: 'Zentech - Editar Moeda', data: { modalOrder: 1 } },
    { path: 'excluir/moeda/:moeda_id', component: DeleteComponent, title: 'Zentech - Excluir Moeda',canActivate: [RoleGuard], data: { modalOrder: 1, roles: [Role.Admin] },  },
    MyAccountRouter,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoedaRoutingModule { }
