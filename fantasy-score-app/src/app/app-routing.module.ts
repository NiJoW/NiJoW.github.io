import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent} from './modules/dashboard/dashboard.component';
import { TugendenComponent} from './modules/tugenden/tugenden.component';
import { DiensteComponent} from './modules/dienste/dienste.component';
import { BonusprogrammeComponent} from './modules/bonusprogramme/bonusprogramme.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tugenden', component: TugendenComponent },
  { path: 'dienste', component: DiensteComponent },
  { path: 'bonusprogramme', component: BonusprogrammeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
