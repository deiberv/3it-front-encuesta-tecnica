import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultPageComponent } from './survey-result-page.component';

describe('SurveyResultPageComponent', () => {
  let component: SurveyResultPageComponent;
  let fixture: ComponentFixture<SurveyResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyResultPageComponent ]
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
});
