import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'prefix', },
    { path: 'login', component: LoginComponent , children: [
            { path: 'termos-de-uso', component: TermosDeUsoComponent },
        ]
    },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    // {
    //     path: 'register', component: CreateAccountComponent, children: [
    //         { path: 'termos-de-uso', component: TermosDeUsoComponent },
    //     ]
    // },
    { path: 'verify-email', component: VerifyEmailComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
