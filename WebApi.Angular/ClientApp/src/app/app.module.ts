import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensajesModule } from './mensajes/mensajes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatListSubheaderCssMatStyler, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule} from '@angular/material';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { TutorComponent } from './tutor/tutor.component';
import { ListTutorComponent } from './tutor/list-tutor/list-tutor.component';
import { FormTutorComponent } from './tutor/form-tutor/form-tutor.component';
import { TemaComponent } from './tema/tema.component';
import { ListTemaComponent } from './tema/list-tema/list-tema.component';
import { FormTemaComponent } from './tema/form-tema/form-tema.component';
import { CursoComponent } from './curso/curso.component';
import { FormCursoComponent } from './curso/form-curso/form-curso.component';
import { EditCursoComponent } from './curso/edit-curso/edit-curso.component';
import { ListCursoComponent } from './curso/list-curso/list-curso.component';
import { ModalTemaComponent } from './tema/modal-tema/modal-tema.component';
import { CursoDetalleComponent } from './curso/curso-detalle/curso-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TutorComponent,
    ListTutorComponent,
    FormTutorComponent,
    TemaComponent,
    ListTemaComponent,
    FormTemaComponent,
    CursoComponent,
    FormCursoComponent,
    EditCursoComponent,
    ListCursoComponent,
    ModalTemaComponent,
    CursoDetalleComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatAutocompleteModule, MatFormFieldModule, MatListModule, MatIconModule,
    MatDividerModule,
    MatNativeDateModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'registrar-tutor', component: FormTutorComponent },
      { path: 'consultar-tutores', component: TutorComponent },
      { path: 'consultarTema', component: TemaComponent },
      { path: 'registrar-curso', component: FormCursoComponent },
      { path: 'consultar-cursos', component: CursoComponent },
      { path: 'modal-tema', component: ModalTemaComponent },
      { path: 'editar-curso/:id', component: EditCursoComponent },
      { path: 'detalle-curso/:id', component: CursoDetalleComponent },
    ]),
    MensajesModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
