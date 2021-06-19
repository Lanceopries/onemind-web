import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ReportInterface } from 'src/app/shared/interfaces/report.interface';
import { SearchService } from 'src/app/shared/services/search.service';
import { InfoModalComponent } from '../../../modals/info-modal/info-modal.component';
import { WipModalComponent } from '../../../modals/wip-modal/wip-modal.component';

@Component({
  selector: 'step-three',
  styleUrls: ['./step-three.component.scss'],
  template: `
    <info-modal #modal></info-modal>
    <wip-modal #modalWIP></wip-modal>
    <div class="step-three">
      <div class="step-three_loading" *ngIf="loading; else contentTemplate">
        <p>Пожалуйста, подождите. Отчет формируется...</p>
      </div>
      <ng-template #contentTemplate>
        <ng-container *ngIf="!error; else errorTemplate">
          <div class="step-three_content">
            <div class="title">
              <h2>{{ report?.organization?.name ? report?.organization?.name : 'Название компании' }}</h2>
            </div>
            <div class="inn">ИНН - {{ report?.organization?.inn ? report?.organization?.inn : '229100804842' }}</div>
            <div class="ogrn">ОГРН {{ report?.organization?.ogrn ? report?.organization?.ogrn : '320619600009205 ' }}</div>

            <div class="work-from">
              Работает с {{ report?.organization?.workFrom ? report?.organization?.workFrom : '22.01.2005' }}
            </div>

            <div class="cards">
              <div class="card">
                <div class="content">
                  <div class="stats xl">{{ report?.reliability?.result ? report?.reliability?.result : 100  }}</div>
                  <div class="description">Уровень надежности Организации</div>
                  <div
                    class="action redirect"
                    (click)="openModal(report?.reliability?.moreInfo)"
                  >
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats md">{{ report?.freelimit?.result ? report?.freelimit?.result : '100 000 руб' }}</div>
                  <div class="description">Свободный лимит Организации</div>
                  <div
                    class="action redirect"
                    (click)="openModal(report?.freelimit?.moreInfo)"
                  >
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats sm">{{ report?.companyPrice?.result ? report?.companyPrice?.result : '1 000 000 руб' }}</div>
                  <div class="description">
                    Текущая себестоимость организации
                  </div>
                  <div
                    class="action redirect"
                    (click)="openModal(report?.companyPrice?.moreInfo)"
                  >
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats xl">{{ report?.verdict?.result ? report?.verdict?.result : '100' }}</div>
                  <div class="description">Итоговое решение системы</div>
                  <div
                    class="action"
                    (click)="openModal(report?.verdict?.moreInfo)"
                  >
                    Подробнее
                  </div>
                </div>
              </div>
            </div>
            <div class="social-title">
              <h4>Социальные сети организации</h4>
            </div>

            <div class="social-links">
              <div *ngIf="!report?.organization?.socialLinks">
                <h4>Организация не найдена в социальных сетях</h4>
              </div>
              <div
                class="social-link"
                *ngFor="let link of report?.organization?.socialLinks"
              >
                <ng-container [ngSwitch]="link?.type">
                  <a [href]="link?.url" target="blank">
                    <img
                      *ngSwitchCase="'vk'"
                      src="../../../../../../assets/images/icon_vk.png"
                      alt="VK"
                    />
                    <img
                      *ngSwitchCase="'insta'"
                      src="../../../../../../assets/images/icon_vk.png"
                      alt="VK"
                    />
                    <img
                      *ngSwitchDefault
                      src="../../../../../../assets/images/icon_vk.png"
                      alt="VK"
                    />
                  </a>
                </ng-container>
                <img />
              </div>
            </div>

            <div class="actions">
              <button class="primary w-100" (click)="openWIP()">
                Смотреть полный отчет
              </button>
              <button class="default w-100" (click)="openStepOne()">
                Проверить еще одну организацию
              </button>
            </div>

            <div class="organization-title">
              <h2>Список организаций</h2>
            </div>
            <div class="organization-description">
              {{
                report?.sameOrganizationList
                  ? 'По вашему запросу также были найдены и другие организации'
                  : 'По вашему запросу другие организации не были найдены'
              }}
            </div>

            <div class="organization-list" *ngIf="report?.sameOrganizationList">
              <div
                class="organization"
                *ngFor="let item of report?.sameOrganizationList"
              >
                <div class="info">
                  <h4>{{ item?.name }}</h4>
                  <div
                    class="status"
                    *ngFor="let tag of item?.tags"
                    [ngClass]="tag?.type"
                  >
                    {{ tag?.title }}
                  </div>
                </div>
                <div class="action" (click)="getData(item?.inn)">Смотреть</div>
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
  @ViewChild('modalWIP', { static: false }) modalWIP: WipModalComponent;

  public report: ReportInterface;

  public loading: boolean = false;
  public error: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.getData();
  }

  public openStepOne() {
    this.openNextStep.emit();
  }

  openWIP() {
    this.modalWIP.open();
  }

  openModal(data) {
    this.modal.open(data);
  }

  public getData(inn?) {
    this.loading = true;

    if (this.data.type === 'byINN') {
      let innArray: number[] = this.data.form.innArray.map((x) => +x);

      let request = {
        data: innArray,
      };

      if (inn) {
        request.data = [];
        request.data.push(inn);
      }

      this.searchService.search(request).subscribe(
        (resp) => {
          this.report = resp;

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
          this.report = resp;
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
