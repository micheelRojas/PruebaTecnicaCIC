import { Component, OnDestroy, OnInit } from '@angular/core';

import { ICurso } from '../curso.component';
import { MatTableDataSource } from '@angular/material';
import { CursoService } from '../curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListCursoComponent implements OnInit, OnDestroy {
  cursos!: ICurso[];
  suscription: Subscription;
  columnsToDisplay = ['id', 'codigoCurso','nombreCurso'];
  dataSource = new MatTableDataSource<ICurso>(this.cursos);
  expandedElement: ICurso | null;

  constructor(private cursoService: CursoService, private router: Router,
    private activatedRoute: ActivatedRoute, private mensaje: MensajesModule) {
  }

  ngOnInit() {
    this.ConsultarCursos();
    console.table(this.cursos);
    this.suscription = this.cursoService.refresh$.subscribe(() => {
      this.ConsultarCursos();
    });
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ConsultarCursos() {
    this.cursoService.getCursos()
      .subscribe(cursos => this.dataSource.data = cursos,
        error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
  }

  eliminarCurso(id: number) {
    this.cursoService.deleteCurso(id).
      subscribe(nit => this.onDeleteSuccess(),
        error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
  }
  onDeleteSuccess() {
  
    this.mensaje.mensajeAlertaCorrecto('¡Exitoso!', 'Curso elimindo correctamente');
  }
 
}
