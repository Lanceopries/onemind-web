import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-one',
  styleUrls: ['./step-one.component.scss'],
  template: `
    <div class="step-one">
      <div>
        <h3>Получите полную аналитику об организациях</h3>
      </div>
      <div class="step-one__actions">
        <div (click)="openStepTwo('byINN')" class="button inn">По ИНН или ОГРН</div>
        <div (click)="openStepTwo('byPerson')" class="button person">По ФИО или Фотографии</div>
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
