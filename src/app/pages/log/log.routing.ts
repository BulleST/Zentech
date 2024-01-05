import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
      { path: 'detalhes/:log-acoes_id', component: FormComponent, data: { modalOrder: 1 } },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
