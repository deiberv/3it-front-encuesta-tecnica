import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyResultsChartComponent } from './survey-results-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    SurveyResultsChartComponent
  ],
  imports: [
    SharedModule,
    NgxChartsModule
  ],
  exports: [
    SurveyResultsChartComponent
  ]
})
export class SurveyResultsChartModule { }
