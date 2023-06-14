import { Component, Input, OnInit } from '@angular/core';
import { SurveyResultResponse } from 'src/app/models/survey-result-response';

@Component({
  selector: 'app-survey-results-table',
  templateUrl: './survey-results-table.component.html',
  styleUrls: ['./survey-results-table.component.scss']
})
export class SurveyResultsTableComponent implements OnInit {

  @Input() results:SurveyResultResponse[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
