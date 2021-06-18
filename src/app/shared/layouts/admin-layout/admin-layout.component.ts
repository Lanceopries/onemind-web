import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  public opened: boolean = false;

  // private voiceText

  constructor(
    private authService: AuthService,
    public router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
  }

  // AUTH

  public logout() {
    this.authService.logout();
    this.router.navigate(['/dragon-auth/login']);
  }
}
