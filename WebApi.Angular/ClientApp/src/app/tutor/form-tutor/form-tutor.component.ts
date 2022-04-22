import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesModule } from '../../mensajes/mensajes.module';
import { TutorService } from '../tutor.service';
import { Location } from '@angular/common';
import { ITutor } from '../tutor.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-tutor',
  templateUrl: './form-tutor.component.html',
  styleUrls: ['./form-tutor.component.css']
})
export class FormTutorComponent implements OnInit {

  constructor(private fb: FormBuilder, private tutorService: TutorService,
    private router: Router, private activatedRoute: ActivatedRoute, private mensaje: MensajesModule, private location: Location) { }
  formGroup = this.fb.group({
    cedula: ['', [Validators.required]],
    nombre: ['', [Validators.required]]
  });
  ngOnInit() {
  }
  save() {
    let tutor: ITutor = Object.assign({}, this.formGroup.value);
    console.table(tutor); 
    if (this.formGroup.valid) {
      this.tutorService.createTutor(tutor)
        .subscribe(tutor => this.goBack(),
          error => this.mensaje.mensajeAlertaError('Error', error.error.toString()));
    } else {
      this.mensaje.mensajeAlertaError('Error', 'El formGroup del tutor no es valido');
    }
  }
  goBack(): void {
    this.mensaje.mensajeAlertaCorrecto('¡Exitoso!', 'Tutor guardado correctamente');
    this.location.back();
  }
  get cedula() {
    return this.formGroup.get('cedula');
  }
  get nombre() {
    return this.formGroup.get('nombre');
  }
}
