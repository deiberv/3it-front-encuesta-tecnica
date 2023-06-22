import { TestBed } from "@angular/core/testing";
import { Login, LoginService } from "./login.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthServerProvider } from "src/app/auth/auth-jwt.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from 'rxjs';

const authServerProviderMock = {
  login: (credentials: Login) => {
    return of({ token: 'tokenAcceso' })
  },
  logout: () => { },
  getToken: () => { return 'tokenAcceso' }
}

const SwalMock = {
  fire: () => { }
}

describe('LoginService', ()=>{
  let service: LoginService;
  let authServerProvider: AuthServerProvider
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthServerProvider, useValue: authServerProviderMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(LoginService);
    authServerProvider = TestBed.inject(AuthServerProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe de crear el objeto Login', () => {
    const login = new Login('email@test.com', '123456', false);
    expect(login.email).toBe('email@test.com');
    expect(login.password).toBe('123456');
    expect(login.rememberMe).toBeFalse();
  })

  it('Debe realizar el login con los datos indicados no rememberMe', () => {
    const spyLogin = spyOn(authServerProvider,'login');
    service.login({email:'test@email.com', password: '123456', rememberMe: false});
    expect(spyLogin).toHaveBeenCalled();
  });

  it('Debe realizar el login con los datos indicados con rememberMe', () => {
    const spyLogin = spyOn(authServerProvider,'login');
    service.login({email:'test@email.com', password: '123456', rememberMe: true});
    expect(spyLogin).toHaveBeenCalled();
  });

  it('Debe realizar el logout', () => {
    const spyLogin = spyOn(authServerProvider,'logout');
    service.logout();
    expect(spyLogin).toHaveBeenCalled();
  });

  it('isLoggedIn Debe indicar que no esta logueado', () => {
    const spyLogin = spyOn(authServerProvider,'getToken').and.callFake(() => { return ''; });
    const isLoggedIn = service.isLoggedIn();
    expect(spyLogin).toHaveBeenCalled();
    expect(isLoggedIn).toBeFalse();
  })

  it('isLoggedIn Debe indicar que esta esta logueado', () => {
    const spyLogin = spyOn(authServerProvider,'getToken').and.callFake(() => { return 'token'; });
    const isLoggedIn = service.isLoggedIn();
    expect(spyLogin).toHaveBeenCalled();
    expect(isLoggedIn).toBeTrue();
  })

})
