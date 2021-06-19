import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoreInfoInterface } from 'src/app/shared/interfaces/report.interface';

@Component({
  selector: 'info-modal',
  styleUrls: ['./info-modal.component.scss'],
  template: `
    <div #infoModal class="modal-container">
      <div class="modal-content">
        <h4>{{ getCurrentType() }}</h4>
        <div class="inner">
          <div class="form">
            <div class="list">
              <div class="item" *ngFor="let item of data">
                <div class="title">{{item.key}}:</div>
                <div class="value">{{item.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-actions">
          <button (click)="close()" class="default">Закрыть</button>
        </div>
      </div>
    </div>
  `,
})
export class InfoModalComponent implements OnInit {
  // TODO: принять отображаемые данные
  // TODO: принять тип отображаемых данных - Надежность и тд
  public currentType: string = 'reliability';
  public data: MoreInfoInterface[] = [];

  constructor() {}

  ngOnInit() {}

  @ViewChild('infoModal', { static: false }) modal: ElementRef;

  getCurrentType() {
    let result = 'Уровень надежности';
    switch (this.currentType) {
      case 'reliability':
        result = 'Уровень надежности';
        break;
      case 'freelimit':
        result = 'Свободный лимит';
        break;
      case 'companyPrice':
        result = 'Стоимость компании';
        break;
      case 'verdict':
        result = 'Решение системы';
        break;
      default:
        result = 'Уровень надежности';
        break;
    }
    return result;
  }

  open(data: MoreInfoInterface[]) {
    this.data = data;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
