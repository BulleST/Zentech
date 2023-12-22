import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 } },
        { path: 'editar/:instituicaoFinanceira_id', component: FormComponent, data: { modalOrder: 1 } },
        { path: 'excluir/:instituicaoFinanceira_id', component: DeleteComponent, data: { modalOrder: 1 } },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituicaoFinanceiraRoutingModule { }
