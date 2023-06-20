import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SurveyResultsComponent } from './survey-results.component';
import { SurveyService } from '../services/survey.service';
import { Observable, of } from 'rxjs';
import { SurveyResultResponse } from '../models/survey-result-response';

const mockDataResultado: SurveyResultResponse[] = [
  {
    idEstilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2393',
    nombreEstilo: 'Salsa',
    total: 15
  },
  {
    idEstilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2392',
    nombreEstilo: 'Merengue',
    total: 75
  },
  {
    idEstilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2391',
    nombreEstilo: 'Bachata',
    total: 250
  }
];

const surveyServiceMock = {
  getTotal: () => of(mockDataResultado),
}


describe('SurveyResultsComponent', () => {
  let component: SurveyResultsComponent;
  let fixture: ComponentFixture<SurveyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SurveyResultsComponent ],
      providers: [
        //SurveyService
        {provide: SurveyService, useValue:  surveyServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotal Debe obtener el total de votos', () => {
    const service:SurveyService = fixture.debugElement.injector.get(SurveyService);
    component.getTotal();
    expect(component.results).not.toBeNull();
    expect(component.results?.length).toBe(3);
  });

});
