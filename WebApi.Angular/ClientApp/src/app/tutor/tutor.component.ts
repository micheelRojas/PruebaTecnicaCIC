import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export interface ITutor {
  id: number,
  cedula: number,
  nombre: string
}
