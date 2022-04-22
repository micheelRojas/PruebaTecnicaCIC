import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITutor } from './tutor.component';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  apiURL = this.baseUrl + "api/Tutor";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  getTutores(): Observable<ITutor[]> {
    return this.http.get<ITutor[]>(this.apiURL);
  }
  createTutor(tutor: ITutor): Observable<ITutor> {
    return this.http.post<ITutor>(this.apiURL, tutor);
  }
}
