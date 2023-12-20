import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableModule } from "primeng/table";
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";

import { ListSharedComponent } from "./list/list.component";
import { ModalComponent } from './modal/modal.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { SubModalComponent } from "./sub-modal/sub-modal.component";
import { PDropdownActionsComponent } from './p-dropdown-actions/p-dropdown-actions.component';

import { FormComponent as FormMoeda } from './../pages/moeda/form/form.component';
import { FormComponent as FormBanco } from './../pages/banco/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from './../pages/instituicao-financeira/form/form.component';
import { FormComponent as FormBeneficiario } from './../pages/beneficiario/form/form.component';
import { FormComponent as FormSwift } from './../pages/swift/form/form.component';
import { MyAccountComponent } from "./my-account/my-account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

@NgModule({
    declarations: [
        ListSharedComponent,
        ModalComponent,
        InputNumberComponent,
        SubModalComponent,
        PDropdownActionsComponent,
        FormMoeda,
        FormBanco,
        FormSwift,
        FormBeneficiario,
        FormInstituicaoFinanceira,
        MyAccountComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
        ToastrModule,
        DropdownModule,
        CalendarModule,
    ],
    exports: [
        ListSharedComponent,
        ModalComponent,
        SubModalComponent,
        InputNumberComponent,
        PDropdownActionsComponent,
        FormMoeda,
        FormBanco,
        FormSwift,
        FormBeneficiario,
        FormInstituicaoFinanceira,
        MyAccountComponent,
        ChangePasswordComponent
    ],
})
export class SharedModule {

}
