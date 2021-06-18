import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers/home/home.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';

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
  declarations: [
    HomeComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  providers: [],
})
export class HomeModule {}
