import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StyleResponse } from '../models/style-response';
import { environment } from 'src/environments/environment';
import { SurveyResultResponse } from '../models/survey-result-response';
import { SurveyRequest } from '../models/survey-request';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SurveyService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(SurveyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    //No ejecutar un test mientras exista una peticion pendiente
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStyles Debe de obtener listado de estilos', () => {
    const listaEstilos:StyleResponse[] = [
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2393', name: 'Salsa'},
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2392', name: 'Merengue'},
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2391', name: 'Bachata'}
    ];
    service.getStyles().subscribe({
      next: (estilos: StyleResponse[]) => {
        expect(estilos).not.toBeNull();
        expect(estilos).toEqual(listaEstilos);
      }
    });

    const req = httpTestingController.expectOne(environment.api+'/estilos');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('GET');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush(listaEstilos);
  });

  it('register Debe de Registrar una encuesta', () => {
    const data: SurveyRequest = {
      email: 'email@google.com',
      style: '5d2a1ece-f517-4b3d-b2d0-e86160cd2391'
    }
    service.register(data).subscribe({
      next: (response: any) => {
        expect(response).not.toBeNull();
      }
    });
    const resultado = {};
    const req = httpTestingController.expectOne(environment.api+'/encuestas');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('POST');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush(resultado);
  });

  it('getTotal Debe obtener e resultado de las votaciones', () => {
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

    service.getTotal().subscribe({
      next: (resultado: SurveyResultResponse[]) => {
        expect(resultado).not.toBeNull();
        expect(resultado).toEqual(mockDataResultado);
      }
    });

    const req = httpTestingController.expectOne(environment.api+'/encuestas');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('GET');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush(mockDataResultado);
  });

});
