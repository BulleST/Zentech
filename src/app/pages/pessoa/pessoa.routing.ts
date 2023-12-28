import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { DeleteSaldoComponent } from './saldo/delete-saldo/delete-saldo.component';
import { CreateSaldoComponent } from './saldo/create-saldo/create-saldo.component';
import { FormOperacaoComponent } from './operacao/form-operacao/form-operacao.component';
import { DeleteOperacaoComponent } from './operacao/delete-operacao/delete-operacao.component';
import { DetalhesOperacaoComponent } from './operacao/detalhes-operacao/detalhes-operacao.component';
import { ImportacaoArquivoComponent } from './importacao-arquivo/importacao-arquivo.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { FormComponent as FormMoeda } from './../moeda/form/form.component';
import { DeleteComponent as DeleteMoeda } from '../moeda/delete/delete.component';


const routes: Routes = [
    {
        path: '', component: PessoaComponent, children: [
            {
                path: '', component: ListComponent, children: [
                    { path: 'cadastrar', component: CreateComponent, data: { modalOrder: 1 } },
                    { path: 'cadastrar-operacao/:pessoa_id', component: FormOperacaoComponent, data: { modalOrder: 1 } },
                    { path: 'cadastrar-saldo/:pessoa_id', component: CreateSaldoComponent, data: { modalOrder: 1 } },
                    { path: 'importar', component: ImportacaoArquivoComponent, data: { modalOrder: 1 } },
                    { path: 'excluir/:pessoa_id', component: DeleteComponent, data: { modalOrder: 1 } },
                    MyAccountRouter
                ]
            },
            {
                path: 'detalhes/:pessoa_id', component: DetailsComponent, children: [
                    { path: 'saldo/cadastrar', component: CreateSaldoComponent, data: { modalOrder: 1 } },
                    { path: 'saldo/excluir/:saldo_id', component: DeleteSaldoComponent, data: { modalOrder: 1 } },
                    {
                        path: 'operacao/cadastrar', component: FormOperacaoComponent, data: { modalOrder: 1 }, children: [

                            { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 } },
                            { path: 'moeda/:moeda_id', component: FormMoeda, data: { modalOrder: 2 } },
                            { path: 'moeda/excluir/:moeda_id', component: DeleteMoeda, data: { modalOrder: 2 } },
                        ]
                    },
                    {
                        path: 'operacao/editar/:operacao_id', component: FormOperacaoComponent, data: { modalOrder: 1 },  children: [

                            { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 } },
                            { path: 'moeda/:moeda_id', component: FormMoeda, data: { modalOrder: 2 } },
                            { path: 'moeda/excluir/:moeda_id', component: DeleteMoeda, data: { modalOrder: 2 } },
                        ]
                    },
                    { path: 'operacao/detalhes/:operacao_id', component: DetalhesOperacaoComponent, data: { modalOrder: 1 } },
                    { path: 'operacao/excluir/:operacao_id', component: DeleteOperacaoComponent, data: { modalOrder: 1 } },
                    MyAccountRouter
                ]
            },
            MyAccountRouter,
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoaRoutingModule { }
