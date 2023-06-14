import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StyleResponse } from '../models/style-response';
import { environment } from 'src/environments/environment';
import { SurveyRequest } from '../models/survey-request';
import { SurveyResultResponse } from '../models/survey-result-response';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private httpClient: HttpClient) { }

  getStyles():Observable<StyleResponse[]>{
    return this.httpClient.get<StyleResponse[]>(environment.api+'/estilos');
  }

  register(data: SurveyRequest): Observable<any>{
    return this.httpClient.post(environment.api+'/encuestas',data);
  }

  getTotal(): Observable<SurveyResultResponse[]>{
    return this.httpClient.get<SurveyResultResponse[]>(environment.api+'/encuestas/resultado');
  }
}
