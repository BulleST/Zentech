import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseRoutingModule } from './analise.routing';
import { AnaliseComponent } from './analise.component';


@NgModule({
  declarations: [
    AnaliseComponent
  ],
  imports: [
    CommonModule,
    AnaliseRoutingModule
  ]
})
export class AnaliseModule { }
