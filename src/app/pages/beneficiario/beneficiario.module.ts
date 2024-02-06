import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
// import { FormComponent } from './form/form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
// import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DeleteComponent } from './delete/delete.component';
import { BeneficiarioRoutingModule } from './beneficiario.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
    declarations: [
        ListComponent,
        DeleteComponent
    ],
    imports: [
        CommonModule,
        BeneficiarioRoutingModule,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        SharedModule,
        TableModule,
        CalendarModule,
        NgxMaskDirective, 
        NgxMaskPipe,
        FileUploadModule
    ],
    providers: [
        provideNgxMask()
    ]
})
export class BeneficiarioModule { }
