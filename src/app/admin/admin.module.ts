import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './../shared/layouts/admin-layout/admin-layout.component';
import { AngularMaterialModule } from '../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  }
];

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
})
export class AdminModule {}
