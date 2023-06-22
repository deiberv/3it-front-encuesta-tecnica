import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SurveyResult } from 'src/app/models/survey-resul.model';
import { ChartSerieValue } from './chart-serie-value';

@Component({
  selector: 'app-survey-results-chart',
  templateUrl: './survey-results-chart.component.html',
  styleUrls: ['./survey-results-chart.component.scss']
})
export class SurveyResultsChartComponent implements OnInit, OnChanges {

  @Input() results:SurveyResult[] | undefined;
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

  constructor() {
    this.results = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Se asignan los resultados para ser graficados
    this.results?.forEach( survey => {
      this.single.push({
        "name": survey.nombreEstilo,
        "value": survey.total
      });
    });
  }

  ngOnInit(): void {

  }

}
