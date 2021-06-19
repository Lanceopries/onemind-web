import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OrganizationInfoInterface } from 'src/app/shared/interfaces/organization-info.interface';
import { SearchService } from 'src/app/shared/services/search.service';
import { InfoModalComponent } from '../../../modals/info-modal/info-modal.component';

@Component({
  selector: 'step-three',
  styleUrls: ['./step-three.component.scss'],
  template: `
    <info-modal #modal></info-modal>
    <div class="step-three">
      <div class="step-three_loading" *ngIf="loading; else contentTemplate">
        <p>Пожалуйста, подождите. Отчет формируется...</p>
      </div>
      <ng-template #contentTemplate>
        <ng-container *ngIf="!error; else errorTemplate">
          <div class="step-three_content">
            <div class="title">
              <h2>{{ organizationInfo?.name }}</h2>
            </div>
            <div class="inn">ИНН - {{ organizationInfo?.inn }}</div>
            <div class="ogrn">ОГРН {{ organizationInfo?.inn }}</div>

            <div class="work-from">Работает с 2012 года</div>

            <div class="cards">
              <div class="card">
                <div class="content">
                  <div class="stats xl">100</div>
                  <div class="description">Уровень надежности Организации</div>
                  <div class="action redirect" (click)="openModal()">
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats md">600 000 руб</div>
                  <div class="description">Уровень надежности Организации</div>
                  <div class="action redirect" (click)="openModal()">
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats sm">10 000 000 руб</div>
                  <div class="description">
                    Преобретено имещества на данную сумму
                  </div>
                  <div class="action redirect" (click)="openModal()">
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats xl">67</div>
                  <div class="info">Выше среднего!</div>
                  <div class="description">Сделок проведено</div>
                  <div class="action" (click)="openModal()">Подробнее</div>
                </div>
              </div>
            </div>
            <div class="social-title">
              <h4>Социальные сети организации</h4>
            </div>

            <div class="social-links">
              <div class="social-link">
                <img src="../../../../../../assets/images/icon_vk.png" alt="" />
              </div>
              <div class="social-link">
                <img
                  src="../../../../../../assets/images/icon_instagram.png"
                  alt=""
                />
              </div>
            </div>

            <div class="actions">
              <button class="primary w-100">Смотреть полный отчет</button>
              <button class="default w-100" (click)="openStepOne()">
                Проверить еще одну организацию
              </button>
            </div>

            <div class="organization-title">
              <h2>Список организаций</h2>
            </div>
            <div class="organization-description">
              По вашему запросу также были найдены и другие организации
            </div>

            <div class="organization-list">
              <div class="organization">
                <div class="info">
                  <h4>ООО Самое лучшее ООО</h4>
                  <p>
                    По вашему запросу также были найдены и другие организации
                  </p>
                </div>
                <div class="action" (click)="getData()">Смотреть</div>
              </div>
              <div class="organization">
                <div class="info">
                  <h4>ООО Самое лучшее ООО</h4>
                  <div class="status">Банкрот</div>
                  <p>
                    По вашему запросу также были найдены и другие организации
                  </p>
                </div>
                <div class="action" (click)="getData()" >Смотреть</div>
              </div>
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
      <div class="background result"></div>
    </div>
  `,
})
export class StepThreeComponent implements OnInit {
  @Input()
  public data: any;

  @Output()
  openNextStep = new EventEmitter<string>();

  @ViewChild('modal', { static: false }) modal: InfoModalComponent;

  public organizationInfo: OrganizationInfoInterface;

  public loading: boolean = false;
  public error: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.getData();
  }

  public openStepOne() {
    this.openNextStep.emit();
  }

  openModal() {
    let data: any[] = [];
    this.modal.open(data);
  }

  public getData() {
    this.loading = true;

    if (this.data.type === 'byINN') {
      let innArray: number[] = this.data.form.innArray.map((x) => +x);

      let request = {
        data: innArray,
      };

      this.searchService.search(request).subscribe(
        (resp) => {
          console.log(resp);
          this.organizationInfo = resp[0][1];
          console.log(this.organizationInfo);
          this.error = false;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = true;
        }
      );
    } else {
      const data = this.data.form.fullname;
      let request = {
        data,
      };

      this.searchService.search(request).subscribe(
        (resp) => {
          console.log(resp);
          this.organizationInfo = resp[0][1];
          this.error = false;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = true;
        }
      );
    }
  }
}
