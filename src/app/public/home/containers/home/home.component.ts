import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  template: `
    <div class="home">
      <h1>OneMind</h1>
      <div class="content">
        <step-one
          *ngIf="isStepOne"
          (openNextStep)="openStepTwo($event)"
        ></step-one>
        <step-two
          *ngIf="isStepTwo"
          [type]="typeOfCheck"
          (openNextStep)="openStepThree($event)"
        ></step-two>
        <step-three
          *ngIf="isStepThree"
          [data]="filledData"
          (openNextStep)="openStepOne()"
        ></step-three>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  public typeOfCheck: string = '';
  public filledData: any;

  public isStepOne: boolean = true;
  public isStepTwo: boolean = false;
  public isStepThree: boolean = false;

  constructor() {}

  ngOnInit() {}

  public openStepOne() {
    this.filledData = null;
    this.typeOfCheck = '';
    this.isStepOne = true;
    this.isStepTwo = false;
    this.isStepThree = false;
  }

  public openStepTwo(type) {
    this.typeOfCheck = type;
    this.isStepOne = false;
    this.isStepTwo = true;
  }

  public openStepThree(data) {
    this.filledData = data;
    this.isStepOne = false;
    this.isStepTwo = false;
    this.isStepThree = true;
  }
}
