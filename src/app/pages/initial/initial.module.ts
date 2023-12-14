import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialRoutingModule } from './initial.routing';
import { InitialComponent } from './initial.component';
import { HeaderComponent } from 'src/app/parts/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    InitialComponent,
    HeaderComponent,
    HomeComponent,
    MyAccountComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    InitialRoutingModule,
    FontAwesomeModule,
    MenubarModule,
    SharedModule,
    FormsModule
  ]
})
export class InitialModule { }
