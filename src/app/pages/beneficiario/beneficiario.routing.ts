import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormBanco } from './../banco/form/form.component';

const routes: Routes = [
    {
        path: '', component: ListComponent, children: [
            {
                path: 'cadastrar', component: FormComponent, children: [
                    { path: 'banco', component: FormBanco },
                ]
            },
            {
                path: 'editar/:beneficiario_id', component: FormComponent, children: [
                    { path: 'banco', component: FormBanco },
                ]
            },
            { path: 'excluir/:beneficiario_id', component: DeleteComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BeneficiarioRoutingModule { }
