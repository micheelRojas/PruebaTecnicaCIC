import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITemasCurso } from './tema.component';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  apiURL = this.baseUrl + "api/Tema";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  getTemas(): Observable<ITemasCurso[]> {
    return this.http.get<ITemasCurso[]>(this.apiURL);
  }
  createTema(tema: ITemasCurso): Observable<ITemasCurso> {
    return this.http.post<ITemasCurso>(this.apiURL, tema);
  }
  getTemasSinCurso(): Observable<ITemasCurso[]> {
    return this.http.get<ITemasCurso[]>(this.apiURL + '/GetDetalleCurso');
  }
}
