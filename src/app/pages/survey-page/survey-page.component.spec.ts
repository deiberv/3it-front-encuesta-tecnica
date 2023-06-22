import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPageComponent } from './survey-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveyService } from 'src/app/services/survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Style } from 'src/app/models/style';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Survey } from 'src/app/models/survey.model';
import { HttpErrorResponse } from '@angular/common/http';

const SwalMock = {
  fire: () => { }
}

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
        SurveyService,
        { provide: Swal, useValue: SwalMock }
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

  afterEach(() => {
    fixture.destroy();
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

  it('Debe de mostrar modal en error al obtener estilos', () => {
    const mockGetStyles = spyOn(surveyService, 'getStyles').and.returnValue(throwError(() => new Error('No tiene acceso')));
    const mockSwal = spyOn(Swal, 'fire');
    component.getStyles();
    expect(mockGetStyles).toHaveBeenCalled();
    expect(mockSwal).toHaveBeenCalled();
    expect(component.styles).toBeFalsy();
  })

  it('register no debe realizar el registro de la encuesta al tener datos inavlido', () => {
    const mockGetStyles = spyOn(surveyService, 'register').and.callFake(() => of({}));
    const mockSwal = spyOn(Swal, 'fire');

    component.register();
    expect(mockGetStyles).not.toHaveBeenCalled();
    expect(mockSwal).not.toHaveBeenCalled();
  })

  it('register debe realizar el registro de la encuesta al tener datos inavlido', () => {
    const mockRegister = spyOn(surveyService, 'register').and.callFake(() => of({}));
    const mockSwal = spyOn(Swal, 'fire');
    const registerData: Survey = {
      email: 'email@3it.cl',
      estilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2393'
    }
    component.createForm.patchValue({
      email: 'email@3it.cl',
      estilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2393'
    });

    component.register();
    expect(mockRegister).toHaveBeenCalledWith(registerData);
    expect(mockSwal).toHaveBeenCalled();

  })

  it('register debe mostrar mensaje de error', () => {

    const error$ = throwError(() => {
      const error: HttpErrorResponse = new HttpErrorResponse({
        error: {message: 'Error registrando la encuenta'},
        status: 404
      });
      return error;
    });

    const mockRegister = spyOn(surveyService, 'register').and.returnValue(error$);
    const mockSwal = spyOn(Swal, 'fire');
    const registerData: Survey = {
      email: 'email@3it.cl',
      estilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2393'
    }
    component.createForm.patchValue({
      email: 'email@3it.cl',
      estilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2393'
    });

    component.register();
    expect(mockRegister).toHaveBeenCalledWith(registerData);
    //expect(mockSwal).toHaveBeenCalled();
  })

});
