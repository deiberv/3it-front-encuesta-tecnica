import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyResultPageRoutingModule } from './survey-result-page-routing.module';
import { SurveyResultPageComponent } from './survey-result-page.component';
import { SurveyResultsTableModule } from 'src/app/components/survey-results-table/survey-results-table.module';
import { SurveyResultsChartModule } from 'src/app/components/survey-results-chart/survey-results-chart.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SurveyResultPageComponent
  ],
  imports: [
    SharedModule,
    SurveyResultPageRoutingModule,
    SurveyResultsTableModule,
    SurveyResultsChartModule
  ]
})
export class SurveyResultPageModule { }
