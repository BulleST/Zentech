import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account.routing';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountComponent } from './account.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { LoginTwoComponent } from './login-two/login-two.component';
import { LoginThreeComponent } from './login-three/login-three.component';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginForComponent } from './login-for/login-for.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
    AccountComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    TermosDeUsoComponent,
    LoginTwoComponent,
    LoginThreeComponent,
    LoginForComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ToastrModule,
    FontAwesomeModule,
    CheckboxModule
  ],
  bootstrap: [AccountComponent]
})
export class AccountModule { }
