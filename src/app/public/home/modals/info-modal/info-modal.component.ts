import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'info-modal',
  styleUrls: ['./info-modal.component.scss'],
  template: `
    <div #infoModal class="modal-container">
      <div class="modal-content">
        <h4>Уровень надежности</h4>
        <div class="inner">
          <div class="form">
            <!-- ng switch - type, ngFor -->
            <div class="list">
              <div class="item">
                <div class="title">Судимости:</div>
                <div class="value">10:</div>
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

  public data: any[] = []

  constructor() {}

  ngOnInit() {}

  @ViewChild('infoModal', { static: false }) modal: ElementRef;

  open(data: any[]) {
    this.data = data;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
