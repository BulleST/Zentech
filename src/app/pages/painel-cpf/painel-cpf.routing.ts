import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelCpfComponent } from './painel-cpf.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
    {
        path: '', component: PainelCpfComponent, children: [
            { path: '', component: ListComponent, children: [
                { path: 'cadastrar', component: CreateComponent },
                { path: 'importar', component: ImportacaoComponent },
                { path: 'relatorio/:id', component: RelatorioComponent }
            ] },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PainelCpfRoutingModule { }
