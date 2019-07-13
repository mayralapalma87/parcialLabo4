import { InscripcionInterface } from './../models/inscripcionInterface';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
import { AuthService } from '../services/auth.service';
import { turnoInteface } from '../models/turnoInterface';

@Component({
  selector: 'app-incripciones',
  templateUrl: './incripciones.component.html',
  styleUrls: ['./incripciones.component.css']
})
export class IncripcionesComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public turnos: turnoInteface[];
  public inscripciones: InscripcionInterface[];
  public turno = '';
  public isAdmin: any = null;
  public userId: string = null;
  public modalNuevoTurno: turnoInteface[] = [];
  public modalNuevaInscripcion: InscripcionInterface[] = [];

  ngOnInit() {
    this.getTurnos();
    this.getCurrentUser();
    this.getInscripciones();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }
  getTurnos() {
    this.dataApi.getTurnos().subscribe( turnos => {
      this.turnos = turnos;
    });
  }
  getInscripciones() {
    this.dataApi.getInscripciones().subscribe( incropciones => {
      this.inscripciones = incropciones;
    });
  }
  cancelarInscripcion(idInscripcion: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este Inscripcion?');
    if (confirmacion) {
      this.dataApi.borrarInscripcion(idInscripcion);
    }
  }
  modificarInscripcion(Inscripcion: InscripcionInterface) {
    this.dataApi.selectedInscripcion = Object.assign({}, Inscripcion);
  }

  public reiniciar() {
    this.inscripciones = [];
  }

}
