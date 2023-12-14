import { InstituicaoFinanceiraRoutingModule } from './instituicao-financeira.routing';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { ListComponent } from './list/list.component';


import { FormComponent } from './form/form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from '../painel-cpf/details/details.component';



// registerLocaleData(localePt);

@NgModule({
    declarations: [
        ListComponent,
        FormComponent,
DeleteComponent


    ],
    imports: [
        CommonModule,
        InstituicaoFinanceiraRoutingModule ,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        NgxMaskModule.forChild(),
        SharedModule,
        TableModule,
        CalendarModule,
    ],
    providers: [
        // CurrencyPipe,
        // MaskPipe,
        // DatePipe,
        // { provide: LOCALE_ID, useValue: 'pt-BR' },
        // { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    ]
})
export class InstituicaoFinanceiraModule { }
