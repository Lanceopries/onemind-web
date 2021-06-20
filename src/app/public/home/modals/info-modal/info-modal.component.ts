import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoreInfoInterface } from 'src/app/shared/interfaces/report.interface';

@Component({
  selector: 'info-modal',
  styleUrls: ['./info-modal.component.scss'],
  template: `
    <div #infoModal class="modal-container">
      <div class="modal-content">
        <h4>{{ currentType }}</h4>
        <div class="inner">
          <div class="form">
            <div class="list" *ngIf="data?.length === 0; else content">
              <div>Данных нет</div>
            </div>
            <ng-template #content>
              <div class="list">
                <div class="item" *ngFor="let item of data">
                  <div class="title">{{ item?.key }}</div>
                  <div class="value">{{ item?.value }}</div>
                </div>
              </div>
            </ng-template>
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
  public currentType: string = 'Уровень надежности';
  public data: MoreInfoInterface[] = [];

  constructor() {}

  ngOnInit() {}

  @ViewChild('infoModal', { static: false }) modal: ElementRef;

  open(data: MoreInfoInterface[], type: string) {
    this.data = data;

    switch (type) {
      case 'reliability':
        this.currentType = 'Уровень надежности';
        break;
      case 'freelimit':
        this.currentType = 'Свободный лимит';
        break;
      case 'companyPrice':
        this.currentType = 'Стоимость компании';
        break;
      case 'verdict':
        this.currentType = 'Решение системы';
        break;
    }

    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
