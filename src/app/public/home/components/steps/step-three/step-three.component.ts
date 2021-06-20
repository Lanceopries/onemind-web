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
              <h2>
                {{
                  report?.organization?.name
                    ? report?.organization?.name
                    : 'Название компании'
                }}
              </h2>
            </div>
            <div class="inn">
              ИНН -
              {{
                report?.organization?.inn
                  ? report?.organization?.inn
                  : '229100804842'
              }}
            </div>
            <div class="ogrn">
              ОГРН
              {{
                report?.organization?.ogrn
                  ? report?.organization?.ogrn
                  : '320619600009205 '
              }}
            </div>

            <div class="work-from">
              Работает с
              {{
                report?.organization?.workFrom
                  ? report?.organization?.workFrom
                  : '22.01.2005'
              }}
            </div>

            <div class="cards">
              <div class="card">
                <div class="content">
                  <div class="stats xl">
                    {{
                      report?.reliability?.result
                        ? report?.reliability?.result
                        : 100
                    }}
                  </div>
                  <div class="description">Уровень надежности Организации</div>
                  <div
                    class="action redirect"
                    (click)="
                      openModal(report?.reliability?.moreInfo, 'reliability')
                    "
                  >
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats md">
                    {{
                      report?.freeLimit?.result
                        ? report?.freeLimit?.result
                        : '100 000 руб'
                    }}
                  </div>
                  <div class="description">Свободный лимит Организации</div>
                  <div
                    class="action redirect"
                    (click)="
                      openModal(report?.freeLimit?.moreInfo, 'freelimit')
                    "
                  >
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats sm">
                    {{
                      report?.companyPrice?.result
                        ? report?.companyPrice?.result
                        : '1 000 000 руб'
                    }}
                  </div>
                  <div class="description">
                    Текущая себестоимость организации
                  </div>
                  <div
                    class="action redirect"
                    (click)="
                      openModal(report?.companyPrice?.moreInfo, 'companyPrice')
                    "
                  >
                    Подробнее
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="content">
                  <div class="stats xl">
                    {{
                      report?.verdict?.result ? report?.verdict?.result : '100'
                    }}
                  </div>
                  <div class="description">Итоговое решение системы</div>
                  <div
                    class="action"
                    (click)="openModal(report?.verdict?.moreInfo, 'verdict')"
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
              <div *ngIf="report?.organization?.socialLinks?.length === 0">
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
                    <div *ngSwitchDefault></div>
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
                currentReport?.sameOrganizationList?.length !== 0
                  ? 'По вашему запросу также были найдены и другие организации'
                  : 'По вашему запросу другие организации не были найдены'
              }}
            </div>

            <div
              class="organization-list"
              *ngIf="currentReport?.sameOrganizationList !== 0"
            >
              <div
                class="organization"
                *ngFor="let item of currentReport?.sameOrganizationList"
              >
                <div class="info">
                  <h4>{{ item?.organization?.name }}</h4>
                  <div>ИНН: {{ item?.organization?.inn }}</div>
                </div>
                <div class="action" (click)="switchReport(item?.inn)">
                  Смотреть
                </div>
              </div>
            </div>
          </div>
        </ng-container>
        <ng-template #errorTemplate>
          <div class="step-three_error">
            <h3>Проиозошла ошибка, пожалуйста, повторите попытку.</h3>
            <button class="default" (click)="getData()">
              Повторить попытку
            </button>
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
  public currentReport: ReportInterface;

  public loading: boolean = false;
  public error: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this._fetch();
  }

  public openStepOne() {
    this.openNextStep.emit();
  }

  openWIP() {
    this.modalWIP.open();
  }

  openModal(data, type) {
    this.modal.open(data, type);
  }

  public switchReport(inn) {
    let sameOrganizations = this.currentReport.sameOrganizationList;
    sameOrganizations.forEach((item) => {
      if (item.organization.inn === inn) {
        this.report = item;
      }
    });
  }

  public getData() {
    this._fetch();
  }

  private _fetch() {
    this.loading = true;

    if (this.data.type === 'byINN') {
      let innArray: number[] = this.data.form.innArray.map((x) => +x);

      let request = {
        data: innArray,
      };

      this.searchService.search(request).subscribe(
        (resp) => {
          resp.sameOrganizationList.push(resp);
          this.report = resp;
          this.currentReport = this.report;

          this.error = false;
          this.loading = false;
        },
        (error) => {
          this.loading = false;

          // this.error = true;
          let resp: ReportInterface = {
            companyPrice: {
              moreInfo: [],
              result: '1 000 000 руб',
            },
            freeLimit: {
              moreInfo: [],
              result: '200 000 руб',
            },
            organization: {
              inn: '6162071905 ',
              name: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ГРИН"',
              ogrn: '1166196070809',
              socialLinks: [],
              typePerson: 1,
              workFrom: '15.04.2016',
            },
            reliability: {
              moreInfo: [],
              result: '100',
            },
            verdict: {
              result: '100',
              moreInfo: [],
            },
            sameOrganizationList: [],
          };
          resp.sameOrganizationList.push(resp);
          this.report = resp;
          this.currentReport = this.report;
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
