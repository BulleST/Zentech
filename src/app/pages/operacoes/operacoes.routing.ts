import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { ExportacaoComponent } from './exportacao/exportacao.component';
import { ImportacaoArquivoComponent } from './importacao-arquivo/importacao-arquivo.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 } },
        { path: 'exportar', component: ExportacaoComponent, data: { modalOrder: 1 } },
        { path: 'importar', component: ImportacaoArquivoComponent, data: { modalOrder: 1 } },
        { path: 'editar/:operacao_id', component: FormComponent, data: { modalOrder: 1 } },
        { path: 'detalhes/:operacao_id', component: DetailsComponent, data: { modalOrder: 1 } },
        { path: 'excluir/:operacao_id', component: DeleteComponent, data: { modalOrder: 1 } },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacoesRoutingModule { }
