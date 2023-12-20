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



const routes: Routes = [
    {
        path: '', component: ListComponent, children: [
            {
                path: 'cadastrar', component: FormComponent, children: [
                    { path: 'banco', component: FormBanco },
                    { path: 'moeda', component: FormMoeda },
                    { path: 'editar/moeda/:moeda_id', component: FormMoeda },
                    { path: 'excluir/moeda/:moeda_id', component: DeleteMoeda},
                    { path: 'instituicao-financeira', component: FormInstituicaoFinanceira },
                    { path: 'beneficiario', component: FormBeneficiario, children: [
                        { path: 'banco', component: FormBanco },
                    ] },
                ]
            },
            { path: 'editar/:invoice_id', component: FormComponent, children: [
                { path: 'banco', component: FormBanco },
                { path: 'moeda', component: FormMoeda },
                { path: 'instituicao-financeira', component: FormInstituicaoFinanceira },
                { path: 'beneficiario', component: FormBeneficiario, children: [
                    { path: 'banco', component: FormBanco },
                ] },
            ] },
            { path: 'excluir/:invoice_id', component: DeleteComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }
