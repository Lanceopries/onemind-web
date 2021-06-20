import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'search-modal',
  styleUrls: ['./search-modal.component.scss'],
  template: `
    <div #searchModal class="modal-container">
      <div class="modal-content">
        <div class="top-actions">
          <div class="action close" (click)="close()">
            <img
              src="../../../../../assets/images/arrows/left_blue.png"
              alt="Назад"
            />
            Назад
          </div>
        </div>
        <div class="inner">
          <div [ngSwitch]="type">
            <div *ngSwitchCase="'byINN'">
              <h4>Введите данные об организации</h4>
              <form [formGroup]="form" class="form">
                <div formArrayName="innArray" class="array">
                  <div
                    *ngFor="let c of innArray.controls; index as i"
                    class="array-item"
                  >
                    <input
                      [formControlName]="i"
                      placeholder="Введите ИНН или ОГРН"
                    />
                    <button class="warn" (click)="removeINN(i)">Удалить</button>
                  </div>
                </div>
                <button class="default" (click)="addINN()">
                  Добавить ИНН или ОГРН
                </button>
              </form>
            </div>
            <div *ngSwitchCase="'byPerson'">
              <h3>
                Введите ФИО <span class="accent-warn">или</span> загрузите
                фотографию <span class="accent-primary">Юр. лица</span>
              </h3>
              <form [formGroup]="form" class="form">
                <div class="array">
                  <div class="array-item">
                    <input
                      formControlName="fullname"
                      placeholder="Введите Фамилию Имя Отчество (при наличии)"
                    />
                  </div>
                  <div class="array-item">
                    <div class="file-input">
                      <img
                        src="../../../../../../assets/images/icon_file.png"
                        alt=""
                        class="icon"
                      />
                      <p class="title">Прикрепить фотографию</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <small *ngIf="type === 'byPerson'">Работа в процессе...</small>
        </div>
        <div class="bottom-actions">
          <button
            type="submit"
            [disabled]="type === 'byPerson' || form.invalid"
            (click)="openStepThree()"
            class="redirect forward"
          >
            Продолжить
            <img
              *ngIf="type !== 'byPerson' || form.invalid"
              src="../../../../../assets/images/arrows/right_blue.png"
              alt="Продолжить"
            />
          </button>
        </div>
      </div>
    </div>
  `,
})
export class SearchModalComponent implements OnInit {
  public type: string = "byINN";

  @Output()
  openNextStep = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this._initForm();
  }

  @ViewChild('searchModal', { static: false }) modal: ElementRef;

  open(type) {
    this.type = type;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  public openStepThree() {
    let data = { form: this.form.value, type: this.type };
    this.openNextStep.emit(data);
  }

  public addINN() {
    this.innArray.push(new FormControl(''));
  }

  public removeINN(index) {
    this.innArray.removeAt(index);
  }

  get innArray() {
    return this.form.get('innArray') as FormArray;
  }

  private _initForm() {
    if (this.type === 'byINN') {
      this.form = this.fb.group({
        innArray: this.fb.array(['']),
      });
    } else {
      this.form = this.fb.group({
        fullname: '',
      });
    }
  }
}
