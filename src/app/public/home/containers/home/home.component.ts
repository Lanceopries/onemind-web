import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['home.component.scss'],
  template: `
    <div class="home">
      <div class="container">
        <div class="promo-info">
          <div class="title">
            <h1><div class="accent">One Mind </div> - лучший сервис для поиска финансирования</h1>
          </div>
          <div class="description">
            OneMind создается, для получения и предоставления финансирования.
          </div>
          <div class="action">
            <button class="primary" [routerLink]="['/search']">
              Начать работу
            </button>
          </div>
        </div>
        <div class="promo-image">
          <img src="../../../../../assets/images/common/promo.png" alt="" />
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
