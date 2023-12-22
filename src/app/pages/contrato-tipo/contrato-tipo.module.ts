
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FormComponent } from './form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { ContratoTipoRoutingModule } from './contrato-tipo.routing';


@NgModule({
    declarations: [
        // ListComponent,
        // FormComponent,
        // DeleteComponent,
    ],
    imports: [
        CommonModule,
        ContratoTipoRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        DropdownModule,


    ],
    // exports: [
    //     FormComponent
    // ]
})
export class ContratoTipoModule { }
