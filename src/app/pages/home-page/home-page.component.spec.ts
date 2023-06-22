import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePageComponent } from './home-page.component';
import { LoginService } from '../login-page/login.service';
import { Router } from '@angular/router';

class DummyComponent {}

const loginServiceMock = {
  logout: () => { return true }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe realizar el logout', () => {
    const router = TestBed.inject(Router);
    const spyNavigate = spyOn(router,'navigate');
    component.logout();
    expect(spyNavigate).toHaveBeenCalled();
  })
});
