import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { DeleteComponent as DeleteMoeda } from '../pages/moeda/delete/delete.component';
import { PDropdownActionsComponent } from './p-dropdown-actions/p-dropdown-actions.component';
import { ListSharedComponent } from "./list/list.component";
import { ModalComponent } from './modal/modal.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { FormComponent as FormBanco } from './../pages/banco/form/form.component';
import { FormComponent as FormBeneficiario } from './../pages/beneficiario/form/form.component';
import { FormComponent as FormContrato } from '../pages/contrato/form/form.component';
import { FormComponent as FormContratoEvento } from '../pages/contrato-evento/form/form.component';
import { FormComponent as FormContratoTipo } from '../pages/contrato-tipo/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from './../pages/instituicao-financeira/form/form.component';
// import { FormComponent as FormInvoice } from '../pages/invoice/form/form.component';
import { FormComponent as FormMoeda } from './../pages/moeda/form/form.component';
import { FormComponent as FormRepresentante } from './../pages/representante/form/form.component';
import { DeleteComponent as DeleteTipo } from '../pages/contrato-tipo/delete/delete.component';
import { DeleteComponent as DeleteEvento } from '../pages/contrato-evento/delete/delete.component';
import { DeleteComponent as DeleteRepresentante } from '../pages/representante/delete/delete.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmpresaSelectedComponent } from './empresa-selected/empresa-selected.component';
import { InputDateComponent } from './input-date/input-date.component';
import { LibrariesModule } from "./libraries.module";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
    declarations: [
        ListSharedComponent,
        ModalComponent,
        InputNumberComponent,
        InputDateComponent,
        PDropdownActionsComponent,
        MyAccountComponent,
        ChangePasswordComponent,
        FormBanco,
        FormBeneficiario,
        FormContrato,
        FormContratoEvento,
        FormContratoTipo,
        FormInstituicaoFinanceira,
        // FormInvoice,
        FormMoeda,
        FormRepresentante,
        DeleteEvento,
        DeleteTipo,
        DeleteMoeda,
        DeleteRepresentante,
        EmpresaSelectedComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LibrariesModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
    ],
    exports: [
        ListSharedComponent,
        ModalComponent,
        InputDateComponent,
        InputNumberComponent,
        PDropdownActionsComponent,
        MyAccountComponent,
        ChangePasswordComponent,
        FormBanco,
        FormBeneficiario,
        FormContrato,
        FormContratoEvento,
        FormContratoTipo,
        FormInstituicaoFinanceira,
        // FormInvoice,
        FormMoeda,
        DeleteEvento,
        DeleteTipo,
        DeleteMoeda,
        FormRepresentante,
        DeleteRepresentante,
        EmpresaSelectedComponent,
        ConfirmPopupModule,
        ConfirmDialogModule,
    ],
})
export class SharedModule {

}
