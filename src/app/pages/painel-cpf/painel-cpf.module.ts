import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown'
import localePt from '@angular/common/locales/pt';

import { PainelCpfRoutingModule } from './painel-cpf.routing';
import { PainelCpfComponent } from './painel-cpf.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ImportacaoComponent } from './importacao/importacao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
registerLocaleData(localePt);

import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
    declarations: [
        PainelCpfComponent,
        ListComponent,
        CreateComponent,
        RelatorioComponent,
        ImportacaoComponent,
    ],
    imports: [
        CommonModule,
        PainelCpfRoutingModule,
        TableModule,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        NgxMaskModule.forChild(),
        AccordionModule,
        SharedModule,
        TagModule,
        InputTextModule,
        CalendarModule
    ],
    providers: [
        CurrencyPipe,
        MaskPipe,
        DatePipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    ]
})
export class PainelCpfModule { }
