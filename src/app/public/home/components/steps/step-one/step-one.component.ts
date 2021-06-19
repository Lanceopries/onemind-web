import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-one',
  styleUrls: ['./step-one.component.scss'],
  template: `
    <div class="step-one">
      <div class="step-one_header">
        <h2>Получите информацию об организациях</h2>
      </div>
      <div class="step-one_actions">
        <div class="card">
          <div class="icon">
            <img src="../../../../../../assets/images/icon_inn.png" alt="" />
          </div>
          <div class="title">
            <h3>По ИНН или <br> ОГРН</h3>
          </div>
          <button type="button" class="primary" (click)="openStepTwo('byINN')">
            Продолжить так
          </button>
        </div>

        <div class="card">
          <div class="icon">
            <img src="../../../../../../assets/images/icon_name.png" alt="" />
          </div>
          <div class="title">
            <h3>По ФИО или Фотографии</h3>
          </div>
          <button
            type="button"
            class="primary_green"
            (click)="openStepTwo('byPerson')"
          >
            Продолжить так
          </button>
        </div>
      </div>
      <div class="background search-select"></div>
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
