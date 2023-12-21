import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
// import { FormComponent } from './form/form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DeleteComponent } from './delete/delete.component';
import { BeneficiarioRoutingModule } from './beneficiario.routing';

@NgModule({
    declarations: [
        ListComponent,
        // FormComponent,
        DeleteComponent
    ],
    imports: [
        CommonModule,
        BeneficiarioRoutingModule,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        NgxMaskModule.forChild(),
        SharedModule,
        TableModule,
        CalendarModule,
    ],
})
export class BeneficiarioModule { }
