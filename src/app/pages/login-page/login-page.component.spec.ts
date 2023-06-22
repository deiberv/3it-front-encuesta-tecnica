import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const loginServiceMock = {
  isLoggedIn: () => {
    return true;
  },
  login: () => {
    return of({});
  }
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [ LoginPageComponent ],
      providers: [
        { provide: LoginService, useValue: loginServiceMock }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe redireccionar al home si esta logueado', () => {
    const router = TestBed.inject(Router);
    const spyNavigate = spyOn(router,'navigate');
    component.ngOnInit();
    expect(spyNavigate).toHaveBeenCalled();
  });

  it('Debe de realizar el login si se ha indicado los datos', () => {
    component.loginForm.controls['username'].setValue('info@google.com');
    component.loginForm.controls['password'].setValue('Abc123');
    const router = TestBed.inject(Router);
    const spyNavigate = spyOn(router,'navigate');
    const spyCurrentNavigation = spyOn(router,'getCurrentNavigation').and.callFake(()=>{return null});
    component.login();
    expect(spyCurrentNavigation).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalled();
  })

});
