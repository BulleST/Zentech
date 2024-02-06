import { BancoRoutingModule } from './banco.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DeleteComponent } from './delete/delete.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    declarations: [
        ListComponent,
        DeleteComponent

    ],
    imports: [
        CommonModule,
        BancoRoutingModule,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        SharedModule,
        TableModule,
        CalendarModule,
        NgxMaskDirective, 
        NgxMaskPipe,
        FieldsetModule,
    ],
    providers: [
        provideNgxMask()
    ]
})
export class BancoModule { }
