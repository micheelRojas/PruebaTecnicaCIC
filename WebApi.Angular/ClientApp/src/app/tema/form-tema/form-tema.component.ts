import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { ITemasCurso } from '../tema.component';
import { TemaService } from '../tema.service';

@Component({
  selector: 'app-form-tema',
  templateUrl: './form-tema.component.html',
  styleUrls: ['./form-tema.component.css']
})
export class FormTemaComponent implements OnInit {
  tema = new FormControl('', [Validators.required]);
  temaAñadir: ITemasCurso;
  constructor(private fb: FormBuilder, private temaService: TemaService,
    private router: Router, private activatedRoute: ActivatedRoute, private mensaje: MensajesModule, private matDialogRef: MatDialogRef<FormTemaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataRecieved: any,
  ) { }
  formGroup = this.fb.group({
    codigo: ['', [Validators.required]],
    nombre: ['', [Validators.required]]
  });
  ngOnInit() {
  }
  save() {
    let tema: ITemasCurso = Object.assign({}, this.formGroup.value);
    console.table(tema);
    if (this.formGroup.valid) {
      this.temaService.createTema(tema)
        .subscribe(tutor => this.goBack(),
          error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
      this.mapOrder();
      this.matDialogRef.close({ data: tema });
    } else {
      this.mensaje.mensajeAlertaError('Error', 'El formGroup del tema no es valido');
    }
  }
  goBack(): void {
    this.mensaje.mensajeAlertaCorrecto('¡Exitoso!', 'Tema guardado correctamente');

  }
  mapOrder(): void {
    this.temaAñadir = this.formGroup.value;

  }
  get codigo() {
    return this.formGroup.get('codigo');
  }
  get nombre() {
    return this.formGroup.get('nombre');
  }
}
