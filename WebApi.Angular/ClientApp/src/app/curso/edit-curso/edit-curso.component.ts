import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { ICurso } from '../curso.component';
import { CursoService } from '../curso.service';
import { Location } from '@angular/common';
import { Icu } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {
  constructor(private fb: FormBuilder, private cursoService: CursoService, public matDialog: MatDialog,
    private router: Router, private activatedRoute: ActivatedRoute, private mensaje: MensajesModule,
    private location: Location) { }
  idCurso: number;
  formGroup = this.fb.group({
    id: ['', [Validators.required]],
    codigoCurso: ['', [Validators.required]],
    nombreCurso: ['', [Validators.required]],
    
  });
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
    this.idCurso = parseInt(params["id"]);
    this.cursoService.getCurso(this.idCurso)
      .subscribe(curso => this.cargarFormulario(curso),
        error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
  });
  }
  save() {
    let curso: ICurso = Object.assign({}, this.formGroup.value);
    console.table(curso);
    if (this.formGroup.valid) {
      this.cursoService.updateCurso(curso)
        .subscribe(tutor => this.goBack(),
          error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
    } else {
      this.mensaje.mensajeAlertaError('Error', 'El formGroup del Curso no es valido');
    }
  }
  goBack(): void {
    this.location.back();
    this.mensaje.mensajeAlertaCorrecto('¡Exitoso!', 'Curso Editado correctamente');
   
  }
  cargarFormulario(curso: ICurso) {
    this.formGroup.patchValue({
      id: curso.id,
      codigoCurso: curso.codigoCurso,
      nombreCurso: curso.nombreCurso


    });
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
 
}
