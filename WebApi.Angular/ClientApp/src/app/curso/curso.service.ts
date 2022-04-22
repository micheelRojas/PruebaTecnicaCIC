import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICurso, ICursoView } from './curso.component';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  apiURL = this.baseUrl + "api/Curso";
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  get refresh$() {
    return this._refresh$;
  }
  getCursos(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(this.apiURL);
  }
  getCurso(id: number): Observable<ICurso> {
    return this.http.get<ICurso>(this.apiURL + '/' + id);
  }
  getDetalleCurso(id: number): Observable<ICursoView> {
    return this.http.get<ICursoView>(this.apiURL + '/GetDetalleCurso/' + id);
  }

  createCurso(curso: ICurso): Observable<ICurso> {
    return this.http.post<ICurso>(this.apiURL, curso);
  }
  updateCurso(curso: ICurso): Observable<ICurso> {
    return this.http.put<ICurso>(this.apiURL + "/" + curso.id, curso);
  }
  deleteCurso(codigoCurso: number): Observable<number> {
    return this.http.delete<number>(this.apiURL + "/" + codigoCurso)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })

      );
  }
}
