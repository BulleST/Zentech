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
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { SaldoComponent } from './details/saldo/saldo.component';
import { DeleteSaldoComponent } from './details/saldo/delete-saldo/delete-saldo.component';
import { TabViewModule } from 'primeng/tabview';
import { CreateSaldoComponent } from './details/saldo/create-saldo/create-saldo.component';
import { OperacaoComponent } from './operacao/operacao.component';
@NgModule({
    declarations: [
        PainelCpfComponent,
        ListComponent,
        CreateComponent,
        RelatorioComponent,
        ImportacaoComponent,
        DeleteComponent,
        DetailsComponent,
        SaldoComponent,
        DeleteSaldoComponent,
        CreateSaldoComponent,
        OperacaoComponent
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
        CalendarModule,
        TabViewModule,
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
