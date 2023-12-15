import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';

const banco = () => import('../banco/banco.module').then(x => x.BancoModule);

const routes: Routes = [
    {
        path: '', component: ListComponent, children: [
            {
                path: 'cadastrar', component: FormComponent, children: [
                    { path: 'banco', loadChildren: banco },
                ]
            },
            { path: 'editar/:invoice_id', component: FormComponent, children: [
                { path: 'banco', loadChildren: banco },
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
