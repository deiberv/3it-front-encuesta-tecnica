import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SurveyService } from '../services/survey.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StyleResponse } from '../models/style-response';
import { of, throwError } from 'rxjs';

const listaEstilos:StyleResponse[] = [
  {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2393', name: 'Salsa'},
  {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2392', name: 'Merengue'},
  {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2391', name: 'Bachata'}
];

const surveyServiceMock = {
  getStyles: () => {
    return of(listaEstilos);
  }
}

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  let surveyService: SurveyService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ SurveyComponent ],
      providers: [
        { provide: SurveyService, useValue: surveyServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    surveyService = TestBed.inject(SurveyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getStyles debe retornar todos los estilos', () => {
    component.getStyles();
    expect(component.styles).not.toBeNull();
    expect(component.styles.length).toBe(listaEstilos.length);
  })

});
