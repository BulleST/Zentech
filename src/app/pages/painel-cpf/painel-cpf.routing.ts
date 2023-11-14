import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelCpfComponent } from './painel-cpf.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
        path: '', component: PainelCpfComponent, children: [
            { path: '', component: ListComponent, children: [
                { path: 'cadastrar', component: CreateComponent },
                { path: 'importar', component: ImportacaoComponent },
                { path: 'relatorio/:id', component: RelatorioComponent },
                { path: 'detalhes/:id', component: DetailsComponent },
                { path: 'excluir/:id', component: DeleteComponent },                   
                { path: 'minha-conta', loadComponent: () => import('./../initial/my-account/my-account.component').then(x => x.MyAccountComponent), children: [
                ]  }

            ] },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PainelCpfRoutingModule { }
