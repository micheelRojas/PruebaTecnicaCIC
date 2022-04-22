import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CursoService } from '../curso.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ICurso, ICursoView } from '../curso.component';
import { ITutor } from '../../tutor/tutor.component';
import { ITemasCurso, ITemasView} from '../../tema/tema.component';
@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {
  temas!: ITemasView[];
  displayedColumns: string[] = [
    'id',
    'codigoTema',
    'nombreTema'
  ];
  dataSource = new MatTableDataSource<ITemasView>(this.temas);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private fb: FormBuilder, private cursoService: CursoService, public matDialog: MatDialog,
    private router: Router, private activatedRoute: ActivatedRoute, private mensaje: MensajesModule,
    private location: Location) { }
  idCurso: number;
  curso: ICursoView;
  formGroup = this.fb.group({
    id: ['', [Validators.required]],
    codigoCurso: ['', [Validators.required]],
    nombreCurso: ['', [Validators.required]],
    tutor: ['', [Validators.required]],
  });
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
        return;
      }
      this.idCurso = parseInt(params["id"]);
      this.cursoService.getDetalleCurso(this.idCurso)
        .subscribe(curso => this.cargarFormulario(curso),
          error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
     
    });
   
  }

  cargarFormulario(curso: ICursoView) {
    this.formGroup.patchValue({
      id: curso.id,
      codigoCurso: curso.codigoCurso,
      nombreCurso: curso.nombreCurso,
      tutor: curso.tutor.nombre,

    });
    this.dataSource.data = curso.temas;
    console.log("dataSource");
    console.table(this.dataSource.data);
  }

  
  goBack(): void {
    this.location.back();
    this.mensaje.mensajeAlertaCorrecto('¡Ok!', 'Regresando a la vista de Cursos');

  }
  
  get id() {
    return this.formGroup.get('id');
  }
  get codigoCurso() {
    return this.formGroup.get('codigoCurso');
  }
  get nombreCurso() {
    return this.formGroup.get('nombreCurso');
  }
  get tutor() {
    return this.formGroup.get('tutor');
  }
  }

  
  


