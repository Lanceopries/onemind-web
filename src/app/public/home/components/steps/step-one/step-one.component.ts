import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-one',
  template: `
    <div>
      <div><h2>ПОЛУЧИТЕ ИНФОРМАЦИЮ ОБ ОРГАНИЗАЦИИ</h2></div>
      <div>
        <div (click)="openStepTwo('byINN')">По ИНН или ОГРН</div>
        <div (click)="openStepTwo('byName')">По ФИО или Фотографии</div>
      </div>
    </div>
  `,
})
export class StepOneComponent implements OnInit {

  @Output()
  openNextStep = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public openStepTwo(type: string) {
    this.openNextStep.emit(type);
  }
}
