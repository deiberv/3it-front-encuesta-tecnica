import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SurveyResult } from 'src/app/models/survey-resul.model';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey-result-page',
  templateUrl: './survey-result-page.component.html',
  styleUrls: ['./survey-result-page.component.scss']
})
export class SurveyResultPageComponent implements OnInit {

  results:SurveyResult[] | undefined;

  constructor(private readonly surveyService: SurveyService) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(): void{
    this.surveyService.getTotal().subscribe({
      next: (response: SurveyResult[]) => {
        this.results = response.sort((surveyResultA, surveyResultB) => {
          if (surveyResultA.total > surveyResultB.total) return -1;
          else if (surveyResultA.total < surveyResultB.total) return 1;
          else return 0;
        });
      },
      error: (error: HttpErrorResponse ) => {
        Swal.fire({
          icon: 'error',
          text: `Error obteniendo resltado de las encuestas. ${error.error.message}`,
          toast: true,
          position: 'top-right',
          timer: 2000
        });
      }
    });
  }

}
