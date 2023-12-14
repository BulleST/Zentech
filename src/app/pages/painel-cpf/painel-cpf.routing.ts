import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelCpfComponent } from './painel-cpf.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { DeleteSaldoComponent } from './saldo/delete-saldo/delete-saldo.component';
import { CreateSaldoComponent } from './saldo/create-saldo/create-saldo.component';
import { FormOperacaoComponent } from './operacao/form-operacao/form-operacao.component';
import { DeleteOperacaoComponent } from './operacao/delete-operacao/delete-operacao.component';
import { DetalhesOperacaoComponent } from './operacao/detalhes-operacao/detalhes-operacao.component';
import { ImportacaoArquivoComponent } from './importacao-arquivo/importacao-arquivo.component';


const routes: Routes = [
    { path: '', component: PainelCpfComponent, children: [
            { path: '', component: ListComponent, children: [
                    { path: 'cadastrar', component: CreateComponent },
                    { path: 'cadastrar-operacao/:pessoa_id', component: FormOperacaoComponent },
                    { path: 'cadastrar-saldo/:pessoa_id', component: CreateSaldoComponent },
                    { path: 'importar', component: ImportacaoArquivoComponent },
                    { path: 'excluir/:pessoa_id', component: DeleteComponent },
                    { path: 'minha-conta', loadComponent: () => import('./../initial/my-account/my-account.component').then(x => x.MyAccountComponent) }
                ]
            },
            { path: 'detalhes/:pessoa_id', component: DetailsComponent, children: [
                { path: 'saldo/cadastrar', component: CreateSaldoComponent },
                { path: 'saldo/excluir/:saldo_id', component: DeleteSaldoComponent },
                { path: 'operacao/cadastrar', component: FormOperacaoComponent },
                { path: 'operacao/editar/:operacao_id', component: FormOperacaoComponent},
                { path: 'operacao/detalhes/:operacao_id', component: DetalhesOperacaoComponent },
                { path: 'operacao/excluir/:operacao_id', component: DeleteOperacaoComponent },
            ] },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PainelCpfRoutingModule { }
