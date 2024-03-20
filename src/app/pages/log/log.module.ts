import { LogRoutingModule } from './log.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
// import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormComponent } from './form/form.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TypeofPipe } from 'src/app/utils/typeof.pipe';

@NgModule({
    declarations: [
        ListComponent,
        FormComponent,
        TypeofPipe
    ],
    imports: [
        CommonModule,
        LogRoutingModule,
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
        provideNgxMask(),
    ]
})
export class LogModule { }
