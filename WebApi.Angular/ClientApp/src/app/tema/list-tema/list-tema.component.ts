import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { ITemasCurso } from '../tema.component';
import { TemaService } from '../tema.service';

@Component({
  selector: 'app-list-tema',
  templateUrl: './list-tema.component.html',
  styleUrls: ['./list-tema.component.css']
})
export class ListTemaComponent implements OnInit {
  temas!: ITemasCurso[];
  displayedColumns: string[] = [
    'id',
    'codigo',
    'nombre'
  ];
  dataSource = new MatTableDataSource<ITemasCurso>(this.temas);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private temaService: TemaService, private router: Router,
    private activatedRoute: ActivatedRoute, private mensaje: MensajesModule) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.ConsultarTemas();
    console.log(this.dataSource.data);
  }
  ConsultarTemas() {
    this.temaService.getTemas()
      .subscribe(temas => this.dataSource.data = temas,
        error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
  }

}
