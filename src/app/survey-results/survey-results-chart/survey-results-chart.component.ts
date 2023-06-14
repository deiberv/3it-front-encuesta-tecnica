import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartSerieValue } from 'src/app/models/chart-serie-value';
import { SurveyResultResponse } from 'src/app/models/survey-result-response';

@Component({
  selector: 'app-survey-results-chart',
  templateUrl: './survey-results-chart.component.html',
  styleUrls: ['./survey-results-chart.component.scss']
})
export class SurveyResultsChartComponent implements OnInit {

  @Input() results:SurveyResultResponse[] = [];
  single: ChartSerieValue[] = [];
  view: any[number] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Estilo musical';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  constructor(){
  }

  ngOnInit(): void {
    //Se asignan los resultados para ser graficados
    this.results.forEach( survey => {
      this.single.push({
        "name": survey.name,
        "value": survey.total
      });
    });
  }
}
