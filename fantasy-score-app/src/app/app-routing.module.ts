import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { TugendenComponent} from './tugenden/tugenden.component';
import { DiensteComponent} from './dienste/dienste.component';
import { BonusprogrammeComponent} from './bonusprogramme/bonusprogramme.component';


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
