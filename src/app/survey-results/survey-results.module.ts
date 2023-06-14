import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyResultsComponent } from './survey-results.component';
import { SurveyResultsRoutingModule } from './survey-results-routing.module';
import { SurveyResultsTableComponent } from './survey-results-table/survey-results-table.component';
import { SurveyResultsChartComponent } from './survey-results-chart/survey-results-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    SurveyResultsComponent,
    SurveyResultsTableComponent,
    SurveyResultsChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    SurveyResultsRoutingModule
  ]
})
export class SurveyResultsModule { }
