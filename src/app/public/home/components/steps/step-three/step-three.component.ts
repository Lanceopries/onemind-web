import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-three',
  template: `
    <div>
      <div>
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
  public data: string;

  @Output()
  openNextStep = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public openStepOne() {
    this.openNextStep.emit();
  }
}
