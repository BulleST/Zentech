import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
    { path: '', component: FormComponent },
    { path: ':moeda_id', component: FormComponent },
    { path: ':moeda_id', component: DeleteComponent },
    { path: 'list', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent },
        { path: 'editar/:moeda_id', component: FormComponent },
        { path: 'excluir/:moeda_id', component: DeleteComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoedaRoutingModule { }
