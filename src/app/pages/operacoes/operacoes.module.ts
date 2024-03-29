import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { OperacoesRoutingModule } from './operacoes.routing';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
// import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DetailsComponent } from './details/details.component';
import { ExportacaoComponent } from './exportacao/exportacao.component';
import { ImportacaoArquivoComponent } from './importacao-arquivo/importacao-arquivo.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
// registerLocaleData(localePt);

@NgModule({
    declarations: [
        FormComponent,
        ListComponent,
        DeleteComponent,
        ImportacaoArquivoComponent,
        DetailsComponent,
        ExportacaoComponent,
    ],
    imports: [
        CommonModule,
        OperacoesRoutingModule,
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
export class OperacoesModule { }
