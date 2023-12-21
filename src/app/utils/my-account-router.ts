import { ChangePasswordComponent } from "../shared/change-password/change-password.component";
import { MyAccountComponent } from "../shared/my-account/my-account.component";

export var MyAccountRouter = { 
    path: 'minha-conta', component: MyAccountComponent, data: { modalOrder: 10 }, children: [
    { path:  'change-password', component: ChangePasswordComponent, data: { modalOrder: 11 } }
] };