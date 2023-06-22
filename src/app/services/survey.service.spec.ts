import { TestBed } from "@angular/core/testing";
import { SurveyService } from "./survey.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ApplicationConfigService } from "../shared/config/application-config.service";
import { Style } from "../models/style";
import { Survey } from "../models/survey.model";
import { SurveyResult } from "../models/survey-resul.model";



describe('SurveyService', () => {
  let service: SurveyService;
  let httpTestingController: HttpTestingController;
  let appConfig: ApplicationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SurveyService,
        ApplicationConfigService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(SurveyService);
    httpTestingController = TestBed.inject(HttpTestingController);
    appConfig: TestBed.inject(ApplicationConfigService);
  });

  afterAll(() => {
    //No ejecutar un test mientras exista una peticion pendiente
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStyles Debe de obtener listado de estilos', () => {
    const listaEstilos:Style[] = [
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2393', name: 'Salsa'},
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2392', name: 'Merengue'},
      {id:'5d2a1ece-f517-4b3d-b2d0-e86160cd2391', name: 'Bachata'}
    ];
    service.getStyles().subscribe({
      next: (estilos: Style[]) => {
        expect(estilos).not.toBeNull();
        expect(estilos).toEqual(listaEstilos);
      }
    });

    const req = httpTestingController.expectOne('/estilos');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('GET');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush(listaEstilos);
  });

  it('register Debe de Registrar una encuesta', () => {
    const data: Survey = {
      email: 'email@google.com',
      estilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd2391'
    }
    service.register(data).subscribe({
      next: (response: any) => {
        expect(response).not.toBeNull();
      }
    });
    const resultado = {};
    const req = httpTestingController.expectOne('/encuestas');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('POST');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush(resultado);
  });

  it('getTotal Debe obtener e resultado de las votaciones', () => {
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
        idEstilo: '5d2a1ece-f517-4b3d-b2d0-e86160cd9523',
        nombreEstilo: 'Pop',
        total: 75
      },
    ];

    service.getTotal().subscribe({
      next: (resultado: SurveyResult[]) => {
        expect(resultado).not.toBeNull();
        expect(resultado).toEqual(mockDataResultado);
      }
    });

    const req = httpTestingController.expectOne('/encuestas');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('GET');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush(mockDataResultado);
  });

})
