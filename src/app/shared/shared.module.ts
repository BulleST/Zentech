import { PDropdownActionsComponent } from './p-dropdown-actions/p-dropdown-actions.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableModule } from "primeng/table";
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";
import { DeleteComponent as DeleteMoeda } from '../pages/moeda/delete/delete.component';
import { ListSharedComponent } from "./list/list.component";
import { ModalComponent } from './modal/modal.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { FormComponent as FormBanco } from './../pages/banco/form/form.component';
import { FormComponent as FormBeneficiario } from './../pages/beneficiario/form/form.component';
import { FormComponent as FormContrato } from '../pages/contrato/form/form.component';
import { FormComponent as FormContratoEvento } from '../pages/contrato-evento/form/form.component';
import { FormComponent as FormContratoTipo } from '../pages/contrato-tipo/form/form.component';
import { FormComponent as FormInstituicaoFinanceira } from './../pages/instituicao-financeira/form/form.component';
import { FormComponent as FormInvoice } from '../pages/invoice/form/form.component';
import { FormComponent as FormMoeda } from './../pages/moeda/form/form.component';
import { FormComponent as FormRepresentante } from './../pages/representante/form/form.component';
import { DeleteComponent as DeleteTipo } from '../pages/contrato-tipo/delete/delete.component';
import { DeleteComponent as DeleteEvento } from '../pages/contrato-evento/delete/delete.component';
import { DeleteComponent as DeleteRepresentante } from '../pages/representante/delete/delete.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TabViewModule } from 'primeng/tabview';
import { InputDateComponent } from './input-date/input-date.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EmpresaSelectedComponent } from './empresa-selected/empresa-selected.component';
import { DialogModule } from 'primeng/dialog';

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
        FormInvoice,
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
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
        ToastrModule,
        DropdownModule,
        CalendarModule,
        TabViewModule,
        OverlayPanelModule,
        DialogModule
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
        FormInvoice,
        FormMoeda,
        DeleteEvento,
        DeleteTipo,
        DeleteMoeda,
        FormRepresentante,
        DeleteRepresentante,
        EmpresaSelectedComponent,
    ],
})
export class SharedModule {

}
