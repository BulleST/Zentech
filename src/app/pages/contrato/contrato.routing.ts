import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { FormComponent as FormInvoice } from '../invoice/form/form.component';
import { ListComponent } from './list/list.component';
import { FormComponent as FormMoeda } from './../moeda/form/form.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
    {
        path: '', component: ListComponent, children: [

            {
                path: 'editar/:contrato_id', component: FormComponent, data: { modalOrder: 1 }, children: [
                    {
                        path: 'invoice', component: FormInvoice, data: { modalOrder: 2 }, children: [
                            { path: 'moeda', component: FormMoeda, data: { modalOrder: 3 } },
                        ]
                    },
                ]
            },
            MyAccountRouter,
        ]

    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContratoRoutingModule { }
