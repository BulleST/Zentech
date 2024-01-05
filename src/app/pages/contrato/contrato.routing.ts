import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
    {
        path: '', component: ListComponent, title: 'Zentech - Contratos', children: [
            { path: 'editar/:contrato_id', component: FormComponent, title: 'Zentech - Editar Contrato', data: { modalOrder: 1 } },
            MyAccountRouter,
        ]

    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContratoRoutingModule { }
