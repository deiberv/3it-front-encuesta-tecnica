import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultPageComponent } from './survey-result-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyResult } from 'src/app/models/survey-resul.model';
import { of } from 'rxjs';

const mockDataResultado: SurveyResult[] = [
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
  },
  {
    idEstilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2381',
    nombreEstilo: 'Pop',
    total: 250
  }
];

const surveyServiceMock = {
  getTotal: () => { return of(mockDataResultado) }
}

describe('SurveyResultPageComponent', () => {
  let component: SurveyResultPageComponent;
  let fixture: ComponentFixture<SurveyResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [ SurveyResultPageComponent ],
      providers: [
        { provide: SurveyService, useValue: surveyServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe obtener el total del votos', () => {
    component.getTotal();
    expect(component.results).not.toBeNull();
    expect(component.results?.length).toBe(mockDataResultado.length);
  })
});
