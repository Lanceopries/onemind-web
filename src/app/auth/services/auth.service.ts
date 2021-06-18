import { UserInterface } from './../../shared/interfaces/user.interface';
import { PersistanceService } from './../../shared/services/persistance.service';
import { environment } from './../../../environments/environment';
import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private persistanceService: PersistanceService) {

  }

  login(user: UserInterface): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        tap(({token}) => {
          this.persistanceService.set('auth-token', token)
        })
      )
  }

  register(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${environment.apiUrl}/auth/register`, user)
  }

  getToken(): string {
    return this.persistanceService.get('auth-token');
  }

  isAuthenticated(): boolean {
    if(this.getToken().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.persistanceService.set('auth-token', '')
    localStorage.clear()
  }
}
