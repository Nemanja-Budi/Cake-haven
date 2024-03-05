import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CakesComponent } from './pages/cakes/cakes.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CakeDetailComponent } from './pages/cakes/cake-detail/cake-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cakes', component: CakesComponent},
  { path: 'contact', component: ContactComponent},
  { path: "profile", component: ProfileComponent },
  { path: "cakes/:id", component: CakeDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
