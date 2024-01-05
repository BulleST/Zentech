import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormBanco } from './../banco/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from './../instituicao-financeira/form/form.component';
import { FormComponent as FormBeneficiario } from './../beneficiario/form/form.component';
import { FormComponent as FormMoeda } from './../moeda/form/form.component';
import { DeleteComponent as DeleteMoeda } from '../moeda/delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from 'src/app/models/account-perfil.model';



const routes: Routes = [
    {
        path: '', component: ListComponent, title: 'Zentech - Invoices', children: [
            {
                path: 'cadastrar', component: FormComponent, title: 'Zentech - Cadastrar Invoice', data: { modalOrder: 1 }, children: [

                    { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Cadastrar Moeda' },
                    { path: 'moeda/:moeda_id', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Editar Moeda' },
                    { path: 'moeda/excluir/:moeda_id', component: DeleteMoeda, canActivate: [RoleGuard], data: { modalOrder: 2, roles: [Role.Admin] }, title: 'Zentech - Excluir Moeda' },

                    { path: 'instituicao-financeira', component: FormInstituicaoFinanceira, title: 'Zentech - Cadastrar Instituição Financeira', data: { modalOrder: 2 } },
                    {
                        path: 'beneficiario', component: FormBeneficiario, title: 'Zentech - Cadastrar Beneficiário', data: { modalOrder: 2 }, children: [
                            { path: 'banco', component: FormBanco, title: 'Zentech - Cadastrar Invoice', data: { modalOrder: 3 } },
                        ]
                    },
                ]
            },
            {
                path: 'editar', component: FormComponent, title: 'Zentech - Editar Invoice', data: { modalOrder: 1 }, children: [

                    { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Cadastrar Moeda' },
                    { path: 'moeda/:moeda_id', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Editar Moeda' },
                    { path: 'moeda/excluir/:moeda_id', component: DeleteMoeda, canActivate: [RoleGuard], data: { modalOrder: 2, roles: [Role.Admin] }, title: 'Zentech - Excluir Moeda' },

                    { path: 'instituicao-financeira', component: FormInstituicaoFinanceira, title: 'Zentech - Cadastrar Instituição Financeira', data: { modalOrder: 2 } },
                    {
                        path: 'beneficiario', component: FormBeneficiario, title: 'Zentech - Cadastrar Beneficiário', data: { modalOrder: 2 }, children: [
                            { path: 'banco', component: FormBanco, title: 'Zentech - Cadastrar Invoice', data: { modalOrder: 3 } },
                        ]
                    },
                ]
            },
            { path: 'excluir/:invoice_id', component: DeleteComponent, title: 'Zentech - Excluir Invoice', canActivate: [RoleGuard], data: { modalOrder: 1, roles: [Role.Admin] }, },
            MyAccountRouter,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }
