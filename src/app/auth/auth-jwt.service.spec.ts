import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthServerProvider } from "./auth-jwt.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { ApplicationConfigService } from "../shared/config/application-config.service";

const localStorageServiceMock = {
  retrieve: () => {return 'esteTokenLocal...'},
  clear: (key: string) => { },
  store: (key: string, value: string) => { }
}
const sessionStorageServiceMock = {
  retrieve: () => { return 'esteTokenSession...'},
  clear: (key: string) => { },
  store: (key: string, value: string) => { }
}

describe('AuthServerProvider', ()=>{
  let service: AuthServerProvider;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthServerProvider,
        ApplicationConfigService,
        { provide: LocalStorageService, useValue: localStorageServiceMock},
        { provide: SessionStorageService, useValue: sessionStorageServiceMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthServerProvider);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    //No ejecutar un test mientras exista una peticion pendiente
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken debe retornar el token jwt en local', () => {
    const sessionStorageService = TestBed.inject(SessionStorageService);
    const spyTokenSession = spyOn(sessionStorageService,'retrieve')
      .withArgs('authenticationToken').and.returnValue(null);

    const localToken = service.getToken();
    expect(spyTokenSession).toHaveBeenCalled();
    expect(localToken).not.toBeNull();
    expect(localToken).toBe('esteTokenLocal...');
  });

  it('getToken debe retornar el token jwt en session', () => {
    const localStorageService = TestBed.inject(LocalStorageService);
    const spyTokenLocal = spyOn(localStorageService,'retrieve')
      .withArgs('authenticationToken').and.returnValue(null);

    const localToken = service.getToken();
    expect(spyTokenLocal).toHaveBeenCalled();
    expect(localToken).not.toBeNull();
    expect(localToken).toBe('esteTokenSession...');

  });

  it('getToken debe retornar vacio cuando no esta logueado', () => {
    const localStorageService = TestBed.inject(LocalStorageService);
    const sessionStorageService = TestBed.inject(SessionStorageService);
    const spyTokenLocal = spyOn(localStorageService,'retrieve')
      .withArgs('authenticationToken').and.returnValue(null);

    const spyTokenSession = spyOn(sessionStorageService,'retrieve')
      .withArgs('authenticationToken').and.returnValue(null);

    const localToken = service.getToken();
    expect(spyTokenLocal).toHaveBeenCalled();
    expect(spyTokenSession).toHaveBeenCalled();
    expect(localToken).toBe('');

  });

  it('logout debe eliminar el token del storage', () => {
    const localStorageService = TestBed.inject(LocalStorageService);
    const sessionStorageService = TestBed.inject(SessionStorageService);
    const spyTokenLocal = spyOn(localStorageService,'clear').and.callFake(() => { });
    const spyTokenSession = spyOn(sessionStorageService,'clear').and.callFake(() => { });

    service.logout();
    expect(spyTokenLocal).toHaveBeenCalledWith('authenticationToken');
    expect(spyTokenSession).toHaveBeenCalledWith('authenticationToken');
    const localToken = service.getToken();
    expect(localToken).not.toBeNull();
  })

  it('login no rememberMe debe guardar el token jwt', () => {

    const localStorageService = TestBed.inject(LocalStorageService);
    const sessionStorageService = TestBed.inject(SessionStorageService);
    const spyTokenLocal = spyOn(localStorageService,'clear').and.callFake(() => { });
    const spyTokenSession = spyOn(sessionStorageService,'store').and.callFake(() => { });

    service.login({email: 'test1@google.com', password: 'Abc123', rememberMe: false})
      .subscribe();

    const req = httpTestingController.expectOne('/auth/login');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('POST');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush({token: 'tokenJWTAccesos'});

    expect(spyTokenLocal).toHaveBeenCalledWith('authenticationToken');
    expect(spyTokenSession).toHaveBeenCalledWith('authenticationToken', 'tokenJWTAccesos');

  })

  it('login con rememberMe debe guardar el token jwt', () => {

    const localStorageService = TestBed.inject(LocalStorageService);
    const sessionStorageService = TestBed.inject(SessionStorageService);
    const spyTokenLocal = spyOn(localStorageService,'store').and.callFake(() => { });
    const spyTokenSession = spyOn(sessionStorageService,'clear').and.callFake(() => { });

    service.login({email: 'test1@google.com', password: 'Abc123', rememberMe: true})
      .subscribe();

    const req = httpTestingController.expectOne('/auth/login');
    // Comprueba que la solicitud es un GET.
    expect(req.request.method).toEqual('POST');
    // Responde con datos simulados, lo que hace que Observable se resuelva.
    // La devolución de llamada de suscripción afirma que se devolvieron los datos correctos.
    req.flush({token: 'tokenJWTAccesos'});

    expect(spyTokenLocal).toHaveBeenCalledWith('authenticationToken', 'tokenJWTAccesos');
    expect(spyTokenSession).toHaveBeenCalledWith('authenticationToken');

  })

})
