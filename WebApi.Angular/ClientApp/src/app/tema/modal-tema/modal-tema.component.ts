import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITemasCurso } from '../tema.component';
import { TemaService } from '../tema.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-tema',
  templateUrl: './modal-tema.component.html',
  styleUrls: ['./modal-tema.component.css']
})
export class ModalTemaComponent implements OnInit {

  formGroup: FormGroup;
  tema = new FormControl('', [Validators.required]);
  filteredOptions: Observable<ITemasCurso[]>;
  temaList: ITemasCurso[];
  temaAñadir: ITemasCurso;


  constructor(
    private temaService:TemaService,
    private matDialogRef: MatDialogRef<ModalTemaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataRecieved: any,
  ) {
    
  }
  
  initForm(): void {
    this.formGroup = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.initForm();
    this.getAllTemas( );
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;
    this.mapOrder();
    this.matDialogRef.close({ data: this.temaAñadir});
  
  }

  

  mapOrder(): void {
    this.temaAñadir = this.formGroup.value;
 
  }

  onNoClick(): void {
    this.formGroup.reset();
    this.temaAñadir = null;
    this.matDialogRef.close();
  }

 

  // auto complete users authtorized
  displayFn(tema: ITemasCurso): string {
    if (!tema) return "";
    return tema.nombre;
  }

  getAllTemas(): void {
    this.temaService.getTemasSinCurso().subscribe(response => {
      this.temaList = response;
   
    });
  }

  





  

  get formAdd() { return this.formGroup.controls; }
}
