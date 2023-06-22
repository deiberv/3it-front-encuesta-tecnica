import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPageComponent } from './survey-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveyService } from 'src/app/services/survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Style } from 'src/app/models/style';
import { of } from 'rxjs';

describe('SurveyPageComponent', () => {
  let component: SurveyPageComponent;
  let fixture: ComponentFixture<SurveyPageComponent>;
  let surveyService: SurveyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [ SurveyPageComponent ],
      providers: [
        SurveyService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPageComponent);
    component = fixture.componentInstance;
    surveyService = TestBed.inject(SurveyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de retornar el listado de estilos', () => {
    const listaEstilos:Style[] = [
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2393', name: 'Salsa'},
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2392', name: 'Merengue'},
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2391', name: 'Bachata'}
    ];

    const spyGetStyles = spyOn(surveyService,'getStyles').and.callFake(() => {
      return of(listaEstilos)
    });

    component.getStyles();
    expect(spyGetStyles).toHaveBeenCalled();
    expect(component.styles).not.toBeNull();
    expect(component.styles?.length).toBe(listaEstilos.length);

  })

});
