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
import { PDropdownActionsComponent } from './p-dropdown-actions/p-dropdown-actions.component';
import { MyAccountComponent } from "./my-account/my-account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

import { FormComponent as FormInvoice } from '../pages/invoice/form/form.component';
import { FormComponent as FormMoeda } from './../pages/moeda/form/form.component';
import { FormComponent as FormBanco } from './../pages/banco/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from './../pages/instituicao-financeira/form/form.component';
import { FormComponent as FormBeneficiario } from './../pages/beneficiario/form/form.component';
import { FormComponent as FormSwift } from './../pages/swift/form/form.component';
import { FormComponent as FormEvento } from './../pages/contrato-evento/form/form.component';
import { FormComponent as FormContrato } from './../pages/contrato/form/form.component';
import { FormComponent as FormContratoTipo } from './../pages/contrato-tipo/form/form.component';
import { FormComponent as FormContratoEvento } from './../pages/contrato-evento/form/form.component';
import { DeleteComponent as DeleteContratoTipo } from './../pages/contrato-tipo/delete/delete.component';
import { DeleteComponent as DeleteContratoEvento } from './../pages/contrato-evento/delete/delete.component';
import { DeleteComponent as DeleteMoeda } from '../pages/moeda/delete/delete.component';

@NgModule({
    declarations: [
        ListSharedComponent,
        ModalComponent,
        InputNumberComponent,
        PDropdownActionsComponent,
        MyAccountComponent,
        ChangePasswordComponent,

        FormMoeda,
        FormBanco,
        FormSwift,
        FormBeneficiario,
        FormInstituicaoFinanceira,
        FormEvento,
        FormInvoice,
        FormContrato,
        FormContratoTipo,
        FormContratoEvento,
        DeleteContratoEvento,
        DeleteContratoTipo,
        DeleteMoeda,
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
        FormEvento,
        FormInvoice,
        FormContratoTipo,
        DeleteContratoEvento,
        DeleteContratoTipo,
        DeleteMoeda,
        MyAccountComponent,
        ChangePasswordComponent
    ],
})
export class SharedModule {

}
