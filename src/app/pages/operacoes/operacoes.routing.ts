import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { ExportacaoComponent } from './exportacao/exportacao.component';
import { ImportacaoArquivoComponent } from './importacao-arquivo/importacao-arquivo.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';
import { FormComponent as FormMoeda } from './../moeda/form/form.component';
import { DeleteComponent as DeleteMoeda } from '../moeda/delete/delete.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from 'src/app/models/account-perfil.model';

const routes: Routes = [
    { path: '', component: ListComponent, title: 'Zentech - Operações', children: [
        { path: 'cadastrar', component: FormComponent, title: 'Zentech - Cadastrar Operação', data: { modalOrder: 1 }, children: [
            { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Cadastrar Moeda' },
            { path: 'moeda/:moeda_id', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Editar Moeda' },
            { path: 'moeda/excluir/:moeda_id', component: DeleteMoeda, canActivate: [RoleGuard], data: { modalOrder: 2, roles: [Role.Admin] }, title: 'Zentech - Excluir Moeda' },
        ] },
        { path: 'exportar', component: ExportacaoComponent, title: 'Zentech - Exportar Operações', data: { modalOrder: 1 } },
        { path: 'importar', component: ImportacaoArquivoComponent, title: 'Zentech - Importar Operações', data: { modalOrder: 1 } },
        { path: 'editar/:operacao_id', component: FormComponent, title: 'Zentech - Editar Operação', data: { modalOrder: 1 }, children: [
            { path: 'moeda', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Cadastrar Moeda' },
            { path: 'moeda/:moeda_id', component: FormMoeda, data: { modalOrder: 2 }, title: 'Zentech - Editar Moeda' },
            { path: 'moeda/excluir/:moeda_id', component: DeleteMoeda, canActivate: [RoleGuard], data: { modalOrder: 2, roles: [Role.Admin] }, title: 'Zentech - Excluir Moeda' },
        ] },
        { path: 'detalhes/:operacao_id', component: DetailsComponent, title: 'Zentech - Operação', data: { modalOrder: 1 } },
        { path: 'excluir/:operacao_id', component: DeleteComponent, title: 'Zentech - Excluir Operação', canActivate: [RoleGuard], data: { modalOrder: 1, roles: [Role.Admin, Role.Master] } },
        MyAccountRouter,
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacoesRoutingModule { }
