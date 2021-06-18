import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers/home/home.component';

const routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
