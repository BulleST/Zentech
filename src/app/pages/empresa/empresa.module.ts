import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListComponent } from './list/list.component';
import { DropdownModule } from 'primeng/dropdown';
import { EmpresaRoutingModule } from './empresa.routing';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ListComponent,
        FormComponent,
        DeleteComponent,
    ],
    imports: [
        CommonModule,
        EmpresaRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        DropdownModule
    ],
})
export class EmpresaModule { }
