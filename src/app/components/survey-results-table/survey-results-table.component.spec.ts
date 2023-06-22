import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultsTableComponent } from './survey-results-table.component';

describe('SurveyResultsTableComponent', () => {
  let component: SurveyResultsTableComponent;
  let fixture: ComponentFixture<SurveyResultsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyResultsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
