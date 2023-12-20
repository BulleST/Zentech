import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice.routing';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
    declarations: [
        ListComponent,
        // FormComponent,
        DeleteComponent
    ],
    imports: [
        CommonModule,
        InvoiceRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        DropdownModule


    ],
    exports: [
      FormComponent
  ]
})
export class InvoiceModule { }
