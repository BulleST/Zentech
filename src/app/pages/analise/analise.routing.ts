import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnaliseComponent } from './analise.component';

const routes: Routes = [
    { path: '', component: AnaliseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliseRoutingModule { }
