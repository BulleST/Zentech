import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormInvoice } from '../invoice/form/form.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent,  children: [
          { path: 'invoice', component: FormInvoice }
        ] },
        { path: 'editar/:documento-swift_id', component: FormComponent , children: [
          { path: 'invoice', component: FormInvoice }
        ] },
        { path: 'excluir/:documento-swift_id', component: DeleteComponent },

    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoSwiftRoutingModule { }
