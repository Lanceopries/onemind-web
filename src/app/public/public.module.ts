import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from '../shared/layouts/public-layout/public-layout.component';

const routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  }
];

@NgModule({
  declarations: [PublicLayoutComponent],
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
export class PublicModule {}
