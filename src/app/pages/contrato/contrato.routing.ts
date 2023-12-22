import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormComponent as FormEvento } from '../contrato-evento/form/form.component';
import { FormComponent as FormTipo } from '../contrato-tipo/form/form.component';
import { DeleteComponent as DeleteEvento } from '../contrato-evento/delete/delete.component';
import { DeleteComponent as DeleteTipo } from '../contrato-tipo/delete/delete.component';
import { FormComponent as FormInvoice } from '../invoice/form/form.component';
import { ListComponent } from './list/list.component';
import { FormComponent as FormBanco } from '../banco/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from '../instituicao-financeira/form/form.component';
import { FormComponent as FormMoeda } from './../moeda/form/form.component';
import { FormComponent as FormBeneficiario } from './../beneficiario/form/form.component';
import { MyAccountRouter } from 'src/app/utils/my-account-router';

const routes: Routes = [
  {
    path: '', component: ListComponent, children: [
      {
        path: 'cadastrar', component: FormComponent, data: { modalOrder: 1 }, children: [
          { path: 'tipo', component: FormTipo, data: { modalOrder: 2 } },
          { path: 'evento', component: FormEvento, data: { modalOrder: 2 }  },
          {
            path: 'invoice', component: FormInvoice, data: { modalOrder: 2 }, children: [
                { path: 'banco', component: FormBanco, data: { modalOrder: 3 } },
                { path: 'instituicao-financeira', component: FormInstituicaoFinanceira, data: { modalOrder: 3 } },
                { path: 'moeda', component: FormMoeda, data: { modalOrder: 3 } },
                {
                  path: 'beneficiario', component: FormBeneficiario, data: { modalOrder: 3 }, children: [
                      { path: 'banco', component: FormBanco, data: { modalOrder: 4 } },
                  ]
              },
            ]
        },
          { path: 'editar/evento/:evento_id', component: FormEvento },
          { path: 'excluir/evento/:evento_id', component: DeleteEvento  },
          { path: 'editar/tipo/:tipo_id', component: FormTipo },
          { path: 'excluir/tipo/:tipo_id', component: DeleteTipo },
        ]
      },
      { path: 'editar/:contrato_id', component: FormComponent,  data: { modalOrder: 1 }, children: [
        { path: 'tipo', component: FormTipo, data: { modalOrder: 2 } },
        { path: 'evento', component: FormEvento, data: { modalOrder: 2 }  },
        {
          path: 'invoice', component: FormInvoice, data: { modalOrder: 2 }, children: [
              { path: 'banco', component: FormBanco, data: { modalOrder: 3 } },
              { path: 'instituicao-financeira', component: FormInstituicaoFinanceira, data: { modalOrder: 3 } },
              { path: 'moeda', component: FormMoeda, data: { modalOrder: 3 } },
              {
                path: 'beneficiario', component: FormBeneficiario, data: { modalOrder: 3 }, children: [
                    { path: 'banco', component: FormBanco, data: { modalOrder: 4 } },
                ]
            },
          ]
      },
        { path: 'editar/evento/:evento_id', component: FormEvento },
        { path: 'excluir/evento/:evento_id', component: DeleteEvento  },
        { path: 'editar/tipo/:tipo_id', component: FormTipo },
        { path: 'excluir/tipo/:tipo_id', component: DeleteTipo },
      ] },
      { path: 'excluir/:contrato_id', component: DeleteComponent },
      MyAccountRouter,
    ]

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
