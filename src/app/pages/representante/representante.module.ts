import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListComponent } from './list/list.component';
import { DropdownModule } from 'primeng/dropdown';
import { RepresentanteRoutingModule } from './representante.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ListComponent,
        // FormComponent,
        // DeleteComponent,
    ],
    imports: [
        CommonModule,
        RepresentanteRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        DropdownModule
    ],
})
export class RepresentanteModule { }
