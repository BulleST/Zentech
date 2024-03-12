import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice.routing';
import { ListComponent } from './list/list.component';
// import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormContratoBicolunadoComponent } from './form-contrato-bicolunado/form-contrato-bicolunado.component';
import { FormComponent } from './form/form.component';
import { LibrariesModule } from 'src/app/shared/libraries.module';
import { FormContratoComponent } from './form/form-contrato/form-contrato.component';
import { FormInvoiceComponent } from './form/form-invoice/form-invoice.component';
import { FormSwiftComponent } from './form/form-swift/form-swift.component';

@NgModule({
    declarations: [
        ListComponent,
        // FormComponent,
        DeleteComponent,
        FormContratoBicolunadoComponent,
        FormComponent,
        FormContratoComponent,
        FormInvoiceComponent,
        FormSwiftComponent
    ],
    imports: [
        CommonModule,
        InvoiceRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        LibrariesModule
    ]
})
export class InvoiceModule { }
