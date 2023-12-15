import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
// import { ImportacaoComponent } from './importacao/importacao.component';
// import { DetailsComponent } from './details/details.component';



const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent },
        // { path: 'importar', component: ImportacaoComponent },
        { path: 'editar/:id', component: FormComponent },
        // { path: 'detalhes/:operacao_id', component: DetailsComponent },
        { path: 'excluir/:id', component: DeleteComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }