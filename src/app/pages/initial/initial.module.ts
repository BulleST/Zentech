import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialRoutingModule } from './initial.routing';
import { InitialComponent } from './initial.component';
import { HeaderComponent } from 'src/app/parts/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from 'src/app/parts/navigation/navigation.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';

function initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Do some asynchronous stuff
      setTimeout(() => {
        
          resolve(true);
      }, 3000);
    });
  }
@NgModule({
    declarations: [
        InitialComponent,
        HeaderComponent,
        HomeComponent,
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        InitialRoutingModule,
        FontAwesomeModule,
        MenubarModule,
        SharedModule,
        FormsModule,
        PanelMenuModule,
        PanelModule,
    ],
    providers: []
})
export class InitialModule { }
