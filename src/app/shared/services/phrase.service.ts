import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhraseInterface } from '../interfaces/phrase.interface';
import { Language } from '../interfaces/language.enum';
import { PhrasesGenerateInterface } from '../interfaces/phrases-generated.interface';

@Injectable({
  providedIn: 'root',
})
export class PharaseService {
  constructor(private http: HttpClient) {}

  generatePhrases(phrase: string): Observable<PhrasesGenerateInterface> {
    return this.http.post<PhrasesGenerateInterface>(`${environment.apiUrl}/phrases/generate-phrases`, {phrase});
  }

  fetch(): Observable<PhraseInterface[]> {
    return this.http.get<PhraseInterface[]>(`${environment.apiUrl}/phrases`);
  }

  getAllByLanguageOwner(): Observable<PhraseInterface[]> {
    return this.http.get<PhraseInterface[]>(`${environment.apiUrl}/phrases/get-all-by-language-owner`);
  }

  getById(id: string): Observable<PhraseInterface> {
    return this.http.get<PhraseInterface>(`${environment.apiUrl}/phrases/${id}`);
  }

  getNext(language: Language): Observable<PhraseInterface> {
    return this.http.post<PhraseInterface>(`${environment.apiUrl}/phrases/get-next`, {language});
  }

  create(data: PhraseInterface): Observable<PhraseInterface> {
    return this.http.post<PhraseInterface>(`${environment.apiUrl}/phrases`, data);
  }

  update(id: string, data: PhraseInterface): Observable<PhraseInterface> {
    return this.http.patch<PhraseInterface>(
      `${environment.apiUrl}/phrases/${id}`,
      data
    );
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/phrases/${id}`);
  }
}
