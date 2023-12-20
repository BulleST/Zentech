import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormEvento } from '../contrato-evento/form/form.component';
import { FormComponent as FormTipo } from '../contrato-tipo/form/form.component';
import { DeleteComponent as DeleteEvento } from '../contrato-evento/delete/delete.component';
import { DeleteComponent as DeleteTipo } from '../contrato-tipo/delete/delete.component';
import { FormComponent as FormInvoice } from '../invoice/form/form.component';

const routes: Routes = [
  {
    path: '', component: ListComponent, children: [
      {
        path: 'cadastrar', component: FormComponent, children: [
          { path: 'evento', component: FormEvento },
          { path: 'editar/evento/:evento_id', component: FormEvento },
          { path: 'excluir/evento/:evento_id', component: DeleteEvento  },
          { path: 'tipo', component: FormTipo },
          { path: 'editar/tipo/:tipo_id', component: FormTipo },
          { path: 'excluir/tipo/:tipo_id', component: DeleteTipo },
          { path: 'invoice', component: FormInvoice },
        ]
      },
      { path: 'editar/:contrato_id', component: FormComponent },
      { path: 'excluir/:contrato_id', component: DeleteComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
