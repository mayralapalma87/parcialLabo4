import { AuthService } from './../services/auth.service';
import { DataApiService } from './../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { turnoInteface } from '../models/turnoInterface';
import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-misTurnos',
  templateUrl: './misTurnos.component.html',
  styleUrls: ['./misTurnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  public turnos: turnoInteface[];
  public turnosByUser: turnoInteface[];
  public turno = '';
  public isAdmin: any = null;
  public userId: string = null;
  public cliente: string = null;
  public modalNuevoTurno: turnoInteface[] = [];
  ngOnInit() {
    this.getTurnos();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          this.cliente = userRole.email;
        });
      }
    });
  }
  getTurnos() {
    this.dataApi.getTurnos().subscribe( turnos => {
      this.turnos = turnos;
    });
  }

  filterTurnosByUser(user) {
    this.turnos.forEach(function(value) {
      if (value.cliente === user) {
        this.turnosByUser.add(value);
      }
    });
  }
  cancelarTurno(idTurno: string) {
    const confirmacion = confirm('Esta seguro que desea cancelar este turno?');
    if (confirmacion) {
      this.dataApi.borrarTurno(idTurno);
    }
  }
  modificarTurno(turno: turnoInteface) {
    this.dataApi.selectedTurno = Object.assign({}, turno);
  }
  llenarEncuesta(turnoId) {

  }
  public reiniciar() {
    this.turnos = [];
  }
  mostrarDatos(turnos) {
    console.log(turnos);
    this.modalNuevoTurno = turnos;
   // $('#modalNuevoTurnol').modal('toggle');
  }
}
