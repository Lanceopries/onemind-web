import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './containers/search/search.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { HomeComponent } from './containers/home/home.component';
import { PublicLayoutComponent } from './containers/public-layout/public-layout.component';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { SearchModalComponent } from './modals/search-modal/search-modal.component';

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
    ],
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
    // Layout
    PublicLayoutComponent,
    // Containers
    HomeComponent,
    SearchComponent,
    // Components
    StepOneComponent,
    StepThreeComponent,
    // Modals
    InfoModalComponent,
    SearchModalComponent,
  ],
  providers: [],
})
export class HomeModule {}
