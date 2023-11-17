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
import { CreateOperacaoComponent } from './operacao/create-operacao/create-operacao.component';
import { EditOperacaoComponent } from './operacao/edit-operacao/edit-operacao.component';
import { DeleteOperacaoComponent } from './operacao/delete-operacao/delete-operacao.component';


const routes: Routes = [
    { path: '', component: PainelCpfComponent, children: [
            { path: '', component: ListComponent, children: [
                    { path: 'cadastrar', component: CreateComponent },
                    { path: 'cadastrar-operacao/:pessoa_id', component: CreateOperacaoComponent },
                    { path: 'cadastrar-saldo/:pessoa_id', component: CreateSaldoComponent },
                    { path: 'importar', component: ImportacaoComponent },
                    { path: 'excluir/:pessoa_id', component: DeleteComponent },
                    { path: 'minha-conta', loadComponent: () => import('./../initial/my-account/my-account.component').then(x => x.MyAccountComponent) }
                ]
            },
            { path: 'detalhes/:pessoa_id', component: DetailsComponent, children: [
                { path: 'saldo/cadastrar', component: CreateSaldoComponent },
                { path: 'saldo/excluir/:saldo_id', component: DeleteSaldoComponent },
                { path: 'operacao/cadastrar', component: CreateOperacaoComponent },
                { path: 'operacao/editar/:operacao_id', component: EditOperacaoComponent},
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
