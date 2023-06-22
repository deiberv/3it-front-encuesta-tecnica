import { TestBed } from "@angular/core/testing";
import { SurveyService } from "./survey.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ApplicationConfigService } from "../shared/config/application-config.service";



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

})
