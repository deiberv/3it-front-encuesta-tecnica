import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from './auth/config/authority.constants';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'survey',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/survey-page/survey-page.module').then(m => m.SurveyPageModule)
  },
  {
    path: 'survey-results',
    canActivate: [AuthGuard],
    data: {authorities: [Authority.ADMIN] },
    loadChildren: () => import('./pages/survey-result-page/survey-result-page.module').then(m => m.SurveyResultPageModule)
  },
  {
    path: 'about',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/about-page/about-page.module').then(m => m.AboutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path:'**',
    redirectTo: '/login', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
