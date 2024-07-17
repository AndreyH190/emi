import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './feactures/profile/profile.component';
import { SearchComponent } from './feactures/search/search.component';
import { scoreGuard } from './core/guard/score.guard';

const routes: Routes = [

  { path: '', component: SearchComponent },
  {
    path: 'detalle/:id/:score',
    component: ProfileComponent,
    canActivate: [scoreGuard]
  },
  {
    path: '**',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
