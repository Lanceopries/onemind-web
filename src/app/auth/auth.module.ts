import { PersistanceService } from './../shared/services/persistance.service';
import { AuthLayoutComponent } from './../shared/layouts/auth-layout/auth-layout.component';
import { AngularMaterialModule } from '../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './services/auth.service';

const routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
