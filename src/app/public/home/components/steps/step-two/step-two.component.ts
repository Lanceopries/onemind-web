import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'step-two',
  template: ` <div>
    STEP 2
    <div [ngSwitch]="type">
      <div *ngSwitchCase="'byINN'">
        <h3>По инн</h3>
      </div>
      <div *ngSwitchCase="'byName'">
        <h3>По ФИО</h3>
      </div>
    </div>

    <div (click)="openStepThree()">ПРОДОЛЖИТЬ</div>
  </div>`,
})
export class StepTwoComponent implements OnInit {
  @Input()
  public type: string;

  @Output()
  openNextStep = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public openStepThree() {
    let data: any;
    this.openNextStep.emit(data);
  }
}
