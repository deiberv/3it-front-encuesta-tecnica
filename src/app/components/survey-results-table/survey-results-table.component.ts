import { Component, Input, OnInit } from '@angular/core';
import { SurveyResult } from 'src/app/models/survey-resul.model';

@Component({
  selector: 'app-survey-results-table',
  templateUrl: './survey-results-table.component.html',
  styleUrls: ['./survey-results-table.component.scss']
})
export class SurveyResultsTableComponent implements OnInit {

  @Input() results:SurveyResult[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
