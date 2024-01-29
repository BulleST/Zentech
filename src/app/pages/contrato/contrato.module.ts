import { ContratoRoutingModule } from './contrato.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormComponent } from './form/form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
// import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    declarations: [
        ListComponent,
        // FormComponent,
    ],
    imports: [
        CommonModule,
        ContratoRoutingModule ,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        // NgxMaskModule.forChild(),
        SharedModule,
        TableModule,
        CalendarModule,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask()
    ]
})
export class ContratoModule { }
