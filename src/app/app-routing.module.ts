import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LoginComponent } from './login/login.component';
import { RegisComponent } from './regis/regis.component';
import { MainComponent } from './admin/main/main.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CourseComponent } from './admin/course/course.component';
import { UsersComponent } from './admin/users/users.component';
import { InfoComponent } from './info/info.component';

import { AuthGuard } from './auth.guard';
import { AuthAdmin } from './authAdmin';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: 'home', component: HomeComponent },
  {path: 'menu', component: MenuComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'info', component: InfoComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'regis', component: RegisComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: MainComponent, canActivate: [AuthAdmin],
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthAdmin]},
      {path: 'course', component: CourseComponent, canActivate: [AuthAdmin]},
      {path: 'users', component: UsersComponent, canActivate: [AuthAdmin]},
    ]
  },

  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
