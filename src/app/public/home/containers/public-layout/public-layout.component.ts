import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'public-layout',
  styleUrls: ['./public-layout.component.scss'],
  template: `
    <div class="public-layout">
      <div class="public-layout_header">
        <div class="logo">
          <a [routerLink]="['/']">
            <img src="../../../../../assets/images/logo.png" alt="OneMind" />
          </a>
        </div>
        <div class="actions"></div>
      </div>
      <div class="public-layout_content">
        <router-outlet></router-outlet>
      </div>
      <div class="public-layout_footer">
        <a [routerLink]="['/']">
          <img
            src="../../../../../assets/images/logo_footer.png"
            alt="OneMind"
          />
        </a>
      </div>
    </div>
  `,
})
export class PublicLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
