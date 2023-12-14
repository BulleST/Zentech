import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseRoutingModule } from './analise.routing';
import { AnaliseComponent } from './analise.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'primeng/chart';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { ChartAnoComponent } from './chart-ano/chart-ano.component';

@NgModule({
  declarations: [
    AnaliseComponent,
    ChartDataComponent,
    ChartAnoComponent
  ],
  imports: [
    CommonModule,
    AnaliseRoutingModule,
    FontAwesomeModule,
    ChartModule,

  ]
})
export class AnaliseModule { }
