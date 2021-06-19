import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchModalComponent } from '../../modals/search-modal/search-modal.component';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.scss'],
  template: `
    <div class="search">
      <div class="container">
        <step-one
          *ngIf="isStepOne"
          (openNextStep)="openStepThree($event)"
        ></step-one>
        <step-three
          *ngIf="isStepThree"
          [data]="filledData"
          (openNextStep)="openStepOne()"
        ></step-three>
      </div>
    </div>
  `,
})
export class SearchComponent implements OnInit {
  public typeOfCheck: string = '';
  public filledData: any;

  public isStepOne: boolean = true;
  public isStepThree: boolean = false;

  constructor() {}

  ngOnInit() {}

  public openStepOne() {
    this.filledData = null;
    this.typeOfCheck = '';
    this.isStepOne = true;
    this.isStepThree = false;
  }

  public openStepThree(data) {
    this.filledData = data;
    this.isStepOne = false;
    this.isStepThree = true;
  }
}
