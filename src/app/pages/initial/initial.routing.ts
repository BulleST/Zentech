import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial.component';
import { HomeComponent } from './home/home.component';

const painelCPF = () => import('./../painel-cpf/painel-cpf.module').then(x => x.PainelCpfModule);
const usuarios = () => import('./../usuarios/usuarios.module').then(x => x.UsuariosModule);

const routes: Routes = [
    { path: '', component: InitialComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'painel-cpf', loadChildren: painelCPF },
        { path: 'usuarios', loadChildren: usuarios },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialRoutingModule { }


