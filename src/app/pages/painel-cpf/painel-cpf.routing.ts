import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelCpfComponent } from './painel-cpf.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { DeleteSaldoComponent } from './details/saldo/delete-saldo/delete-saldo.component';
import { CreateSaldoComponent } from './details/saldo/create-saldo/create-saldo.component';
import { OperacaoComponent } from './operacao/operacao.component';

const routes: Routes = [
    { path: '', component: PainelCpfComponent, children: [
            { path: '', component: ListComponent, children: [
                    { path: 'cadastrar', component: CreateComponent },
                    { path: 'cadastrar-operacao/:pessoa_id', component: OperacaoComponent },
                    { path: 'importar', component: ImportacaoComponent },
                    { path: 'excluir/:pessoa_id', component: DeleteComponent },
                    { path: 'minha-conta', loadComponent: () => import('./../initial/my-account/my-account.component').then(x => x.MyAccountComponent) }
                ]
            },
            { path: 'detalhes/:pessoa_id', component: DetailsComponent, children: [
                    { path: 'cadastrar-saldo', component: CreateSaldoComponent },
                    { path: 'excluir-saldo/:saldo_id', component: DeleteSaldoComponent },
                    { path: 'excluir/:pessoa_id', component: DeleteComponent },
                ]
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PainelCpfRoutingModule { }
