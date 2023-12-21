import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';

import { FormComponent as FormMoeda } from './../moeda/form/form.component';
import { FormComponent as FormBanco } from './../banco/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from './../instituicao-financeira/form/form.component';
import { FormComponent as FormBeneficiario } from './../beneficiario/form/form.component';
import { DeleteComponent as DeleteMoeda } from '../moeda/delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
    {
        path: '', component: ListComponent, children: [
            {
                path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 }, children: [
                    { path: 'banco', component: FormBanco, data: { modalOrder: 2 } },
                    { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 } },
                    { path: 'instituicao-financeira', component: FormInstituicaoFinanceira, data: { modalOrder: 2 } },
                    {
                        path: 'beneficiario', component: FormBeneficiario, data: { modalOrder: 2 }, children: [
                            { path: 'banco', component: FormBanco, data: { modalOrder: 3 } },
                        ]
                    },
                ]
            },
            {
                path: 'editar/:invoice_id', component: FormComponent, data: { modalOrder: 1 }, children: [
                    { path: 'banco', component: FormBanco, data: { modalOrder: 2 } },
                    { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 } },
                    { path: 'instituicao-financeira', component: FormInstituicaoFinanceira, data: { modalOrder: 2 } },
                    {
                        path: 'beneficiario', component: FormBeneficiario, data: { modalOrder: 2 }, children: [
                            { path: 'banco', component: FormBanco, data: { modalOrder: 3 } },
                        ]
                    },
                ]
            },
            { path: 'excluir/:invoice_id', component: DeleteComponent, data: { modalOrder: 1 } },
            MyAccountRouter,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }
