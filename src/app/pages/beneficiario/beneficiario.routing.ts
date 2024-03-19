import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormBanco } from './../banco/form/form.component';
import { FormComponent as FormRepresentante } from './../representante/form/form.component';
import { DeleteComponent as DeleteRepresentante } from './../representante/delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { Role } from 'src/app/models/account-perfil.model';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    {
        path: '', component: ListComponent, title: 'Zentech - Beneficiários', children: [
            {
                path: 'cadastrar', component: FormComponent, title: 'Zentech - Cadastrar Beneficiário', data: { modalOrder: 1 }, children: [
                    { path: 'banco', component: FormBanco, title: 'Zentech - Cadastrar Banco', data: { modalOrder: 2 } },
                    { path: 'representante', component: FormRepresentante, title: 'Zentech - Cadastrar Representante', data: { modalOrder: 2 } },
                    // { path: 'representante/:representante_id', component: FormRepresentante, title: 'Zentech - Editar Representante', data: { modalOrder: 2 } },
                    // { path: 'representante/excluir/:representante_id', component: DeleteRepresentante, title: 'Zentech - Excluir Representante', data: { modalOrder: 2, data: [Role.Admin, Role.Master] }, canActivate: [RoleGuard] },
                ]
            },
            {
                path: 'editar/:beneficiario_id', title: 'Zentech - Editar Beneficiário', component: FormComponent, data: { modalOrder: 1 }, children: [
                    { path: 'banco', component: FormBanco, title: 'Zentech - Cadastrar Banco', data: { modalOrder: 2 } },
                    { path: 'representante', component: FormRepresentante, title: 'Zentech - Cadastrar Representante', data: { modalOrder: 2 } },
                    // { path: 'representante/:representante_id', component: FormRepresentante, title: 'Zentech - Editar Representante', data: { modalOrder: 2 } },
                    // { path: 'representante/excluir/:representante_id', component: DeleteRepresentante, title: 'Zentech - Excluir Representante', data: { modalOrder: 2, data: [Role.Admin, Role.Master] }, canActivate: [RoleGuard] },
                ]
            },
            { path: 'excluir/:beneficiario_id', title: 'Zentech - Excluir Beneficiário', component: DeleteComponent, data: { modalOrder: 1, data: [Role.Admin, Role.Master] }, canActivate: [RoleGuard] },
            MyAccountRouter,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BeneficiarioRoutingModule { }
