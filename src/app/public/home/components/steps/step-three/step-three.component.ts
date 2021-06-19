import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-three',
  styleUrls: ['./step-three.component.scss'],
  template: `
    <div class="step-three">
      <div class="step-three_loading">
        <p>Отчет формируется...</p>
      </div>
      <div class="step-three_content">
        <h2>
          ООО ГЕКТАР ИНН - 5120501250 ОГРН 120502501 =работает с 2012= =соц.
          сети=
        </h2>
      </div>
      <div>
        <div>100</div>
        <div>600 000</div>
        <div>10 000 009</div>
        <div>67</div>
      </div>
      <div>
        <div (click)="openStepOne()">ПРОВЕРИТЬ ЕЩЕ ОДНУ ОРАГНИЗАЦИЮ</div>
      </div>
    </div>
  `,
})
export class StepThreeComponent implements OnInit {
  @Input()
  public data: any;

  @Output()
  openNextStep = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    console.log(this.data)
  }

  public openStepOne() {
    this.openNextStep.emit();
  }
}
