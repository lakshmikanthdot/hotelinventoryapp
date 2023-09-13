import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    // default url
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    // default url
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
