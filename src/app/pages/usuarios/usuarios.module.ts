import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios.routing';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormComponent } from './form/form.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    UsuariosComponent,
    ListComponent,
    FormComponent,
    DeleteComponent,
    DeactivatedComponent,
    ResetPasswordComponent
],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ToastrModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    NgxMaskModule.forChild(),
  ]
})
export class UsuariosModule { }
