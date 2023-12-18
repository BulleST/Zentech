import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiftRoutingModule } from './swift.routing';
import { ListComponent } from './list/list.component';
// import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    ListComponent,
    // FormComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    SwiftRoutingModule
  ]
})
export class SwiftModule { }
