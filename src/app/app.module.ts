import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RequestInterceptor } from './helpers/request.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { AlertComponent } from './parts/alert/alert.component';
import { LoadingComponent } from './parts/loading/loading.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        LoadingComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FontAwesomeModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            enableHtml: true,
        }),
        // NgxMaskModule.forRoot({ validation: true, triggerOnMaskChange: true, }),
        FormsModule,
        
        TranslateModule.forRoot(),
        ChartModule,
        
        NgxMaskDirective, 
        NgxMaskPipe,
    ],
    providers: [
        CurrencyPipe,
        provideNgxMask(),
        provideEnvironmentNgxMask(),
        DatePipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private config: PrimeNGConfig,
        private translateService: TranslateService

    ) {
        this.translateService.setDefaultLang('pt-BR');
        this.translateService.use('pt-BR');

        this.config.setTranslation({
            startsWith: 'Começa com',
            contains: 'Contém',
            notContains: 'Não contem',
            endsWith: 'Termina com',
            equals: 'Igual a',
            notEquals: 'Diferente de',
            noFilter: 'Sem filtro',
            lt: 'Menor que', // Less Than
            lte: 'Menor que ou igual a', // Less Than or Equal to
            gt: 'Maior que', // Greater than
            gte: 'Maior que ou igual a', // Greater than or equal to
            is: 'Igual a',
            isNot: 'Diferente de',
            before: 'Anterior a',
            after: 'Posterior a',
            dateIs: 'Data igual a',
            dateIsNot: 'Data diferente de',
            dateBefore: 'Data anterior a',
            dateAfter: 'Data posterior a',
            clear: 'Limpar filtro',
            apply: 'Filtrar',
            matchAll: 'Filtrar todos que',
            matchAny: 'Filtrar qualquer um que',
            addRule: 'Adicionar filtro',
            removeRule: 'Remover filtro',
            weak: 'Fraca',
            medium: 'Média',
            strong: 'Forte',
            emptyMessage: 'Nenhum resultado encontrado',
            emptyFilterMessage: 'Nenhum resultado encontrado',
            dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            chooseYear: 'Ano',
            chooseMonth: 'Mês',
            chooseDate: 'Dia',
            today: 'Hoje',
            dateFormat: 'dd/mm/yy',
            prevYear: 'Anterior',
            nextYear: 'Próximo',
            prevMonth: 'Anterior',
            nextMonth: 'Próximo',
        })

        this.config.filterMatchModeOptions = {
            text: [
                FilterMatchMode.STARTS_WITH,
                FilterMatchMode.CONTAINS,
                FilterMatchMode.NOT_CONTAINS,
                FilterMatchMode.ENDS_WITH,
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS
            ],
            numeric: [
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS,
                FilterMatchMode.LESS_THAN,
                FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                FilterMatchMode.GREATER_THAN,
                FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            ],
            date: [
                FilterMatchMode.DATE_IS,
                FilterMatchMode.DATE_IS_NOT,
                FilterMatchMode.DATE_BEFORE,
                FilterMatchMode.DATE_AFTER,
                FilterMatchMode.STARTS_WITH,
                FilterMatchMode.CONTAINS,
                FilterMatchMode.NOT_CONTAINS,
                FilterMatchMode.ENDS_WITH,
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS
            ]
        }

    }
}
