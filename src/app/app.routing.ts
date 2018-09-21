import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { InterpretationComponent } from './modules/interpretation/components/interpretation/interpretation.component';
import { TopAuthorsComponent } from './components/top-authors/top-authors.component';
import { TopCommentatorsComponent } from './components/top-commentators/top-commentators.component';
import { TopInterpretationsComponent } from './components/top-interpretations/top-interpretations.component';

export const routes: Routes = [
  {
    path: '',
    component: InterpretationComponent
  },

  {
    path: 'topAuthors',
    component: TopAuthorsComponent 
  },

  {
    path: 'topCommentators',
    component: TopCommentatorsComponent
  },

  {
    path: 'topInterpretations',
    component: TopInterpretationsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
