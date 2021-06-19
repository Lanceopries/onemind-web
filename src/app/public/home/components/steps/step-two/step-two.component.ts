import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'step-two',
  styleUrls: ['./step-two.component.scss'],
  template: `
    <div class="step-two">
      <div [ngSwitch]="type">
        <div *ngSwitchCase="'byINN'">
          <h3>Поиск организаций, по ИНН или ОГРН</h3>
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
          <h3>По ФИО</h3>
          <form [formGroup]="form">
            <div>
              <label>
                <input
                  formControlName="fullname"
                  placeholder="Введите полное ФИО физ. лица"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
      <div class="step-two_actions">
        <button class="primary" (click)="openStepThree()">Продолжить</button>
      </div>
    </div>
  `,
})
export class StepTwoComponent implements OnInit {
  @Input()
  public type: string;

  @Output()
  openNextStep = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this._initForm();
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
