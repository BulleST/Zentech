import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { OperacoesRoutingModule } from './operacoes.routing';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImportacaoComponent } from './importacao/importacao.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DetailsComponent } from './details/details.component';

// registerLocaleData(localePt);

@NgModule({
    declarations: [
        FormComponent,
        ListComponent,
        DeleteComponent,
        ImportacaoComponent,
        DetailsComponent,
    ],
    imports: [
        CommonModule,
        OperacoesRoutingModule,
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
export class OperacoesModule { }
