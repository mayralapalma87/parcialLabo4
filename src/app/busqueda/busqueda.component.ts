import { UserInterface } from 'src/app/models/user';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { turnoInteface } from '../models/turnoInterface';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public filtroInput: string;
  @Input() listaUsers: UserInterface[];
  @Output() filtro = new EventEmitter<turnoInteface[]>();
  constructor() { }

  ngOnInit() {
  }

  buscar(filtro) {
    // console.log(filtro);
    let usuariosBuscados: turnoInteface[] = [];
    usuariosBuscados = this.listaUsers.filter( usuario => {
      if (usuario.nombre && filtro) {
        if (usuario.nombre.indexOf(filtro) > -1) {
          return true;
        }
      }
      return false;
    });
    if (usuariosBuscados.length > 0) {
      this.filtro.emit(usuariosBuscados);
    }
  }
}

