import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { ITutor, TutorComponent } from '../tutor.component';
import { TutorService } from '../tutor.service';

@Component({
  selector: 'app-list-tutor',
  templateUrl: './list-tutor.component.html',
  styleUrls: ['./list-tutor.component.css']
})
export class ListTutorComponent implements OnInit {
  tutores!: ITutor[];
  displayedColumns: string[] = [
    'id',
    'cedula',
    'nombre'
  ];
  dataSource = new MatTableDataSource<ITutor>(this.tutores);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private tutorService: TutorService, private router: Router,
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
    this.ConsultarTutores();
  }
  ConsultarTutores() {
    this.tutorService.getTutores()
      .subscribe(tutores => this.dataSource.data = tutores,
        error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
  }

 

}
