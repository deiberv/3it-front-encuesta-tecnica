import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyResultPageComponent } from './survey-result-page.component';

const routes: Routes = [{path: '', component: SurveyResultPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyResultPageRoutingModule { }
