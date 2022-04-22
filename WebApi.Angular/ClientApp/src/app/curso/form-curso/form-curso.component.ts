import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { ICurso } from '../curso.component';
import { CursoService } from '../curso.service';
import { Location } from '@angular/common';
import { ITutor } from '../../tutor/tutor.component';
import { TutorService } from '../../tutor/tutor.service';
import { ModalTemaComponent } from '../../tema/modal-tema/modal-tema.component';
import { ITemasCurso } from '../../tema/tema.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormTemaComponent } from '../../tema/form-tema/form-tema.component';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit, OnDestroy {
  suscription: Subscription;
  temasdelCurso: ITemasCurso[] = [];//= [{ id: 1, codigo: 1, nombre:'HOLa' }];
  tutores: ITutor[];
  temaList: ITemasCurso[]=[];
  tema: ITemasCurso;
  posicion: number;

  constructor(private fb: FormBuilder, private cursoService: CursoService, public matDialog: MatDialog,
    private router: Router, private activatedRoute: ActivatedRoute, private mensaje: MensajesModule,
    private location: Location, private tutorService: TutorService) { }
  formGroup = this.fb.group({
    codigoCurso: ['', [Validators.required]],
    nombreCurso: ['', [Validators.required]],
    tutor: ['', [Validators.required]]
    
  });
  ngOnInit() {
    this.tutorService.getTutores().subscribe(tutores => this.llenarTutores(tutores),
      error => this.mensaje.mensajeAlertaError("Error", error.error));

    this.suscription = this.cursoService.refresh$.subscribe(() => {
      this.temasdelCurso;
    });
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  save() {
    let curso: ICurso = Object.assign({}, this.formGroup.value);
    curso.temasCurso = this.temasdelCurso;
    console.table(curso);
    if (this.formGroup.valid && curso.temasCurso!=null) {
      this.cursoService.createCurso(curso)
        .subscribe(tutor => this.goBack(),
          error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
    } else {
      this.mensaje.mensajeAlertaError('Error', 'El formGroup del Curso no es valido');
    }
  }
  llenarTutores(tutores: ITutor[]) {
    this.tutores = tutores;
  }
  goBack(): void {
    this.mensaje.mensajeAlertaCorrecto('¡Exitoso!', 'Curso guardado correctamente');
    this.location.back();
  }
  
  openDialogAdd(): void {
    const dialogRef = this.matDialog.open(ModalTemaComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      console.log(result.data);
      this.tema = result.data;
      this.temaList.push(this.tema);
      this.temasdelCurso.push({ id: 0, codigo: this.tema.codigo, nombre: this.tema.nombre });
      console.log(this.tema);
      console.table(this.temasdelCurso);
    });
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
