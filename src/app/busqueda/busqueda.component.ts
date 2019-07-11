import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { turnoInteface } from '../models/turnoInterface';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public filtroInput: string;
  @Input() listaTurnos: turnoInteface[];
  @Output() filtro = new EventEmitter<turnoInteface[]>();
  constructor() { }

  ngOnInit() {
  }

  buscar(filtro) {
    // console.log(filtro);
    let turnosBuscados: turnoInteface[] = [];
    turnosBuscados = this.listaTurnos.filter( turno => {
      if (turno.Nombre && filtro) {
        if (turno.Nombre.indexOf(filtro) > -1) {
          return true;
        }
      }
      return false;
    });
    if (turnosBuscados.length > 0) {
      this.filtro.emit(turnosBuscados);
    }
  }
}

