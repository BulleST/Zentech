import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormInvoice } from '../invoice/form/form.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent,  data: { modalOrder: 1 } ,children: [
          { path: 'invoice', component: FormInvoice, data: { modalOrder: 2}  }
        ] },
        { path: 'editar/:documento-swift_id', component: FormComponent , data: { modalOrder: 1 }, children: [
          { path: 'invoice', component: FormInvoice, data: { modalOrder: 2} }
        ] },
        { path: 'excluir/:documento-swift_id', component: DeleteComponent,  data: { modalOrder: 1 } },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoSwiftRoutingModule { }
