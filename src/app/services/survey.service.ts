import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Style } from "../models/style";
import { Observable } from "rxjs";
import { ApplicationConfigService } from "../shared/config/application-config.service";
import { Survey } from "../models/survey.model";
import { SurveyResult } from "../models/survey-resul.model";


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly applicationConfigService: ApplicationConfigService
  ) { }

  getStyles():Observable<Style[]>{
    return this.httpClient.get<Style[]>( this.applicationConfigService.getEndpointFor('/estilos'));
  }

  register(data: Survey): Observable<any>{
    return this.httpClient.post(this.applicationConfigService.getEndpointFor('/encuestas'),data);
  }

  getTotal(): Observable<SurveyResult[]>{
    return this.httpClient.get<SurveyResult[]>(this.applicationConfigService.getEndpointFor('/encuestas'));
  }


}
