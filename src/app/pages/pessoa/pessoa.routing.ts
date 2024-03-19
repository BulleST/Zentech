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
import { Role } from 'src/app/models/account-perfil.model';
import { RoleGuard } from 'src/app/guards/role.guard';


const routes: Routes = [
    {
        path: '', 
        component: PessoaComponent, children: [
            {
                path: '', 
                component: ListComponent, 
                title: 'Zentech - Pessoas', children: [
                    { 
                        path: 'cadastrar', 
                        title: 'Zentech - Cadastrar Pessoa',
                        component: CreateComponent, 
                        data: { modalOrder: 1 }, 
                    },
                    { 
                        path: 'cadastrar-operacao/:pessoa_id', 
                        title: 'Zentech - Cadastrar Operação',
                        component: FormOperacaoComponent, 
                        data: { modalOrder: 1 }, 
                    },
                    { 
                        path: 'cadastrar-saldo/:pessoa_id', 
                        title: 'Zentech - Cadastrar Saldo',
                        component: CreateSaldoComponent, 
                        data: { modalOrder: 1 }, 
                    },
                    { 
                        path: 'importar', 
                        title: 'Zentech - Importar Arquivo',
                        component: ImportacaoArquivoComponent, 
                        data: { modalOrder: 1 }, 
                    },
                    { 
                        path: 'excluir/:pessoa_id', 
                        title: 'Zentech - Excluir Pessoa' ,
                        component: DeleteComponent, 
                        data: { modalOrder: 1, roles: [Role.Admin, Role.Master] },
                        canActivate: [RoleGuard], 
                    },
                    MyAccountRouter
                ]
            
            },
            {
                path: 'detalhes/:pessoa_id', 
                title: 'Zentech - Pessoa', 
                component: DetailsComponent, children: [
                    { 
                        path: 'saldo/cadastrar', 
                        title: 'Zentech - Cadastrar Saldo', 
                        component: CreateSaldoComponent, 
                        data: { modalOrder: 1 }
                    },
                    { 
                        path: 'saldo/excluir/:saldo_id', 
                        title: 'Zentech - Excluir Saldo', 
                        component: DeleteSaldoComponent, 
                        data: { modalOrder: 1, roles: [Role.Admin, Role.Master] },
                        canActivate: [RoleGuard] 
                    },
                    {
                        path: 'operacao/cadastrar', 
                        title: 'Zentech - Cadastrar Operação', 
                        component: FormOperacaoComponent, 
                        data: { modalOrder: 1 }, children: [

                            { 
                                path: 'moeda', 
                                title: 'Zentech - Cadastrar Moeda', 
                                component: FormMoeda, 
                                data: { modalOrder: 2 } 
                            },
                            { 
                                path: 'moeda/:moeda_id', 
                                title: 'Zentech - Editar Moeda', 
                                component: FormMoeda, 
                                data: { modalOrder: 2 } 
                            },
                            { 
                                path: 'moeda/excluir/:moeda_id', 
                                title: 'Zentech - Excluir Moeda', 
                                component: DeleteMoeda, 
                                canActivate: [RoleGuard], 
                                data: { modalOrder: 2, roles: [Role.Admin] } 
                            },
                        ]
                    
                    },
                    {
                        path: 'operacao/editar/:operacao_id', 
                        component: FormOperacaoComponent, 
                        data: { modalOrder: 1 }, children: [

                            { 
                                path: 'moeda', 
                                title: 'Zentech - Cadastrar Moeda', 
                                component: FormMoeda, 
                                data: { modalOrder: 2 } 
                            },
                            { 
                                path: 'moeda/:moeda_id', 
                                title: 'Zentech - Editar Moeda', 
                                component: FormMoeda, 
                                data: { modalOrder: 2 } 
                            },
                            { 
                                path: 'moeda/excluir/:moeda_id', 
                                title: 'Zentech - Excluir Moeda', 
                                component: DeleteMoeda, 
                                canActivate: [RoleGuard], 
                                data: { modalOrder: 2, roles: [Role.Admin] } 
                            },
                        ]
                    },
                    { 
                        path: 'operacao/detalhes/:operacao_id', 
                        title: 'Zentech - Operação', 
                        component: DetalhesOperacaoComponent, 
                        data: { modalOrder: 1 }
                    },
                    { 
                        path: 'operacao/excluir/:operacao_id', 
                        title: 'Zentech - Excluir Operação', 
                        component: DeleteOperacaoComponent, 
                        canActivate: [RoleGuard], 
                        data: { modalOrder: 1, roles: [Role.Admin, Role.Master] } 
                    },
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
