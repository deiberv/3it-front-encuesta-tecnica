import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyResultsTableComponent } from './survey-results-table.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SurveyResultsTableComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SurveyResultsTableComponent
  ]
})
export class SurveyResultsTableModule { }
