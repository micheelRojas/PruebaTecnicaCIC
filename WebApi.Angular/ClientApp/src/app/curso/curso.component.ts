import { Component, OnInit } from '@angular/core';
import { ITemasCurso, ITemasView } from '../tema/tema.component';
import { ITutor } from '../tutor/tutor.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export interface ICurso {
  id: number
  codigoCurso: number,
  nombreCurso: string,
  tutor: ITutor,
  temasCurso: ITemasCurso[]

}export interface ICursoView {
  id: number
  codigoCurso: number,
  nombreCurso: string,
  tutor: ITutor,
  temas: ITemasView[]

}

