import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultPageComponent } from './survey-result-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyResult } from 'src/app/models/survey-resul.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
    total: 75
  },
  {
    idEstilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd5281',
    nombreEstilo: 'Jazz',
    total: 75
  }
];

const SwalMock = {
  fire: () => { }
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
        SurveyService,
        { provide: Swal, useValue: SwalMock }
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
    const service = TestBed.inject(SurveyService);
    const mockGetTotal = spyOn(service, 'getTotal').and.callFake(() => of(mockDataResultado));
    component.getTotal();
    expect(component.results).not.toBeNull();
    expect(component.results?.length).toBe(mockDataResultado.length);
  })

  it('getTotal Debe mostrar mensaje  al producirse un error', () => {

    const error$ = throwError(() => {
      const error: HttpErrorResponse = new HttpErrorResponse({
        error: {message: 'Debe tener el rol [ROLE_ADMIN]'},
        status: 401
      });
      return error;
    });

    const service = TestBed.inject(SurveyService);
    const mockGetTotal = spyOn(service, 'getTotal').and.callFake(() => error$);
    const mockSwal = spyOn(Swal, 'fire');

    component.getTotal();

    expect(mockGetTotal).toHaveBeenCalled();
    expect(mockSwal).toHaveBeenCalled();
    expect(component.results).toBeFalsy();

  })

});
