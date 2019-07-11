import { UserInterface } from 'src/app/models/user';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataApiService } from '../services/data-api.service';
declare var $: any;
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public filtroInput: string;
  @Input() listaUsers: UserInterface[];
  @Output() filtro = new EventEmitter<UserInterface[]>();
  @Output() usuariosModal: UserInterface[];
  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.getUsuarios();
  }
  getUsuarios() {
    this.dataApi.getUsers().subscribe( usuarios => {
      this.listaUsers = usuarios;
    });
  }

  buscar(filtro) {
    let usuariosBuscados: UserInterface[] = [];
    usuariosBuscados = this.listaUsers.filter( usuario => {
      if (usuario.roles && filtro) {
        if (filtro === 'alumno') {
          if (usuario.roles.alumno === true) {
            return true;
          }
        } else if (filtro === 'profesor') {
          if (usuario.roles.profesor === true) {
            return true;
          }
        } else if (filtro === 'admin') {
          if (usuario.roles.admin === true) {
            return true;
          } else { return false; }
        }
      }
      return false;
    });
    this.usuariosModal = usuariosBuscados;
    this.filtro.emit(usuariosBuscados);
  }
}

