import { Component, OnInit } from '@angular/core';
import { SurveyResultResponse } from '../models/survey-result-response';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss']
})
export class SurveyResultsComponent implements OnInit {

  results:SurveyResultResponse[] | undefined;

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(): void{
    this.surveyService.getTotal().subscribe(response => {
      this.results = response;
    });
  }
}
