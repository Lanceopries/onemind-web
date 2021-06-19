import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchModalComponent } from '../../../modals/search-modal/search-modal.component';

@Component({
  selector: 'step-one',
  styleUrls: ['./step-one.component.scss'],
  template: `
    <search-modal
      #modal
      (openNextStep)="openStepThree($event)"
      ></search-modal>
    <div class="step-one">
      <div class="step-one_header">
        <h2>Получите информацию об организациях</h2>
      </div>
      <div class="step-one_actions">
        <div class="card">
          <div class="icon">
            <img src="../../../../../../assets/images/icon_inn.png" alt="ИНН" />
          </div>
          <div class="title">
            <h3>
              По ИНН или <br />
              ОГРН
            </h3>
          </div>
          <button type="button" class="primary" (click)="openModal('byINN')">
            Продолжить так
          </button>
        </div>
        <div class="card">
          <div class="icon">
            <img src="../../../../../../assets/images/icon_name.png" alt="ФИО" />
          </div>
          <div class="title">
            <h3>По ФИО или Фотографии</h3>
          </div>
          <button
            type="button"
            class="primary_green"
            (click)="openModal('byPerson')"
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
  openNextStep = new EventEmitter<any>();

  @ViewChild('modal', { static: false }) modal: SearchModalComponent;

  public selectedType: string = 'byINN';

  openModal(type: string) {
    this.modal.open(type);
  }

  constructor() {}

  ngOnInit() {}

  public openStepThree(data) {
    this.openNextStep.emit(data);
  }
}
