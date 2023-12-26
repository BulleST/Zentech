import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from 'src/app/shared/my-account/my-account.component';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';

const painelCPF = () => import('./../pessoa/pessoa.module').then(x => x.PessoaModule);
const usuarios = () => import('./../usuarios/usuarios.module').then(x => x.UsuariosModule);
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
            { path: 'painel-cpf/pessoas', loadChildren: painelCPF },
            { path: 'painel-cpf/operacoes', loadChildren: operacoes },
            { path: 'invoice', loadChildren: invoice },
            { path: 'instituicao-financeira', loadChildren: instituicaoFinanceira },
            { path: 'banco', loadChildren: banco },
            { path: 'beneficiario', loadChildren: beneficiario },
            { path: 'swift', loadChildren: documentoSwift},
            { path: 'contrato', loadChildren: contrato},
            { path: 'usuarios', loadChildren: usuarios},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InitialRoutingModule { }


