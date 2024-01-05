import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from 'src/app/shared/my-account/my-account.component';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const painelCPF = () => import('./../pessoa/pessoa.module').then(x => x.PessoaModule);
const usuarios = () => import('./../usuarios/usuarios.module').then(x => x.UsuariosModule);
const operacoes = () => import('./../operacoes/operacoes.module').then(x => x.OperacoesModule);
const invoice = () => import('./../invoice/invoice.module').then(x => x.InvoiceModule);
const contrato = () => import('../contrato/contrato.module').then(x => x.ContratoModule);
const instituicaoFinanceira = () => import('../instituicao-financeira/instituicao-financeira.module').then(x => x.InstituicaoFinanceiraModule);
const banco = () => import('./../banco/banco.module').then(x => x.BancoModule);
const beneficiario = () => import('../beneficiario/beneficiario.module').then(x => x.BeneficiarioModule);
const representante = () => import('../representante/representante.module').then(x => x.RepresentanteModule);
const empresa = () => import('../empresa/empresa.module').then(x => x.EmpresaModule);
const log = () => import('../log/log.module').then(x => x.LogModule);


const routes: Routes = [
    {
        path: '', component: InitialComponent, children: [
            {
                path: '', component: HomeComponent , children: [
                    { path: 'minha-conta', component: MyAccountComponent, children: [
                        { path:  'change-password', component: ChangePasswordComponent }
                    ] },
                ]
            },


            { path: 'painel-cpf/pessoas', loadChildren: painelCPF  },
            { path: 'painel-cpf/operacoes', loadChildren: operacoes  },
            { path: 'invoice', loadChildren: invoice  },
            { path: 'instituicao-financeira', loadChildren: instituicaoFinanceira  },
            { path: 'banco', loadChildren: banco  },
            { path: 'beneficiario', loadChildren: beneficiario  },
            { path: 'contrato', loadChildren: contrato },
            { path: 'representante', loadChildren: representante },
            { path: 'usuarios', loadChildren: usuarios },
            { path: 'empresa', loadChildren: empresa },
            { path: 'log-acoes', loadChildren: log},

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InitialRoutingModule { }


