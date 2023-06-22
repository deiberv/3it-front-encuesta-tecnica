import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyPageRoutingModule } from './survey-page-routing.module';
import { SurveyPageComponent } from './survey-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SurveyPageComponent
  ],
  imports: [
    SharedModule,
    SurveyPageRoutingModule
  ]
})
export class SurveyPageModule { }
