import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserEditableAuth } from './user-editable.guard';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: '', component: ListComponent, title: 'ZenTech - Usuários', children: [
                { path: 'minha-conta', loadComponent: () => import('./../initial/my-account/my-account.component').then(x => x.MyAccountComponent) },
            { path: 'cadastrar', component: FormComponent, title: 'ZenTech - Cadastrar usuário' },
            { path: 'editar/:usuario_id', component: FormComponent, title: 'ZenTech - Editar usuário', canActivate: [UserEditableAuth] },
            { path: 'excluir/:usuario_id', component: DeleteComponent, title: 'ZenTech - Excluir usuário', canActivate: [UserEditableAuth] },
            { path: 'reset-password/:usuario_id', component: ResetPasswordComponent, title: 'ZenTech - Resetar senha', canActivate: [UserEditableAuth] },
            { path: 'habilitar/:usuario_id', component: DeactivatedComponent, title: 'ZenTech - Habilitar usuário', canActivate: [UserEditableAuth] },
            { path: 'desabilitar/:usuario_id', component: DeactivatedComponent, title: 'ZenTech - Desabilitar usuário', canActivate: [UserEditableAuth] },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
