import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'step-three',
  styleUrls: ['./step-three.component.scss'],
  template: `
    <div class="step-three">
      <div class="step-three_loading" *ngIf="loading; else contentTemplate">
        <p>Пожалуйста, подождите. Отчет формируется...</p>
      </div>
      <ng-template #contentTemplate>
        <ng-container *ngIf="!error; else errorTemplate">
          <div class="step-three_content">
            <h2>
              {{organizationInfo.name}}
            </h2>
            <div>
              <div>{{organizationInfo.name}}</div>
              <div>600 000</div>
              <div>10 000 009</div>
              <div>67</div>
            </div>
            <div>
              <button class="default" (click)="openStepOne()">Проверить еще одну организацию</button>
            </div>
          </div>
        </ng-container>
        <ng-template #errorTemplate>
          <div class="step-three_error">
            <h3>Проиозошла ошибка, пожалуйста, повторите попытку.</h3>
            <button class="default" (click)="openStepOne()">
              На главный экран
            </button>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
})
export class StepThreeComponent implements OnInit {
  @Input()
  public data: any;

  @Output()
  openNextStep = new EventEmitter<string>();

  public organizationInfo: any;

  public loading: boolean = false;
  public error: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this._getData();
  }

  public openStepOne() {
    this.openNextStep.emit();
  }

  private _getData() {
    this.loading = true;

    if (this.data.type === 'byINN') {
      let innArray: number[] = this.data.form.innArray.map((x) => +x);

      let request = {
        data: innArray,
      };

      this.searchService.search(request).subscribe(
        (resp) => {
          console.log(resp);
          this.organizationInfo = resp[1];
          this.error = false;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = true;
        }
      );
    } else {
    }
  }
}
