import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    LoginPageRoutingModule
  ]
})
export class LoginPageModule { }
