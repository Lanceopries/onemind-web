import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './containers/search/search.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';
import { HomeComponent } from './containers/home/home.component';
import { PublicLayoutComponent } from './containers/public-layout/public-layout.component';

const routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [
    PublicLayoutComponent,
    HomeComponent,
    SearchComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  providers: [],
})
export class HomeModule {}
