import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'wip-modal',
  styleUrls: ['./wip-modal.component.scss'],
  template: `
    <div #wipModal class="modal-container">
      <div class="modal-content">
        <h4>Упс...</h4>
        <div class="inner">
          <h4>
            Похоже эта часть будет платной.
          </h4>
        </div>
        <div class="bottom-actions">
          <button (click)="close()" class="default">Ждём!</button>
        </div>
      </div>
    </div>
  `,
})
export class WipModalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @ViewChild('wipModal', { static: false }) wipModal: ElementRef;

  open() {
    this.wipModal.nativeElement.style.display = 'block';
  }

  close() {
    this.wipModal.nativeElement.style.display = 'none';
  }
}
