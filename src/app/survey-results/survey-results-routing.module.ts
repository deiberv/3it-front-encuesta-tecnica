import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyResultsComponent } from './survey-results.component';


const routes: Routes = [
  { 
    path: '',
    component: SurveyResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyResultsRoutingModule { }
