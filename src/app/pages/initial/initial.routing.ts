import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from 'src/app/shared/my-account/my-account.component';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';

const analise = () => import('./../analise/analise.module').then(x => x.AnaliseModule);
const painelCPF = () => import('./../painel-cpf/painel-cpf.module').then(x => x.PainelCpfModule);
const operacoes = () => import('./../operacoes/operacoes.module').then(x => x.OperacoesModule);
const invoice = () => import('./../invoice/invoice.module').then(x => x.InvoiceModule);
const contrato = () => import('../contrato/contrato.module').then(x => x.ContratoModule);
const documentoSwift = () => import('../documento-swift/documento-swift.module').then(x => x.DocumentoSwiftModule);
const instituicaoFinanceira = () => import('../instituicao-financeira/instituicao-financeira.module').then(x => x.InstituicaoFinanceiraModule);
const banco = () => import('./../banco/banco.module').then(x => x.BancoModule);
const beneficiario = () => import('../beneficiario/beneficiario.module').then(x => x.BeneficiarioModule);
const routes: Routes = [
    {
        path: '', component: InitialComponent, children: [
            {
                path: '', component: HomeComponent, children: [
                    { path: 'minha-conta', component: MyAccountComponent, children: [
                        { path:  'change-password', component: ChangePasswordComponent }
                    ] },
                ]
            },
            { path: 'analise', loadChildren: analise },
            { path: 'painel-cpf', loadChildren: painelCPF },
            { path: 'operacoes', loadChildren: operacoes },
            { path: 'invoice', loadChildren: invoice },
            { path: 'instituicao-financeira', loadChildren: instituicaoFinanceira },
            { path: 'banco', loadChildren: banco },
            { path: 'beneficiario', loadChildren: beneficiario },
            { path: 'swift', loadChildren: documentoSwift},
            { path: 'contrato', loadChildren: contrato},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InitialRoutingModule { }


