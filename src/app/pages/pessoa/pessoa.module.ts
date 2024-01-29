import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown'
import localePt from '@angular/common/locales/pt';

import { PessoaRoutingModule } from './pessoa.routing';
import { PessoaComponent } from './pessoa.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { SaldoComponent } from './saldo/saldo.component';
import { DeleteSaldoComponent } from './saldo/delete-saldo/delete-saldo.component';
import { CreateSaldoComponent } from './saldo/create-saldo/create-saldo.component';
import { TabViewModule } from 'primeng/tabview';
import { OperacaoComponent } from './operacao/operacao.component';
import { FormOperacaoComponent } from './operacao/form-operacao/form-operacao.component';
import { DeleteOperacaoComponent } from './operacao/delete-operacao/delete-operacao.component';
import { DetalhesOperacaoComponent } from './operacao/detalhes-operacao/detalhes-operacao.component';
import { ImportacaoArquivoComponent } from './importacao-arquivo/importacao-arquivo.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

registerLocaleData(localePt);
@NgModule({
    declarations: [
        PessoaComponent,
        ListComponent,
        CreateComponent,
        DeleteComponent,
        DetailsComponent,

        SaldoComponent,
        CreateSaldoComponent,
        DeleteSaldoComponent,

        OperacaoComponent,
        FormOperacaoComponent,
        DeleteOperacaoComponent,
        DetalhesOperacaoComponent,
        ImportacaoArquivoComponent,
    ],
    imports: [
        CommonModule,
        PessoaRoutingModule,
        TableModule,
        FontAwesomeModule,
        DropdownModule,
        FormsModule,
        // NgxMaskModule.forChild(),
        AccordionModule,
        SharedModule,
        TagModule,
        InputTextModule,
        CalendarModule,
        TabViewModule,
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        DatePipe,
        provideNgxMask(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
    ],
})
export class PessoaModule { }
