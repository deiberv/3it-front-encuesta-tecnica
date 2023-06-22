import { TestBed } from "@angular/core/testing";
import { ApplicationConfigService } from "./application-config.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { environment } from "src/environments/environment";

describe('ApplicationConfigService', () => {
  let applicationConfigService: ApplicationConfigService;
  const apiUrl = 'http://localhost:3000/api';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ ApplicationConfigService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    applicationConfigService = TestBed.inject(ApplicationConfigService);
    applicationConfigService.setEndpointPrefix(apiUrl);
  });

  it('should be created', () => {
    expect(applicationConfigService).toBeTruthy();
  });

  it('setEndpointPrefix debe definir el endPoint', () => {
    applicationConfigService.setMicrofrontend(false);
    const endPoint = applicationConfigService.getEndpointFor('/encuesta');
    expect(endPoint).toBe(`${apiUrl}/encuesta`);
    expect(applicationConfigService.isMicrofrontend()).toBeFalse()
  })

  it('Debe definir un microfrontend ', () => {
    applicationConfigService.setMicrofrontend(true);
    const endPoint = applicationConfigService.getEndpointFor('encuesta', 'micro');
    expect(endPoint).toBe(`${apiUrl}/services/micro/encuesta`);
    expect(applicationConfigService.isMicrofrontend()).toBeTrue();
  })

})
