import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class SearchService {
    constructor(private http: HttpClient) { }

    public search(data: any): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/search/search`, data);
    }
}