import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule)
  },
  { 
    path: 'results',
    loadChildren: () => import('./survey-results/survey-results.module').then(m => m.SurveyResultsModule)
  },
  { 
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
