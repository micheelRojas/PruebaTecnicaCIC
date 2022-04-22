import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export interface ITemasCurso {
  id: number,
  codigo: number,
  nombre: string
}
export interface ITemasView {
  id: number,
  codigoTema: number,
  nombreTema: string
}


