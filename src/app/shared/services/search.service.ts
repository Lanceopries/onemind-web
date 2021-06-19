import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportInterface } from '../interfaces/report.interface';

@Injectable({providedIn: 'root'})
export class SearchService {
    constructor(private http: HttpClient) { }

    public search(data: any): Observable<ReportInterface> {
      return this.http.post<ReportInterface>(`${environment.apiUrl}/search/search`, data);
    }
}
