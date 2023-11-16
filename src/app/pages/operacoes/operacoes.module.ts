import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperacoesRoutingModule } from './operacoes.routing';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    OperacoesRoutingModule,
    FontAwesomeModule,
    DropdownModule,
    FormsModule,
    NgxMaskModule.forChild(),
    SharedModule,
  ]
})
export class OperacoesModule { }
