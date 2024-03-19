import { UserEditableAuth } from './user-editable.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from 'src/app/models/account-perfil.model';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 }, title: 'Zentech - Cadastrar usuário' },
        { path: 'editar/:usuario_id', component: FormComponent, data: { modalOrder: 1 }, title: 'Zentech - Editar usuário', canActivate: [UserEditableAuth] },
        { path: 'excluir/:usuario_id', component: DeleteComponent, data: { modalOrder: 1,  roles: [ Role.Admin, Role.Master ] }, title: 'Zentech - Excluir usuário', canActivate: [UserEditableAuth, RoleGuard] },
        { path: 'reset-password/:usuario_id', component: ResetPasswordComponent, data: { modalOrder: 1 }, title: 'Zentech - Resetar senha', canActivate: [UserEditableAuth] },
        { path: 'habilitar/:usuario_id', component: DeactivatedComponent, data: { modalOrder: 1 }, title: 'Zentech - Habilitar usuário', canActivate: [UserEditableAuth] },
        { path: 'desabilitar/:usuario_id', component: DeactivatedComponent, data: { modalOrder: 1 }, title: 'Zentech - Desabilitar usuário', canActivate: [UserEditableAuth] },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
