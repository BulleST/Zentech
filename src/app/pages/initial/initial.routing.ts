import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial.component';
import { HomeComponent } from './home/home.component';

const analise = () => import('./../analise/analise.module').then(x => x.AnaliseModule);
const painelCPF = () => import('./../painel-cpf/painel-cpf.module').then(x => x.PainelCpfModule);
const operacoes = () => import('./../operacoes/operacoes.module').then(x => x.OperacoesModule);
const usuarios = () => import('./../usuarios/usuarios.module').then(x => x.UsuariosModule);

const routes: Routes = [
    {
        path: '', component: InitialComponent, children: [
            {
                path: '', component: HomeComponent, children: [
                    { path: 'minha-conta', loadComponent: () => import('./my-account/my-account.component').then(x => x.MyAccountComponent), children: [
                    ] }
                ]
            },
            { path: 'analise', loadChildren: analise},
            { path: 'painel-cpf', loadChildren: painelCPF},
            { path: 'operacoes', loadChildren: operacoes},
            { path: 'usuarios', loadChildren: usuarios},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InitialRoutingModule { }


