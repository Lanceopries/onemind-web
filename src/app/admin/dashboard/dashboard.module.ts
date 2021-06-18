import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

const routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [DashboardComponent],
  providers: [],
})
export class DashboardModule {}
